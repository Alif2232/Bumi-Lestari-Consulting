---
name: vector-rag-pipeline
description: End-to-end patterns for RAG (Retrieval-Augmented Generation) pipelines with vector databases — chunking, embedding, retrieval, prompt augmentation, and evaluation
license: MIT
compatibility: opencode
metadata:
  audience: ai-engineers
  stack: rag-vectors
---

## What I do

Provide canonical patterns for building RAG pipelines, including chunking strategies, embedding model selection, vector database choice, retrieval, re-ranking, prompt augmentation, and evaluation.

## When to use me

Load this skill when:
- Designing or implementing a RAG pipeline
- Choosing a vector database (pgvector vs Pinecone vs Qdrant vs Weaviate vs Chroma)
- Implementing chunking strategies
- Choosing embedding models (OpenAI, Cohere, Voyage, local)
- Building hybrid search (vector + BM25)
- Evaluating retrieval quality (recall@k, MRR, nDCG)
- Debugging retrieval failures (low recall, hallucinations, etc.)

## RAG Pipeline Stages

```
1. INGEST          2. CHUNK          3. EMBED          4. STORE
  Documents   →    Chunks      →    Vectors     →    Vector DB
  (PDFs, MD,  (split into        (using embedding    (pgvector /
   HTML, etc.)  ~500 tokens)       model)              Qdrant / etc.)

5. QUERY           6. RETRIEVE       7. RERANK         8. AUGMENT
  User query  →    Top-K chunks →   Re-score top-K  →  Build prompt
                   (vector search)   (optional)         with context

9. GENERATE        10. EVALUATE
  LLM response →   Quality metrics
  (with cited       (faithfulness,
   sources)          relevance)
```

## 1. Chunking Strategies

| Strategy | Chunk size | Overlap | Best for |
|---|---|---|---|
| **Fixed-size** | 256–1024 tokens | 10–20% | Generic, fast, low complexity |
| **Sentence** | 5–20 sentences | 1–2 sentences | Conversational content |
| **Paragraph** | 1–N paragraphs | 0 | Well-structured docs |
| **Recursive** | Variable | Configurable | Mixed content (default: LangChain) |
| **Semantic** | Variable, by embedding similarity | None | High-quality, slower |
| **Document-structure** | Section / chapter | None | Markdown, HTML, code |

**Recommendation**: Start with **recursive** at 512 tokens with 10% overlap. Tune from there.

**Rules of thumb:**
- Smaller chunks → better recall, more vectors, more cost
- Larger chunks → better context, fewer vectors, may dilute relevance
- Always include **metadata** (source, section, page, timestamp) for filtering and citation

## 2. Embedding Models

| Model | Dim | Cost | Quality | Notes |
|---|---|---|---|---|
| `text-embedding-3-small` (OpenAI) | 1536 | $0.02/M tokens | Good | Default starter |
| `text-embedding-3-large` (OpenAI) | 3072 | $0.13/M tokens | Better | When quality matters |
| `voyage-3` (Voyage AI) | 1024 | $0.06/M tokens | Excellent | Top in many benchmarks |
| `cohere-embed-v3` | 1024 | $0.10/M tokens | Excellent | Multilingual strong |
| `bge-large-en-v1.5` (local) | 1024 | Free (compute) | Good | Self-hosted option |
| `nomic-embed-text-v1.5` (local) | 768 | Free (compute) | Good | Long context (8K) |

**Rules of thumb:**
- Match embedding model between indexing and querying
- Use smaller dim (512–1024) for cost; larger for accuracy
- For multilingual: Cohere, Voyage, or `bge-m3`
- For long context (>2K tokens): `nomic-embed`, `voyage-large-2`

## 3. Vector Database Choice

| DB | Hosting | Best for | Cost | Notes |
|---|---|---|---|---|
| **pgvector** | Self / RDS / Supabase / Neon | Existing Postgres, moderate scale | $ | Use when you already have Postgres |
| **Pinecone** | Managed | Production, large scale, easy | $$ | Serverless option, good DX |
| **Qdrant** | Self / Managed | Performance, hybrid search | $ | Rust-based, very fast |
| **Weaviate** | Self / Managed | Rich features, GraphQL | $ | Built-in vectorization |
| **Chroma** | Self | Dev, prototyping, small scale | Free | Not for production |
| **Milvus** | Self / Managed | Massive scale (billions) | $ | Distributed |

**Decision tree:**
- Already using Postgres? → **pgvector** (until you hit scale issues)
- Want zero-ops, fast setup? → **Pinecone serverless**
- Want hybrid search + control? → **Qdrant**
- Prototype only? → **Chroma** or in-memory

## 4. Indexing

```sql
-- pgvector example (Postgres 16+)
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding VECTOR(1536),  -- match your model dim
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- IVFFlat or HNSW index (HNSW is newer, better recall)
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Query: cosine distance
SELECT id, content, metadata,
       1 - (embedding <=> $1) AS similarity
FROM documents
ORDER BY embedding <=> $1
LIMIT 10;
```

**HNSW parameters:**
- `m` = 16 (default) — links per node; higher = better recall, more memory
- `ef_construction` = 64 — build-time search depth; higher = better quality, slower build
- `ef_search` = 40 (query time) — query-time search depth; higher = better recall, slower

## 5. Retrieval

```ts
// Hybrid search: combine vector + BM25
async function retrieve(query: string, k = 10) {
  const embedding = await embed(query);
  const vectorHits = await vectorSearch(embedding, k * 2);

  // Optional: full-text search via Postgres tsvector
  const bm25Hits = await bm25Search(query, k * 2);

  // Reciprocal Rank Fusion
  return reciprocalRankFusion(vectorHits, bm25Hits, k);
}

function reciprocalRankFusion(
  hitsA: Hit[],
  hitsB: Hit[],
  k: number,
  k0 = 60
): Hit[] {
  const scores = new Map<string, number>();
  const all = new Map<string, Hit>();
  for (const [i, h] of hitsA.entries()) {
    scores.set(h.id, (scores.get(h.id) ?? 0) + 1 / (k0 + i + 1));
    all.set(h.id, h);
  }
  for (const [i, h] of hitsB.entries()) {
    scores.set(h.id, (scores.get(h.id) ?? 0) + 1 / (k0 + i + 1));
    all.set(h.id, h);
  }
  return [...all.values()]
    .sort((a, b) => (scores.get(b.id)! - scores.get(a.id)!))
    .slice(0, k);
}
```

**Why hybrid?** Vector search misses exact keyword matches (names, IDs, error codes). BM25 misses semantic similarity. Combine them.

## 6. Re-ranking

**Why re-rank?** First-stage retrieval optimizes recall; re-ranking optimizes precision. A cross-encoder is more accurate than a bi-encoder (embedding) but slower.

| Re-ranker | Notes |
|---|---|
| `cohere.rerank-v3` | Best quality, paid API |
| `bge-reranker-v2-m3` | Open-source, can self-host |
| LLM-based (GPT-4) | Slow, expensive, but flexible |

```ts
async function rerank(query: string, candidates: Hit[], topK = 5) {
  const response = await cohere.rerank({
    model: 'rerank-english-v3.0',
    query,
    documents: candidates.map(c => c.content),
    topN: topK,
  });
  return response.results.map(r => candidates[r.index]);
}
```

## 7. Prompt Augmentation

```ts
function buildPrompt(query: string, context: Hit[]): Prompt {
  const contextBlock = context
    .map((c, i) => `[${i + 1}] ${c.content}\nSource: ${c.metadata.source}`)
    .join('\n\n');

  return [
    {
      role: 'system',
      content: `You are a helpful assistant. Answer the user's question using ONLY the context below. If the answer is not in the context, say "I don't know."

Always cite your sources using [1], [2], etc.`,
    },
    {
      role: 'user',
      content: `Context:
${contextBlock}

Question: ${query}`,
    },
  ];
}
```

**Key rules:**
- Put context AFTER the system prompt, BEFORE the question (recency bias in LLMs)
- Number the chunks so the model can cite them
- Explicitly tell the model to say "I don't know" — reduces hallucination
- Set `maxTokens` to bound cost

## 8. Streaming Responses with Citations

```ts
const result = streamText({
  model,
  messages: buildPrompt(query, topK),
  tools: {
    citeSource: tool({
      description: 'Cite a source by its index',
      parameters: z.object({ index: z.number(), quote: z.string() }),
      execute: async ({ index, quote }) => ({ source: context[index - 1].metadata }),
    }),
  },
  onFinish: ({ text, usage }) => {
    // Save to DB, log usage
  },
});
```

## 9. Evaluation

**You cannot improve what you do not measure.** Set up an evaluation pipeline early.

### Retrieval metrics
- **Recall@k** — fraction of relevant docs in top-k
- **MRR** (Mean Reciprocal Rank) — how high the first relevant doc ranks
- **nDCG@k** — graded relevance ranking quality

### End-to-end metrics
- **Faithfulness** — does the answer stick to the context?
- **Answer relevance** — does it address the question?
- **Context relevance** — are the retrieved chunks useful?

### Tools
- **RAGAS** — automated eval, easy to start
- **LangSmith** — tracing + eval
- **Arize Phoenix** — open-source tracing + eval
- **Custom LLM-as-judge** — flexible, requires calibration

```ts
// RAGAS example
import { evaluate, faithfulness, contextRelevance, answerRelevance } from 'ragas';

const result = await evaluate({
  dataset: myEvalDataset, // { question, ground_truth, answer, contexts }
  metrics: [faithfulness, contextRelevance, answerRelevance],
});
```

## Common Pitfalls

| Pitfall | Fix |
|---|---|
| Garbage in, garbage out | Clean source documents (strip HTML, fix OCR) |
| Chunks too small (sentence-level) | Increase to 256–512 tokens |
| Chunks too large (>2K tokens) | Reduce; LLM gets lost |
| No overlap → missing context at boundaries | Add 10–20% overlap |
| Not filtering by metadata | Add filters (date, source, user) |
| Not re-ranking → low precision | Add cross-encoder re-ranker |
| LLM hallucinates beyond context | Add "say I don't know" + cite sources |
| Stale embeddings | Re-embed when source changes; track version |
| Slow retrieval at scale | Add HNSW or IVFFlat index; tune `ef_search` |
| High cost | Cache embeddings; use smaller model; reduce dimension |

## Stack-Specific Recipes

See related skills:
- `nextjs-ai-stack` — UI for chat
- `database-migration` — schema for vector columns
- `api-design` — endpoints for query / ingest

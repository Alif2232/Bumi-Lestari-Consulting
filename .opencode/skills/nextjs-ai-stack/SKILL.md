---
name: nextjs-ai-stack
description: Best practices for building Next.js 15+ applications with Vercel AI SDK v6, including App Router patterns, Server Components, streaming, tool use, and message persistence
license: MIT
compatibility: opencode
metadata:
  audience: frontend-engineers
  stack: nextjs-vercel-ai
---

## What I do

Provide canonical patterns and best practices for building AI-powered Next.js applications with Vercel AI SDK v6.

## When to use me

Load this skill when:
- Building or modifying Next.js routes, layouts, or components
- Implementing AI features (chat, completion, streaming, tool use, agents)
- Working with `@ai-sdk/react` (`useChat`, `useCompletion`, `useObject`)
- Setting up message persistence, rate limiting, or auth
- Choosing between Server Actions, Route Handlers, and Server Components
- Debugging streaming, hydration, or AI SDK errors

## Tech Stack Baseline (this project)

- **Next.js 15+** with App Router
- **React 19+** (Server Components, Server Actions)
- **Vercel AI SDK v6** (`ai`, `@ai-sdk/react`, `@ai-sdk/openai` / provider packages)
- **TypeScript** strict mode
- **Zod** for input validation
- **Tailwind CSS** for styling (assumed; confirm with project)
- **Auth**: NextAuth.js / Auth.js (confirm with project)

## Core Patterns

### 1. Route Structure (App Router)

```
app/
├── layout.tsx              # Root layout
├── page.tsx                # Home
├── (auth)/                 # Route group for auth pages
│   ├── login/page.tsx
│   └── register/page.tsx
├── (app)/                  # Authenticated route group
│   ├── layout.tsx          # Checks auth
│   ├── dashboard/page.tsx
│   └── chat/
│       ├── page.tsx        # Server Component, fetches initial messages
│       └── [id]/page.tsx
├── api/
│   └── chat/route.ts       # Route Handler for AI streaming
└── actions/                # Server Actions
    ├── chat.ts
    └── auth.ts
```

### 2. Server vs Client Components

**Default to Server Components.** Add `'use client'` ONLY when you need:
- `useState`, `useEffect`, `useRef`, or other React hooks
- Browser-only APIs (`window`, `localStorage`)
- Event handlers in JSX
- AI SDK client hooks (`useChat`, `useCompletion`)

**Pass data from Server to Client via props.** Never import server-only code into a client component.

### 3. Vercel AI SDK v6 — Server Side

#### Streaming text completion

```ts
// app/api/chat/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}
```

#### Tool use (function calling)

```ts
import { tool, z } from 'ai';

const result = streamText({
  model: openai('gpt-4o'),
  messages,
  tools: {
    getWeather: tool({
      description: 'Get current weather for a city',
      parameters: z.object({
        city: z.string().describe('City name'),
      }),
      execute: async ({ city }) => {
        // Call your API, DB, etc.
        return { temp: 72, condition: 'sunny' };
      },
    }),
  },
});
```

#### Multi-step tool use

```ts
const result = streamText({
  model: openai('gpt-4o'),
  messages,
  tools,
  maxSteps: 5, // Allow up to 5 tool calls per turn
});
```

### 4. Vercel AI SDK v6 — Client Side

```tsx
'use client';
import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, stop, reload } =
    useChat({
      api: '/api/chat',
      // Optional: id, body, headers, onError, onFinish
    });

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} disabled={isLoading} />
        <button type="submit">Send</button>
        {isLoading && <button onClick={stop}>Stop</button>}
      </form>
    </div>
  );
}
```

### 5. Input Validation (always)

```ts
import { z } from 'zod';

const ChatInput = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1).max(10_000),
  })).min(1).max(100),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = ChatInput.safeParse(body);
  if (!parsed.success) {
    return new Response('Invalid input', { status: 400 });
  }
  // ...
}
```

### 6. Message Persistence

- **Database**: PostgreSQL via Prisma or Drizzle (recommended)
- **Schema**: `id`, `chatId`, `role`, `content`, `createdAt`, `toolInvocations` (JSONB)
- **Pattern**: Server-side save in the route handler, before/after streaming
- **Loading**: Server Component fetches initial messages, passes to client
- **Truncation**: Watch for large content; consider summarization for long histories

### 7. Streaming UX

- Show "..." or skeleton while loading
- Use `isLoading` from `useChat` to disable input
- Implement `stop` to allow cancellation
- Show tool invocations in the UI (m.toolInvocations)
- Handle `error` gracefully (retry with `reload()`)
- Consider optimistic updates for user messages

### 8. Authentication (per route)

```ts
// app/(app)/layout.tsx
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login');
  return <>{children}</>;
}
```

### 9. Rate Limiting & Cost Control

- Implement per-user rate limit (Upstash Redis recommended)
- Set `maxTokens` in `streamText` to cap response size
- Set `maxSteps` to bound tool-call loops
- Set `maxDuration` on the route
- Log token usage to your analytics

### 10. Environment Variables

```bash
# .env.local (NEVER commit)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
DATABASE_URL=
AUTH_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

```ts
// Validate at startup
import { z } from 'zod';
const Env = z.object({
  OPENAI_API_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  // ...
});
Env.parse(process.env);
```

## Common Pitfalls

| Pitfall | Fix |
|---|---|
| Streaming blocked by Vercel function timeout | Set `maxDuration = 30` or use Edge runtime |
| `useChat` not updating | Ensure Server returns `toDataStreamResponse()`, not `toAIStreamResponse()` |
| Tool calls not running | Set `maxSteps > 1` (default is 1) |
| Hydration mismatch | Don't use `Date.now()` / `Math.random()` in Server Components |
| Secrets leaking to client | Use `NEXT_PUBLIC_` prefix only for truly public values |
| Bundle size bloat | Import `@ai-sdk/openai` per-call, not the umbrella `ai` package |
| Token cost explosion | Set `maxTokens`, `maxSteps`, implement rate limiting |

## Testing

- **Unit**: Vitest for pure functions, tool definitions
- **Component**: React Testing Library for `useChat`-driven components; mock the API
- **E2E**: Playwright for full chat flow
- **Mock the LLM**: Use MSW or a stub `/api/chat` route in tests

## References

- Vercel AI SDK docs: https://ai-sdk.dev/docs
- Next.js App Router: https://nextjs.org/docs/app
- AI SDK examples: https://github.com/vercel/ai/tree/main/examples

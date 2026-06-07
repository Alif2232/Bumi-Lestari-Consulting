# AI Coding Agent Project

> **This project uses [OpenCode](https://opencode.ai) as the primary AI coding agent.**
> All team members MUST read this document and `AGENTS.md` before contributing.

---

## What is this project?

A polyglot, multi-stack application combining:

| Layer | Technologies |
|---|---|
| **Frontend (Web)** | Next.js, Vercel AI SDK, Streamlit |
| **Mobile** | React Native, Flutter |
| **Backend** | Python, Node.js / TypeScript, Go |
| **Data** | PostgreSQL, MongoDB, Redis, Vector Database |

---

## Quickstart (for new team members)

1. **Install OpenCode** (terminal AI coding agent)
   ```bash
   # Windows
   choco install opencode
   # or
   npm install -g opencode-ai
   ```
2. **Configure provider** in OpenCode TUI:
   ```
   /connect
   ```
   Choose `opencode` and authenticate at [opencode.ai/auth](https://opencode.ai/auth).
3. **Clone this repository** and open it in OpenCode:
   ```bash
   cd /path/to/this/project
   opencode
   ```
4. **Verify configuration loaded** — the `@` menu should show all 10 subagents:
   `planner, debater, implementor, reviewer, tester, linter, commit-message, security-auditor, doc-writer, refactor-helper`

---

## Workflow (Plan-First)

We follow a **plan-first, quality-gated** workflow:

```
1. IDEATE   → @planner  (or Tab → planner primary)
            → @debater  (for architecture tradeoffs)

2. BUILD    → Tab → implementor
            → describe the task with @file references

3. REVIEW   → @reviewer
            → @security-auditor  (for auth, API, DB changes)
            → @linter

4. TEST     → @tester

5. DOCUMENT → @doc-writer

6. COMMIT   → @commit-message
            → git add . && git commit
```

---

## Default Models

| Model | Used for |
|---|---|
| `deepseek-v4-flash-free` | Global default, implementor, debater, security-auditor, planner, reviewer, refactor-helper, tester, linter |
| `minimax-m3-free` | commit-message, doc-writer (simple generation tasks) |

**Model strategy:** `deepseek-v4-flash-free` is the workhorse — used for everything that needs real reasoning (code generation, architecture debate, security audit, planning, review). `minimax-m3-free` handles mechanical, low-stakes generation (commit messages, simple docs).

Override per-session via `/models` in the TUI.

---

## Repository Structure

```
.
├── AGENTS.md              ← team-wide rules for the AI agent (READ THIS)
├── opencode.json          ← main OpenCode configuration
├── README.md              ← you are here
├── .gitignore
└── .opencode/
    ├── agents/            ← 10 specialized subagents
    ├── commands/          ← 4 shortcut commands (/plan, /review, /test, /commit)
    └── skills/            ← 7 reusable knowledge packs
```

---

## Available Subagents

| Subagent | Purpose | Permission |
|---|---|---|
| `planner` | Generate implementation plans | ask |
| `debater` | Discuss architectural tradeoffs | deny edits |
| `implementor` | Execute code (default primary) | full |
| `reviewer` | Code review for best practices | read-only |
| `tester` | Write & run tests | ask |
| `linter` | Run linters & formatters | bash: ask |
| `commit-message` | Generate conventional commits | read-only |
| `security-auditor` | Security audit | read-only |
| `doc-writer` | Documentation generation | ask |
| `refactor-helper` | Refactoring suggestions | ask |

---

## Available Skills (auto-loaded by context)

| Skill | When it loads |
|---|---|
| `nextjs-ai-stack` | Working on Next.js / Vercel AI SDK |
| `vector-rag-pipeline` | Building RAG / embeddings / vector search |
| `polyglot-monorepo` | Project structure / folder layout questions |
| `api-design` | API endpoint / REST / GraphQL / tRPC design |
| `database-migration` | Schema / migration / Prisma / Alembic work |
| `mobile-cross-platform` | React Native or Flutter tasks |
| `streamlit-data-app` | Streamlit data apps or dashboards |

---

## Conventions

- **Branches**: `feature/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`
- **Commits**: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`)
- **PRs**: Always use `/commit-message` then write a 1-paragraph PR description

---

## License

Internal use only.

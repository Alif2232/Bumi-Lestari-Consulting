# AGENTS.md — Project Rules for the AI Coding Agent

> **Read this first.** This file is read by OpenCode on every session and shapes how the AI behaves in this project. Keep it concise, opinionated, and team-shared.

---

## Project Overview

This is a **polyglot, multi-stack** project that combines:

- **Frontend (Web)**: Next.js, Vercel AI SDK, Streamlit
- **Mobile**: React Native, Flutter
- **Backend**: Python (FastAPI/Django/Streamlit), Node.js / TypeScript, Go
- **Data**: PostgreSQL, MongoDB, Redis, Vector Database (pgvector / Pinecone / Qdrant)

We follow a **plan-first, quality-gated** workflow using OpenCode as the AI coding agent.

---

## Build, Lint, and Test Commands

> Update this section as the project grows. Each stack has its own conventions.

### Frontend (Next.js)
```bash
cd apps/web
pnpm install
pnpm dev        # dev server
pnpm build      # production build
pnpm lint       # eslint
pnpm test       # vitest / jest
```

### Streamlit (Python data apps)
```bash
cd apps/streamlit
python -m venv .venv && source .venv/bin/activate  # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
streamlit run app.py
pytest
ruff check .
ruff format .
```

### Mobile (React Native / Expo)
```bash
cd apps/mobile-rn
pnpm install
pnpm start      # expo dev
pnpm ios
pnpm android
pnpm test
```

### Mobile (Flutter)
```bash
cd apps/mobile-flutter
flutter pub get
flutter run
flutter test
flutter analyze
```

### Backend (Node.js / TypeScript)
```bash
cd services/api-node
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm lint
```

### Backend (Python)
```bash
cd services/api-python
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload  # or flask run / python main.py
pytest
ruff check .
```

### Backend (Go)
```bash
cd services/api-go
go mod tidy
go run .
go test ./...
go vet ./...
golangci-lint run
```

### Database
```bash
# Migrations are stack-specific (Prisma / Alembic / migrate / Mongoose).
# See each service's README.
```

---

## Architecture & Repository Structure

> This is the target layout. Update as the project evolves.

```
.
├── apps/
│   ├── web/                    # Next.js frontend
│   ├── streamlit/              # Streamlit data app
│   ├── mobile-rn/              # React Native app
│   └── mobile-flutter/         # Flutter app
├── services/
│   ├── api-node/               # Node.js / TypeScript backend
│   ├── api-python/             # Python backend
│   └── api-go/                 # Go backend
├── packages/                   # Shared libraries (TS types, schemas, etc.)
├── infra/                      # IaC, Docker, CI/CD
├── docs/                       # Project documentation
└── .opencode/                  # OpenCode configuration (agents, skills, commands)
```

---

## Code Standards

### General
- Prefer **small, focused files** (under ~300 lines)
- **Type safety** is mandatory: TypeScript strict mode, Python type hints, Go explicit types
- Use **dependency injection** at service boundaries (don't reach for globals)
- Prefer **composition over inheritance**
- Write **tests for behavior, not implementation** (the @tester subagent will help)
- Never commit secrets, API keys, or `.env` files

### Frontend (Next.js + Vercel AI SDK)
- Use **App Router** (not Pages Router) for new code
- Prefer **Server Components** by default; mark `'use client'` only when needed
- For AI features, use **Vercel AI SDK v6** (`@ai-sdk/react`, `streamText`, `streamUI`, `useChat`)
- Stream long-running AI responses; do not block the UI
- Validate all inputs with **Zod** before passing to model providers

### Backend (Node.js / TypeScript)
- Use **TypeScript strict** + **ESM**
- Validate inputs with **Zod** at API boundaries
- Use **Prisma** or **Drizzle** for PostgreSQL; **Mongoose** for MongoDB
- Cache hot reads in **Redis** with explicit TTLs
- Use **structured logging** (pino / winston); no `console.log` in committed code

### Backend (Python)
- Use **type hints** everywhere; mypy strict for new modules
- Prefer **FastAPI** for HTTP APIs (async-first), **Django** only for admin-heavy apps
- Use **Pydantic v2** for validation
- Use **SQLAlchemy 2.x** async or **SQLModel** for PostgreSQL
- **Ruff** for linting & formatting (replaces black + flake8 + isort)
- **pytest** for tests; use `pytest-asyncio` for async tests

### Backend (Go)
- Use **standard library** where reasonable; minimal external deps
- Use **context.Context** for all I/O
- Use **slog** (Go 1.22+) for structured logging
- Use **golangci-lint** as the unified linter
- Use `errors.Is` / `errors.As` for error inspection; wrap with `%w`

### Mobile (React Native)
- Use **Expo** unless native modules are required
- Use **React Navigation** for routing
- Use **Zustand** or **TanStack Query** for state (avoid Redux unless team already uses it)
- Test with **Jest** + **React Native Testing Library**

### Mobile (Flutter)
- Use **Riverpod** or **Bloc** for state management (decide per project, then stick with it)
- Use **go_router** for navigation
- Use **freezed** + **json_serializable** for models
- Lint with `flutter analyze`; enforce with CI

### Database
- **PostgreSQL**: prefer pgvector when vector search is needed
- **MongoDB**: use it only for document-shaped data; not a general-purpose key-value store
- **Redis**: cache, sessions, pub/sub, rate limiting. Always set TTLs
- **Vector DB**: pgvector, Qdrant, or Pinecone — choose based on scale & ops preference

---

## Workflow Rules (for the AI agent)

1. **Plan before build.** For any non-trivial change, switch to `planner` mode (Tab) and produce a plan. Iterate on the plan until the user approves.
2. **Use the debate agent for architecture decisions.** When the user asks "should we use X or Y?", invoke `@debater` to expose tradeoffs.
3. **Quality gate every change.** Before committing, run `@reviewer`, `@linter`, `@tester`, and (for sensitive changes) `@security-auditor`.
4. **Document the change.** Use `@doc-writer` to update README / API docs / inline comments for any user-facing change.
5. **Conventional commits.** Use `@commit-message` to generate commit messages; never commit secrets.
6. **Never modify `.env`, `*.key`, `*.pem`, or credential files** without explicit user approval.
7. **No silent failures.** All errors must be logged with structured context.
8. **Prefer editing existing files** over creating new ones. Before creating a new file, justify why.

---

## Conventions & Gotchas

- **Monorepo package names**: scoped with `@<project>/<package>` (e.g., `@acme/core-types`)
- **Python virtual envs**: always use `.venv/` inside each service directory
- **Node version**: pinned in `.nvmrc` at repo root
- **Go version**: pinned in `go.mod`
- **Time zones**: store everything as UTC; convert at the edge
- **Money / quantities**: never use floats; use integer minor units or a decimal library
- **AI prompts**: never log the full prompt body if it may contain PII

---

## Things the AI Should NOT Do

- Do not introduce new top-level dependencies without asking
- Do not change the directory structure (`apps/`, `services/`, `packages/`) without team discussion
- Do not refactor across stacks in a single PR (split by stack)
- Do not commit `node_modules/`, `__pycache__/`, `dist/`, `build/`, `.env`
- Do not run `git push --force` or `git reset --hard` without explicit approval
- Do not delete or rename files outside the scope of the current task

---

## Pointers

- See `README.md` for the OpenCode setup and workflow overview
- See `opencode.json` for agent & model configuration
- See `.opencode/agents/` for specialized subagent definitions
- See `.opencode/skills/` for stack-specific knowledge packs

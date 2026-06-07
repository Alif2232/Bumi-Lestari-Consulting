---
name: polyglot-monorepo
description: Conventions for organizing a polyglot monorepo that combines Next.js, React Native, Flutter, Python, Node.js, and Go services with shared packages
license: MIT
compatibility: opencode
metadata:
  audience: all-engineers
  stack: monorepo
---

## What I do

Provide canonical folder layout, naming, and dependency rules for a polyglot monorepo that mixes web (Next.js), mobile (RN/Flutter), backend services (Python/Node/Go), and shared packages.

## When to use me

Load this skill when:
- Asking "where should I put this new service / app / package?"
- Setting up a new repo or adding a new app to an existing repo
- Deciding between a monorepo and a multi-repo
- Sharing types or code between frontend and backend
- Standardizing CI/CD, env, or build patterns across stacks

## Target Layout (this project)

```
.
├── apps/                        # User-facing applications
│   ├── web/                     # Next.js 15+ (App Router)
│   ├── streamlit/               # Streamlit data app
│   ├── mobile-rn/               # React Native (Expo)
│   └── mobile-flutter/          # Flutter
│
├── services/                    # Backend services
│   ├── api-node/                # Node.js / TypeScript (Fastify/Hono/Express)
│   ├── api-python/              # Python (FastAPI)
│   └── api-go/                  # Go
│
├── packages/                    # Shared libraries
│   ├── core-types/              # TypeScript types & Zod schemas
│   ├── core-python/             # Pydantic models mirrored from TS types
│   ├── ui/                      # Shared React components
│   ├── config-eslint/           # Shared ESLint config
│   ├── config-tsconfig/         # Shared tsconfig
│   └── proto/                   # Protocol buffers / OpenAPI specs
│
├── infra/                       # IaC, Docker, CI/CD
│   ├── docker/                  # Dockerfiles
│   ├── compose/                 # docker-compose stacks
│   ├── terraform/               # (or pulumi/)
│   └── .github/workflows/       # CI/CD
│
├── docs/                        # Markdown docs (architecture, ADRs, runbooks)
│   ├── architecture.md
│   └── decisions/               # ADRs (0001-record-architecture.md)
│
├── tools/                       # Repo-level dev scripts
│   ├── scripts/                 # Bash / Node scripts
│   └── generators/              # Plop / Hygen templates
│
├── .opencode/                   # OpenCode agents, commands, skills
├── AGENTS.md
├── opencode.json
├── .gitignore
├── .editorconfig
├── .nvmrc                       # Pinned Node version
├── .python-version              # Pinned Python version
├── pnpm-workspace.yaml          # Node monorepo
├── Makefile                     # Repo-level convenience commands
└── README.md
```

## Apps vs Services vs Packages

| Folder | Purpose | Public? | Examples |
|---|---|---|---|
| `apps/*` | User-facing, deployable as a unit | Yes (web) | Next.js, RN, Flutter, Streamlit |
| `services/*` | Server-side, exposes an API | Yes (via gateway) | api-node, api-python, api-go |
| `packages/*` | Imported by apps/services, not deployed | No | types, UI, configs |

**Rule of thumb:** if it has its own port / process / build, it's an app or service. If it's imported, it's a package.

## Naming Conventions

- **Folders:** `kebab-case` (e.g., `mobile-rn`, `api-python`)
- **TypeScript packages:** `@<scope>/<name>` (e.g., `@acme/core-types`)
- **Python packages:** `<scope>_<name>` (e.g., `acme_core`)
- **Go modules:** `github.com/<org>/<service>` (e.g., `github.com/acme/api-go`)
- **Services in code:** singular, domain-aligned (`users`, `billing`, `search`)

## Shared Types Across Stacks

The hardest problem in a polyglot monorepo is **keeping types in sync** between TS, Python, and Go.

### Strategy A: TypeScript is source of truth (recommended for web-heavy)

1. Define types and Zod schemas in `packages/core-types/src/`
2. Generate Python Pydantic models from Zod (via `zod-to-python` or custom codegen)
3. Generate Go structs from Zod (via `zod-to-go` or JSON Schema → Go)
4. Generate OpenAPI spec from Zod for documentation

### Strategy B: OpenAPI is source of truth (recommended for API-heavy)

1. Define OpenAPI spec in `packages/proto/openapi.yaml`
2. Generate TS types via `openapi-typescript`
3. Generate Python models via `openapi-python-client`
4. Generate Go types via `oapi-codegen`

### Strategy C: Protobuf is source of truth (recommended for service-to-service)

1. Define `.proto` files in `packages/proto/`
2. Generate TS, Python, and Go stubs
3. Best for gRPC services

**Recommendation for this project:** Start with **Strategy A** (Zod-centric) since the web is primary. Move to Strategy C if/when adding internal gRPC.

## Dependency Rules

```
apps/*    → may depend on: packages/*, other apps' public APIs
services/* → may depend on: packages/*, other services via API/queue (NOT direct import)
packages/* → may depend on: other packages/* (no circular)
infra/*    → may depend on: nothing inside apps/services/packages
```

**Forbidden patterns:**
- ❌ `apps/web` importing source from `services/api-node` (use a package or an API call)
- ❌ `services/api-python` importing from `services/api-go` (use a queue or RPC)
- ❌ Circular dependencies between packages
- ❌ `apps/*` importing from `infra/*` (infra is operational, not code)

## Tooling at the Repo Root

### `Makefile` (recommended)

```makefile
.PHONY: install dev build test lint clean

install:
	pnpm install
	cd services/api-python && uv sync
	cd services/api-go && go mod download

dev:
	pnpm --filter "./apps/*" dev

build:
	pnpm --filter "./apps/*" build
	cd services/api-python && uv build
	cd services/api-go && go build ./...

test:
	pnpm test
	cd services/api-python && pytest
	cd services/api-go && go test ./...

lint:
	pnpm lint
	cd services/api-python && ruff check .
	cd services/api-go && golangci-lint run
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "services/api-node"
  - "packages/*"
```

### `.editorconfig`

```ini
root = true
[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{py,go}]
indent_size = 4

[Makefile]
indent_style = tab
```

## CI/CD Pattern

```
.github/workflows/
├── ci.yml                    # Lint + test on PR
├── cd-web.yml                # Deploy Next.js to Vercel
├── cd-api-node.yml           # Deploy Node service
├── cd-api-python.yml         # Deploy Python service
├── cd-mobile.yml             # EAS Build for RN, Flutter build
└── release.yml               # Tag + changelog on main
```

**Rule:** Each app/service has its own workflow. Sharing too much creates a bottleneck.

## When NOT to Use a Monorepo

- **Team is < 2 people** → polyrepo with shared packages via git subtree
- **Apps have very different release cadences and ownership** → polyrepo
- **You need to use different VCS providers** → polyrepo
- **Build times are dominated by one app and that slows everyone down** → split

For this project (2–5 people, multi-stack, plan-first), **monorepo is the right call**.

## Anti-Patterns

| Anti-pattern | Why it's bad | Fix |
|---|---|---|
| `services/api-node` exports React components | Layer violation | Move to `packages/ui` |
| Shared mutable state between services | Coupling, race conditions | Use events / queue |
| One giant `package.json` for all Node code | Slow installs, unclear boundaries | Use pnpm workspaces |
| Importing Go from Python via cgo | Build complexity, portability | Use HTTP or gRPC |
| Duplicating types in 3 languages "to save time" | Drift, bugs | Codegen from one source |

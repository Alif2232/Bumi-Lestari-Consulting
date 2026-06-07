---
name: api-design
description: Best practices for designing REST, GraphQL, tRPC, and gRPC APIs — naming, error handling, auth, versioning, pagination, and OpenAPI documentation
license: MIT
compatibility: opencode
metadata:
  audience: backend-engineers
  stack: api-design
---

## What I do

Provide canonical patterns for designing consistent, maintainable APIs across REST, GraphQL, tRPC, and gRPC. Covers naming, error handling, auth, pagination, rate limiting, and documentation.

## When to use me

Load this skill when:
- Designing a new API (endpoints, schemas, errors)
- Choosing between REST, GraphQL, tRPC, gRPC
- Standardizing error response shapes
- Implementing pagination, filtering, sorting
- Adding auth / rate limiting
- Generating or maintaining OpenAPI specs
- Reviewing API PRs

## API Style Decision

| Style | Best for | Avoid when |
|---|---|---|
| **REST + JSON** | Public APIs, simple CRUD, broad compatibility | Complex relational queries |
| **tRPC** | TypeScript-only stacks (web ↔ Node backend) | Multi-language clients |
| **GraphQL** | Mobile + web with very different views, aggregations | Simple CRUD, serverless edge |
| **gRPC** | Service-to-service, low latency, streaming | Public APIs, browser clients (needs proxy) |
| **WebSocket / SSE** | Real-time, AI streaming, notifications | One-shot requests |

**Default for this project:**
- **External / public**: REST + OpenAPI
- **Internal web ↔ Node**: tRPC (if web is Next.js and backend is Node)
- **Web ↔ Python or Go**: REST
- **Service ↔ service**: gRPC or REST
- **AI streaming**: SSE (Vercel AI SDK handles this)

## REST Conventions

### URL Structure

```
GET    /v1/users                  # List users
GET    /v1/users/:id              # Get one user
POST   /v1/users                  # Create user
PATCH  /v1/users/:id              # Partial update
PUT    /v1/users/:id              # Full replace
DELETE /v1/users/:id              # Delete

GET    /v1/users/:id/posts        # Nested resource (user's posts)
POST   /v1/users/:id/posts        # Create post for user

POST   /v1/auth/login             # Action (not CRUD)
POST   /v1/auth/refresh
POST   /v1/auth/logout

GET    /v1/search?q=...&type=user # Search
```

**Rules:**
- Plural nouns for collections (`/users`, not `/user`)
- Lowercase, kebab-case for multi-word resources (`/blog-posts`)
- Version in URL: `/v1/...` (preferred over header for public APIs)
- No verbs in URLs (use HTTP methods)
- Max nesting: 2 levels (`/users/:id/posts`). Beyond that, flatten.

### HTTP Methods

| Method | Idempotent | Safe | Use |
|---|---|---|---|
| GET | ✅ | ✅ | Read |
| POST | ❌ | ❌ | Create, action |
| PUT | ✅ | ❌ | Full replace |
| PATCH | ❌ | ❌ | Partial update |
| DELETE | ✅ | ❌ | Delete |

### Status Codes

| Code | Use |
|---|---|
| `200` | Success with body |
| `201` | Resource created (include `Location` header) |
| `204` | Success, no body (common for DELETE) |
| `400` | Bad request (validation error) |
| `401` | Unauthenticated |
| `403` | Authenticated but not authorized |
| `404` | Resource not found |
| `409` | Conflict (duplicate, version mismatch) |
| `422` | Unprocessable entity (semantic validation failure) |
| `429` | Rate limited |
| `500` | Server error (no client action) |
| `503` | Service unavailable (retry with backoff) |

### Error Response Shape (canonical)

```json
{
  "error": {
    "code": "user_email_taken",
    "message": "A user with this email already exists.",
    "details": {
      "field": "email",
      "value": "alice@example.com"
    },
    "requestId": "req_abc123",
    "docs": "https://api.example.com/docs/errors#user_email_taken"
  }
}
```

**Rules:**
- `code`: machine-readable, snake_case, namespaced (`user_*`, `auth_*`, `payment_*`)
- `message`: human-readable, sentence case
- `details`: optional, structured per error
- `requestId`: ALWAYS include for debugging (correlate to logs)
- `docs`: link to error-specific docs (when applicable)

### Pagination

**Offset pagination (simple):**
```
GET /v1/users?limit=20&offset=40
```
- Simple, but slow on large tables, inconsistent under writes

**Cursor pagination (recommended for lists that grow):**
```
GET /v1/users?limit=20&cursor=eyJpZCI6MTAwfQ
```
- Fast, consistent, but no random access

**Response shape:**
```json
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTIwfQ",
    "hasMore": true
  }
}
```

### Filtering, Sorting, Field Selection

```
GET /v1/users?filter[role]=admin&filter[status]=active
GET /v1/users?sort=-createdAt,name          # - prefix = DESC
GET /v1/users?fields=id,name,email          # sparse fieldsets
```

**Keep it simple** — don't try to be a query language. If clients need complex queries, use GraphQL.

### Authentication

```
Authorization: Bearer <jwt>          # Most common
Authorization: Basic <base64>        # For service-to-service
Cookie: session=<id>                 # For browser-based apps
X-API-Key: <key>                     # For server-to-server
```

**Rules:**
- Always use HTTPS
- JWT: short-lived access token (15 min) + long-lived refresh token
- Validate token on EVERY request (middleware)
- For role/scope checks, do them after authentication, before business logic

### Rate Limiting

Headers (standard):
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1640995200
Retry-After: 30           # only on 429
```

**Implementation:** Upstash Redis + `@upstash/ratelimit` (Node) or `slowapi` (Python).

### Versioning

**URL versioning (recommended for public):**
```
/v1/users
/v2/users
```

**Header versioning (for internal):**
```
Accept: application/vnd.example.v2+json
```

**Rule:** Only break the API when you must. Adding fields is non-breaking; removing or changing field types is breaking.

## tRPC (TypeScript-only)

```ts
// server/router.ts
import { initTRPC, z } from '@trpc/server';
import { authedProcedure } from './middleware';

const t = initTRPC.create();

export const userRouter = t.router({
  get: authedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.user.findUnique({ where: { id: input.id } });
    }),

  create: authedProcedure
    .input(z.object({ email: z.string().email(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.user.create({ data: input });
    }),
});

export type AppRouter = typeof appRouter;
```

```tsx
// client
const trpc = useTRPC();
const { data } = useQuery(trpc.user.get.queryOptions({ id }));
```

**When to use:** Web (Next.js) ↔ Node backend, both in TypeScript, same monorepo. End-to-end type safety with zero codegen.

## GraphQL (N+1, complexity, etc.)

**Skip for this project unless you have:**
- Multiple clients with very different view shapes
- Complex relational aggregations
- Strong typing for client queries

If you do use it:
- Use **DataLoader** to avoid N+1
- Implement **query complexity limits**
- Use **persisted queries** in production
- Generate types with **GraphQL Code Generator**

## OpenAPI Specification

```yaml
openapi: 3.1.0
info:
  title: Acme API
  version: 1.0.0
  description: Acme user service

servers:
  - url: https://api.example.com

paths:
  /v1/users:
    get:
      operationId: listUsers
      parameters:
        - name: limit
          in: query
          schema: { type: integer, default: 20, maximum: 100 }
        - name: cursor
          in: query
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
        '401':
          $ref: '#/components/responses/Unauthorized'

components:
  schemas:
    User:
      type: object
      required: [id, email, name]
      properties:
        id: { type: string, format: uuid }
        email: { type: string, format: email }
        name: { type: string }
        createdAt: { type: string, format: date-time }
    UserList:
      type: object
      required: [data, pagination]
      properties:
        data:
          type: array
          items: { $ref: '#/components/schemas/User' }
        pagination: { $ref: '#/components/schemas/Pagination' }
    Error:
      $ref: '#/components/schemas/Error'  # canonical error shape
```

**Tools:**
- **Generate from Zod:** `zod-to-openapi` (Node), `pydantic-to-openapi` (Python)
- **Generate from comments:** Python decorators, Express middleware
- **Visualize:** Swagger UI, Redoc, Stoplight
- **Test:** Schemathesis, Dredd

## Common Anti-Patterns

| Anti-pattern | Fix |
|---|---|
| Return 200 with `success: false` body | Use proper HTTP status codes |
| Different error shapes per endpoint | One canonical error response |
| No pagination on list endpoints | Always paginate (even if "we only have 10 items") |
| Verbs in URLs (`/getUser`, `/createOrder`) | Use HTTP methods + nouns |
| Mixed case in JSON (`userId` vs `user_id`) | Pick one: snake_case (common) or camelCase (JS-native) |
| API key in URL | Header or POST body |
| No rate limit | Add from day one (Upstash is cheap) |
| Returning full DB objects (with `passwordHash`) | Use DTOs / response models |
| Using `*` CORS in production | Whitelist explicit origins |
| Documenting in code comments only | Generate OpenAPI from schema |

## API Review Checklist

Before merging any new endpoint, verify:

- [ ] URL follows REST conventions
- [ ] HTTP method is correct and idempotent where appropriate
- [ ] Status codes are correct (especially 4xx vs 5xx)
- [ ] Error response uses canonical shape with `code`, `message`, `requestId`
- [ ] Inputs are validated (Zod / Pydantic / etc.) and bad input returns 400
- [ ] Auth is enforced (401 if missing, 403 if forbidden)
- [ ] Rate limit is configured
- [ ] Pagination is implemented for list endpoints
- [ ] OpenAPI spec is updated
- [ ] Tests cover 2xx, 4xx, and at least one 5xx path
- [ ] No PII or secrets in logs

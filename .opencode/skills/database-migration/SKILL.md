---
name: database-migration
description: Safe schema migration patterns for PostgreSQL, MongoDB, and Redis — covering Prisma, Drizzle, Alembic, Mongoose, and the difference between online vs offline migrations
license: MIT
compatibility: opencode
metadata:
  audience: backend-engineers
  stack: databases
---

## What I do

Provide canonical patterns for safe, reversible schema migrations across PostgreSQL, MongoDB, and Redis — including tool choice, online vs offline migrations, and rollback strategies.

## When to use me

Load this skill when:
- Adding or changing a table / collection / schema
- Choosing between Prisma, Drizzle, Alembic, Mongoose, raw SQL
- Deciding whether a migration is safe to run online
- Performing a destructive change (column drop, type change)
- Backfilling data after a schema change
- Setting up a fresh project's migration workflow

## Tool Choice (per stack)

| Stack | Recommended | Alternative | Notes |
|---|---|---|---|
| **Node.js / TS + Postgres** | **Prisma** | Drizzle, Kysely, raw | Prisma = best DX; Drizzle = lighter, SQL-first |
| **Node.js / TS + MongoDB** | **Mongoose** | Prisma (with MongoDB connector), raw | Mongoose = most mature |
| **Python + Postgres** | **Alembic** | SQLModel, Tortoise ORM | Alembic = standard; pairs with SQLAlchemy |
| **Python + MongoDB** | **PyMODM** or **PyMongo** | Beanie, Mongoengine | Beanie = async + Pydantic |
| **Go + Postgres** | **goose** or **golang-migrate** | sql-migrate, Atlas | All decent; pick by team familiarity |
| **Any + Redis** | N/A | N/A | Redis is schemaless; no migrations needed |

**Rule of thumb:** pick the tool that matches your ORM. Don't mix.

## The Golden Rules of Migrations

1. **Migrations are immutable.** Never edit a migration after it has run in any environment. Add a new one.
2. **Forward-compatible first.** The new code must work with both the old and new schema during the rollout.
3. **Backwards-compatible last.** The old code must work with the new schema until all clients are upgraded.
4. **Small, focused, atomic.** One migration = one logical change. Don't bundle 5 unrelated changes.
5. **Always have a rollback plan.** Test the rollback before running the forward.
6. **Never run a migration during peak traffic** unless it's safe to do online.

## The Three-Step Migration Pattern

For any non-trivial schema change, use this pattern across multiple deploys:

```
Deploy 1: ADDS
  - Add new column / table (nullable, no constraints)
  - Old code ignores it; new code can write to it

Deploy 2: BACKFILLS
  - Migration script populates the new column from the old one
  - Old code keeps working; new code uses the new column

Deploy 3: REMOVES
  - Make new column NOT NULL (or add constraint)
  - Remove old column
  - Old code is gone
```

This is sometimes called "expand-and-contract" or "parallel change". It's the only safe way to do destructive changes in production.

## PostgreSQL: Prisma

```prisma
// schema.prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  posts     Post[]

  @@index([role, createdAt])
}

enum Role {
  USER
  ADMIN
}
```

```bash
# Create a migration
npx prisma migrate dev --name add_user_role

# Apply to production
npx prisma migrate deploy

# Reset local DB (dev only!)
npx prisma migrate reset
```

**Migrations folder:** `prisma/migrations/<timestamp>_<name>/migration.sql`

**Prisma pitfalls:**
- `migrate dev` resets the DB on schema drift — never use in prod
- Use `migrate deploy` in CI/CD, never `migrate dev`
- Custom SQL goes in `migration.sql`, not in `schema.prisma`

## PostgreSQL: Drizzle

```ts
// schema.ts
import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: roleEnum('role').notNull().default('user'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

```bash
# Generate migration from schema diff
npx drizzle-kit generate

# Apply
npx drizzle-kit migrate
```

**Drizzle vs Prisma:** Drizzle is closer to SQL, lighter, and works well with edge runtimes. Prisma has better DX and tooling.

## PostgreSQL: Alembic (Python)

```python
# alembic/versions/abc123_add_user_role.py
from alembic import op
import sqlalchemy as sa

revision = 'abc123'
down_revision = 'def456'

def upgrade() -> None:
    op.add_column('users', sa.Column('role', sa.String(20), nullable=True))

def downgrade() -> None:
    op.drop_column('users', 'role')
```

```bash
# Create auto-generated migration
alembic revision --autogenerate -m "add user role"

# Apply
alembic upgrade head

# Roll back one step
alembic downgrade -1
```

**Alembic tips:**
- Always review `autogenerate` output before committing
- Custom data migrations (backfills) go in the same file or a separate one
- Use `op.batch_alter_table` for SQLite (which can't do most `ALTER TABLE`)

## MongoDB: Mongoose

```ts
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

userSchema.index({ role: 1, createdAt: -1 });

const User = model('User', userSchema);
```

**MongoDB has no "migrations" in the SQL sense.** Instead, manage schema changes by:
1. **Adding fields is non-breaking** (default value handles old docs)
2. **Removing fields is safe** (old fields just sit there)
3. **Renaming fields** requires a backfill script
4. **Changing field types** requires a migration script + careful rollout

```ts
// Backfill script
const cursor = User.find({ newField: { $exists: false } }).cursor();
for await (const user of cursor) {
  user.newField = transformOldField(user.oldField);
  await user.save();
}
```

**Use a migration tool like `migrate-mongo` for repeatability** even though Mongo is schemaless.

## Dangerous Operations & How to Handle Them

| Operation | Risk | Safe approach |
|---|---|---|
| **Add column with default + NOT NULL** | Locks table on large tables in old PG versions | Add nullable, backfill, then add NOT NULL in a separate migration. PG 11+ does this fast. |
| **Drop column** | Breaks old code reading it | Three-step: stop using → wait one deploy cycle → drop |
| **Change column type** | Breaks readers/writers | Add new column → dual-write → switch reads → drop old |
| **Add index on large table** | Locks writes for minutes | Use `CREATE INDEX CONCURRENTLY` (PG) or `db.collection.createIndex({...}, { background: true })` (older Mongo) |
| **Rename table** | Breaks FKs and queries | Don't. Add a view, migrate, then drop. |
| **Backfill large table** | Long-running query, blocks other queries | Batch in chunks of 1k–10k, sleep between batches |
| **Drop database / collection** | Permanent data loss | Require explicit confirmation + backup verified |

## Backfill Pattern (safe)

```ts
// Batch backfill
async function backfillNewField() {
  const BATCH_SIZE = 1000;
  let processed = 0;

  while (true) {
    const docs = await User.find({ newField: { $exists: false } })
      .limit(BATCH_SIZE);

    if (docs.length === 0) break;

    await Promise.all(docs.map(async (d) => {
      d.newField = transformOldField(d.oldField);
      await d.save();
    }));

    processed += docs.length;
    console.log(`Backfilled ${processed} users`);

    // Optional: small delay to reduce load
    await new Promise(r => setTimeout(r, 100));
  }
}
```

## Testing Migrations

- **Always test the rollback** (run `downgrade` / revert / drop)
- **Test on a copy of production data** (size matters — small test DBs hide locking issues)
- **Test with concurrent writes** running against the migration
- **Verify in staging first** with production-like load

## CI/CD for Migrations

```yaml
# Example: run migrations before deploy
- name: Apply migrations
  run: npx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}

- name: Deploy app
  run: vercel deploy --prod
```

**Order:** migrations first, then deploy code. The new code must work with the new schema (forward-compatibility from Rule 2).

## Common Anti-Patterns

| Anti-pattern | Why bad | Fix |
|---|---|---|
| Editing an applied migration | Different schemas across environments | Add a new migration |
| `migrate dev` in CI/CD | Can reset prod DB | Use `migrate deploy` only |
| `ALTER TABLE` with default on huge table (PG < 11) | Table lock, downtime | Add nullable, backfill, then NOT NULL |
| Dropping a column in the same deploy as removing its reads | Old pods still running crash | Three-step rollout |
| No index on foreign keys | Slow JOINs, cascades | Add index on every FK column |
| Unbounded `text` columns in PG | Performance degradation | Use `varchar(n)` or constrain at app layer |
| Mongoose schema without indexes | Slow queries, full collection scans | Add indexes for common queries |
| Backup before drop, never tested | Backup is corrupted, you find out too late | Periodically test restore |

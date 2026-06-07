---
description: Run tests and add coverage for the specified file or feature
agent: tester
subtask: true
---

Run the test suite and add coverage for the specified target.

## Target

$ARGUMENTS

## Test Commands (per stack)

Use the project-standard command from `AGENTS.md` for the relevant stack:

- **Next.js / TypeScript**: `pnpm test` (in `apps/web`)
- **Python (FastAPI)**: `pytest` (in `services/api-python`)
- **Node.js service**: `pnpm test` (in `services/api-node`)
- **Go**: `go test ./...` (in `services/api-go`)
- **Flutter**: `flutter test` (in `apps/mobile-flutter`)
- **React Native**: `pnpm test` (in `apps/mobile-rn`)
- **Streamlit**: `pytest` (in `apps/streamlit`)

## Instructions

1. Detect the target's stack from the path.
2. Run the existing test suite first to establish a baseline.
3. Identify untested functions / branches in the target.
4. Write tests following the project's existing testing style.
5. Re-run to confirm.
6. Report: tests added, test run results, coverage delta, gaps remaining.

If the target is ambiguous, ask the user which file/feature to test.

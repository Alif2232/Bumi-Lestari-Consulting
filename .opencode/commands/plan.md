---
description: Switch to planner mode and generate a detailed implementation plan
agent: planner
subtask: false
---

You are now in **planning mode**. Generate a detailed, actionable plan for the following task.

## Task

$ARGUMENTS

## Instructions

1. Read the relevant files first (`@file` references are welcome).
2. If significant architectural decisions are involved, recommend invoking `@debater` first and stop.
3. Otherwise, produce the plan using the structure defined in your agent prompt:
   - Task Summary
   - Context & Constraints
   - Approach
   - Step-by-Step Plan
   - Quality Gate Checklist
   - Risks & Open Questions
4. Cite file paths with `path:line` notation.
5. Do NOT start executing. The user will switch to the `implementor` agent when ready.

If the task is ambiguous, ask clarifying questions instead of guessing.

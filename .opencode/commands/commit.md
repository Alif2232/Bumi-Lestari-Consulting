---
description: Generate a conventional commit message from staged or unstaged changes
agent: commit-message
subtask: true
---

Generate a conventional commit message for the current changes.

## Current State

Status:
!`git status --short`

Staged diff (if any):
!`git diff --staged | head -200`

Unstaged diff (if no staged changes):
!`git diff | head -200`

Recent commits (for style reference):
!`git log --oneline -10`

## Instructions

1. Analyze the changes above.
2. Detect the type (`feat`, `fix`, `refactor`, `test`, `docs`, `chore`, etc.) and the affected scope (e.g., `web`, `api-python`, `db`, `opencode`).
3. If changes mix concerns, recommend splitting into multiple commits.
4. Draft the message following the rules in the `commit-message` agent.
5. Output the message in a single code block, ready to copy-paste into `git commit -m "..."` or your editor.
6. **Do NOT run `git commit` yourself.** The user will do that.

If the diff includes secrets, generated files, or `package-lock.json` updates that weren't intentional, flag them before drafting.

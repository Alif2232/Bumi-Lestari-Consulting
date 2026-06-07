---
description: Invoke the reviewer subagent to audit recent code changes
agent: reviewer
subtask: true
---

Review the recent code changes for quality, correctness, and adherence to project conventions.

## Scope

Focus on the following change or file(s):
$ARGUMENTS

## Git Context

Recent commits:
!`git log --oneline -10`

Files changed in the latest commit (or working tree vs HEAD):
!`git diff --stat HEAD~1 HEAD 2>/dev/null || git diff --stat`

Full diff (truncated):
!`git diff HEAD~1 HEAD 2>/dev/null | head -300 || git diff | head -300`

## Instructions

Use the `@reviewer` subagent's standard review format:
1. Summary (overall assessment)
2. Blocking Issues (with file:line references)
3. Suggestions (grouped by file)
4. Nitpicks
5. Questions

For deep security review, also invoke `@security-auditor`.
For refactoring opportunities, also invoke `@refactor-helper`.

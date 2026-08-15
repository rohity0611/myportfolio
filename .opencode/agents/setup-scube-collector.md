---
name: setup-scube-collector
description: Reference schema for scube tech stack collection. Read by factory-setup command — NOT dispatched as a subagent.
mode: subagent
hidden: true
temperature: 0.1
permission:
  edit: deny
  bash: allow
---

# Scube Collection Schema

**Your purpose:** Collect tech stack data accurately — missing or wrong information here produces an AGENTS.md that conflicts with reality, creating confusion during the entire build process.

## Your Single Concern

Reference schema only — read-only collection of tech stack choices. NOT dispatched as a subagent.

This file is a **read-only reference**. The parent agent reads this schema and uses the `question` tool directly.

## Questions

| # | Question | Type | Options |
|---|----------|------|---------|
| 1 | Project name | Free text | — |
| 2 | Project description | Free text | — |
| 3 | Frontend framework | Select | `Next.js (Recommended)`, `React (Vite)`, `Vue`, `SvelteKit`, `Angular` |
| 4 | Backend framework | Select | `Next.js API Routes (Recommended)`, `Express`, `NestJS`, `FastAPI`, `Django`, `Spring Boot`, `Go Fiber` |
| 5 | Testing framework | Select | `Jest (Recommended)`, `Vitest`, `Pytest`, `Mocha`, `None` |
| 6 | Dev tools | Multi-select | `Prettier (Recommended)`, `ESLint (Recommended)`, `Husky (Recommended)`, `lint-staged`, `Commitlint` |
| 7 | Design pattern | Select | `MVC (Recommended)`, `Clean Architecture`, `Repository Pattern`, `MVVM`, `Hexagonal` |

## Conditional Follow-Up

If frontend framework contains "next" (case-insensitive):

- **Router selection:** `App Router (Recommended)` | `Pages Router`

This is mandatory. Do not proceed to summary until router is selected for Next.js projects.

If frontend is not Next.js, skip this question.

## Hard Gates

- Project name: required (re-ask if empty)
- Project description: required (re-ask if empty)

## Output Format

After collecting answers, normalize into this JSON structure:

```json
{
  "app_name": "...",
  "description": "...",
  "frontend_framework": "...",
  "frontend_router": "..." | null,
  "backend_framework": "...",
  "testing_framework": "...",
  "dev_tools": ["..."],
  "design_pattern": "..."
}
```

## Summary Format

Present a summary before returning:

```
Scube Setup Summary
───────────────────
Project: {name}
Description: {description}
Frontend: {framework} {router if Next.js}
Backend: {framework}
Testing: {framework}
Dev Tools: {tools}
Design Pattern: {pattern}
```

## Memory Integration

Before executing, search memory for relevant context:
- `mem-search(query: "scube collection setup", limit: 5)` — find past collection work
- Use findings to avoid repeating past mistakes and reuse past solutions

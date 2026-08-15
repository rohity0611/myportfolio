---
description: "Discovery Phase 1 — Orientation. Map codebase structure, tech stack, dependencies, and scale."
---

# Phase 1: Orientation

Before analysing, understand what you're looking at.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before decisions

## Instructions

1. **Repository structure:** Map directory tree (3 levels). Identify repo structure (monorepo/workspace). Count packages.

2. **Tech stack:** Read config files: package.json, requirements.txt, Dockerfile, CI/CD configs, infrastructure configs, .env.example.

3. **Scale metrics:** Lines of code by language, file count by type, directory depth, total dependencies.

4. **Entry points:** API routes, page routes, CLI commands, cron jobs, queue consumers, webhook endpoints.

5. **External integrations:** From configs and imports, list external services (databases, APIs, SaaS, payments).

6. **Existing documentation:** Read README, ARCHITECTURE.md, docs/, ADRs.

## Output

Write Codebase Profile to `.discovery/phase1-codebase-profile.md`:
- Repository Overview
- Tech Stack Summary
- Scale Metrics
- Entry Point Inventory
- External Integration Map
- Documentation Summary
- Initial Observations

## Next

Proceed to Phase 2 (Parallel Analysis Swarm) — no human gate needed.

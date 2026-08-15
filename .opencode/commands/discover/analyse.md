---
description: "Discovery Phase 2 — Parallel Analysis Swarm. Dispatch 10 specialist agents to interrogate the codebase."
---

# Phase 2: Parallel Analysis Swarm

Dispatch 10 parallel `task` tool calls — one per specialist. Each works independently.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before decisions

## Prerequisites

Phase 1 codebase profile must exist at `.discovery/phase1-codebase-profile.md`

## Instructions

Read Phase 1 profile from `.discovery/phase1-codebase-profile.md`. Then dispatch all 10 agents in a single message using `task` tool so they run in parallel:

```
1. task(subagent_type: "general", description: "Analyse architecture and layering", prompt: "Architecture Analyst — Analyze dependency graph, coupling, layering violations, architecture-vs-reality gaps, module boundary health. Codebase profile: [paste profile]. Output to .discovery/phase2-architecture.md")
2. task(subagent_type: "general", description: "Audit security and secrets", prompt: "Security Auditor — Scan for secrets, dependency CVEs, OWASP patterns, auth quality, data exposure, input validation gaps. Codebase profile: [paste profile]. Output to .discovery/phase2-security.md")
3. task(subagent_type: "general", description: "Assess code quality", prompt: "Code Quality Analyst — Assess complexity, duplication, dead code, test coverage, linting, naming, pattern consistency. Codebase profile: [paste profile]. Output to .discovery/phase2-code-quality.md")
4. task(subagent_type: "general", description: "Review dependencies and CVEs", prompt: "Dependency Analyst — Review outdated packages, abandoned libs, CVE scan, licence audit, pinning strategy, lock file health. Codebase profile: [paste profile]. Output to .discovery/phase2-dependencies.md")
5. task(subagent_type: "general", description: "Evaluate infrastructure and CI/CD", prompt: "Infrastructure Analyst — Evaluate CI/CD pipeline, deployment strategy, Dockerfiles, monitoring, environments, backups. Codebase profile: [paste profile]. Output to .discovery/phase2-infrastructure.md")
6. task(subagent_type: "general", description: "Analyse data schema and queries", prompt: "Data Analyst — Assess schema quality, migrations, indexes, N+1 queries, data validation, referential integrity, sensitive data storage. Codebase profile: [paste profile]. Output to .discovery/phase2-data.md")
7. task(subagent_type: "general", description: "Audit API endpoints", prompt: "API Analyst — Inventory endpoints, response consistency, error handling, documentation, versioning, rate limiting, integration resilience. Codebase profile: [paste profile]. Output to .discovery/phase2-api.md")
8. task(subagent_type: "general", description: "Review performance and bundles", prompt: "Performance Analyst — Review bundle sizes, caching, query efficiency, memory patterns, code splitting, asset optimisation. Codebase profile: [paste profile]. Output to .discovery/phase2-performance.md")
9. task(subagent_type: "general", description: "Analyse team velocity and bus factor", prompt: "Team Analyst — Analyze git history, contributors, bus factor, velocity trends, hotspots, PR review patterns, commit patterns. Codebase profile: [paste profile]. Output to .discovery/phase2-team.md")
10. task(subagent_type: "general", description: "Map business logic and edge cases", prompt: "Business Logic Analyst — Map domain logic location, test coverage on business rules, hardcoded values, state machines, calculation accuracy. Codebase profile: [paste profile]. Output to .discovery/phase2-business-logic.md")

IMPORTANT: Each finding must include: severity (Critical/High/Medium/Low), location, evidence, impact, recommendation, effort (S/M/L/XL).
```

## Output

Each agent writes to `.discovery/phase2-{agent-name}.md`:
- `.discovery/phase2-architecture.md`
- `.discovery/phase2-security.md`
- `.discovery/phase2-code-quality.md`
- `.discovery/phase2-dependencies.md`
- `.discovery/phase2-infrastructure.md`
- `.discovery/phase2-data.md`
- `.discovery/phase2-api.md`
- `.discovery/phase2-performance.md`
- `.discovery/phase2-team.md`
- `.discovery/phase2-business-logic.md`

## Next

When all agents complete, proceed to Phase 3 (Synthesis).

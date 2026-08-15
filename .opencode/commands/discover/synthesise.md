---
description: "Discovery Phase 3 — Synthesis. Consolidate 10 agent reports into unified assessment with health score."
---

# Phase 3: Synthesis

Consolidate all analysis into a unified assessment.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before decisions

## Prerequisites

All 10 Phase 2 reports must exist in `.discovery/phase2-*.md`

## Instructions

1. **Read all 10 reports** from `.discovery/phase2-*.md`

2. **Deduplicate findings** — merge same CVE flagged by multiple agents

3. **Cross-reference findings** — connect cause and effect:
   - Architecture coupling → test difficulty → low coverage
   - Missing indexes → slow queries → performance problems
   - No CI/CD → manual deployments → high change failure rate

4. **Cluster findings into themes** — group related issues:
   - "Pervasive lack of error handling" not 50 individual missing try/catch
   - "Infrastructure maturity gap" not 15 individual DevOps issues

5. **Calculate Technical Health Score** (0-100):

| Dimension | Weight |
|-----------|--------|
| Architecture | 15% |
| Security | 15% |
| Code Quality | 10% |
| Dependencies | 10% |
| Infrastructure | 10% |
| Data | 10% |
| API Quality | 8% |
| Performance | 7% |
| Team Health | 8% |
| Business Logic | 7% |

Score each dimension 0-100. Multiply by weight. Sum for overall.

6. **Top 5 risks** — greatest threat to business, product, or team

7. **Top 5 quick wins** — high impact, low effort improvements

## Output

Write to `.discovery/phase3-synthesis.md`:
- Technical Health Score (overall + per dimension)
- Finding Summary (counts by severity)
- Themed Finding Clusters (severity, evidence, impact)
- Top 5 Risks
- Top 5 Quick Wins
- Cross-Reference Map

## Gate

Present synthesis for human review. Human calibrates priorities against business context.

## Next

Proceed to Next Phase: `/discover/roadmap`.

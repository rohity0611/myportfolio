---
description: "Discovery Phase 4 — Roadmap. Turn findings into prioritised, actionable work items with Jira-importable CSV."
---

# Phase 4: Roadmap

Turn synthesised findings into actionable work items.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before decisions

## Prerequisites

Phase 3 synthesis must be approved by human at `.discovery/phase3-synthesis.md`

## Instructions

1. **Generate work items** from each finding cluster:
   - Title (clear, actionable)
   - Description (what's wrong, why it matters, what to do)
   - Severity (from synthesis)
   - Effort (S/M/L/XL)
   - Dependencies (what needs to happen first)
   - Acceptance criteria (how you know it's done)
   - Recommended approach (specific technical guidance)

2. **Group into 4 streams:**
   - **Risk Reduction** — critical security, data integrity, operational
   - **Foundation** — CI/CD, testing, monitoring, DX
   - **Modernisation** — refactoring, decoupling, migration
   - **Quality of Life** — documentation, tooling, consistency

3. **Sequence** by severity × impact × dependency order

4. **Produce timeline:**
   - **Week 1** — critical fixes, quick wins, must-do-first items
   - **Month 1** — foundation stream, risk reduction completion
   - **Quarter 1** — architecture work, modernisation starts

5. **Produce Jira-importable CSV:**
   Summary, Description, Issue Type, Priority, Labels, Story Points, Epic Link

## Output

- `.discovery/phase4-roadmap.md` — human-readable roadmap
- `.discovery/phase4-jira-import.csv` — Jira bulk import file

## Gate

Present roadmap for human review. Human adjusts priorities based on business context, budget, team capacity.

## Next

Proceed to Next Phase: `/discover/report`.

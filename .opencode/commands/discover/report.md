---
description: "Discovery Phase 5 — Report. Produce Technical State of Play report, task backlog, and agentic workspace foundation."
---

# Phase 5: Deliverable Generation

Produce final deliverables from discovery.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before decisions

## Prerequisites

Phase 4 roadmap must be approved by human.

## Instructions

### Deliverable 1: Technical State of Play Report

Professional report for leadership/investors. Non-technical language.

**Structure:**
1. **Executive Summary** (1 page)
   - Health score and what it means
   - Top 3 risks in business language
   - Top 3 recommendations with expected impact
   - Confidence level in the platform

2. **Technical Health Dashboard**
   - Overall score with RAG indicator
   - Radar chart data (10 dimensions)
   - Industry benchmarks where possible

3. **Architecture Assessment**
   - Documented vs found
   - Architecture diagram (from code)
   - Key structural risks

4. **Risk Register**
   - Prioritised by business impact
   - Each: description, likelihood, impact, mitigation, effort
   - Written for non-technical stakeholders

5. **Team & Capability Assessment**
   - Contributor analysis (bus factor, velocity, coverage)
   - Capability gaps
   - Hiring recommendations

6. **Recommendations**
   - 4 streams with effort/impact positioning
   - Timeline: immediate, short-term, medium-term
   - Investment estimate (effort-days by stream)

7. **Appendix**
   - Detailed findings by category
   - Methodology
   - Glossary

**Output:** `.discovery/deliverables/technical-state-of-play.md`

---

### Deliverable 2: Prioritised Task Backlog

Copy from Phase 4 roadmap, formatted for engineering.

**Output:** `.discovery/deliverables/task-backlog.md` + `.discovery/phase4-jira-import.csv`

---

### Deliverable 3: Agentic Workspace Foundation

Create AGENTS.md and supporting files for Build Factory.

**Contents:**
- `AGENTS.md` — populated with:
  - Architecture overview (Phase 1 + Architecture Analyst)
  - Tech stack and conventions (Phase 1 + Code Quality Analyst)
  - Standing constraints (discovered patterns)
  - Known issues (Phase 2 findings)
  - Critical flows (entry points, happy paths, error paths)
  - Pattern guide ("in this codebase, we do X this way")
- `docs/architecture.md` — architecture as it actually is
- `docs/known-issues.md` — prioritised issues with context
- `docs/critical-flows.md` — paths that matter most

**Output:** `.discovery/deliverables/agentic-workspace/`

> **BRIDGE TO BUILD FACTORY:** Use this as input to `/factory-setup discovery`.
> Derive `AGENTS.md` from standing constraints and `.opencode/rules/*` from architecture/code-quality findings.

## Completion

Write discovery metrics to `.discovery/metrics/discovery-complete.json`:

## Next

Discovery complete. Proceed to: `/factory-setup discovery` to generate AGENTS.md and factory files.
```json
{
  "event": "discovery_complete",
  "timestamp": "ISO-8601",
  "codebase": "repo-name",
  "health_score": 0,
  "dimension_scores": {},
  "finding_counts": { "critical": 0, "high": 0, "medium": 0, "low": 0 },
  "agents_completed": 10,
  "work_items_generated": 0,
  "streams": { "risk_reduction": 0, "foundation": 0, "modernisation": 0, "quality_of_life": 0 }
}
```

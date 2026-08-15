---
description: "Phase 3 + 4 — Slice Planning. In Plan Mode. Produce task groups, execution notes, and the confidence gate needed for build."
---

# Phase 3 + 4: Slice Planning

You are entering Phase 3 of the factory chain. Stay in Plan Mode.

## Restore Context

Before planning a slice, resolve `{jira-key}` and target slice from `$ARGUMENTS`, then read `.opencode/metrics/phase-state-{jira-key}.json`.

- Read `approved_artifacts`, especially Phase 2 slice strategy
- Confirm `next_required_action` allows planning this slice
- If cursor missing, reconstruct from `.opencode/plans/` and `.opencode/metrics/`
- If slice conflicts with `current_slice`, stop and report

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{jira-key}.json`
2. **D2 slice plan exists:** `.opencode/plans/{jira-key}-phase2-slice-recommendation.md`
3. **Standing constraints:** `AGENTS.md` tables
4. **Design handoff (if exists):** `.opencode/metrics/design-handoff-{jira-key}.json` — read it if present to reference design tokens, component paths, and verification scores in the execution plan

If any check fails, STOP and report what's missing.

## Research Phase

Before planning task groups, explore implementation details.

### Assess Complexity

From slice scope, estimate concerns:
- **Simple (< 3 concerns):** 1 explore agent
- **Complex (> 3 concerns):** 2-3 explore agents in parallel

Use `dispatching-parallel-agents` skill for coordination pattern.

### Dispatch Explore Agents

**Single agent (simple):**
```
task(subagent_type: "explore", description: "Find similar implementations", prompt: "Find similar implementations for {slice scope}, identify patterns, map file structure, check reusable components")
```

**Multiple agents (complex):**
```
task(subagent_type: "explore", description: "Find patterns for slice scope", prompt: "Find similar implementations and patterns for {slice scope}")
task(subagent_type: "explore", description: "Map file structure and deps", prompt: "Map file structure, dependencies, and integration points")
task(subagent_type: "explore", description: "Check reusable components", prompt: "Check reusable components, services, and test patterns")
```

### Source Priority

Each explore agent checks sources in order:
1. graphify/codegraph for implementation patterns
2. claude-mem for proven approaches
3. Context7 for library-specific documentation
4. Existing tests for verification patterns

### Dispatch Deep Dive Agents (Complex Slices)

For slices with high complexity, security risk, or ambiguity, dispatch additional analysis agents:

```
task(subagent_type: "deep-thinker", description: "Analyze slice complexity", prompt: "Analyze {slice scope} for hidden complexity, edge cases, and failure modes. Produce a risk analysis.")
task(subagent_type: "security-auditor", description: "Audit slice for security risk", prompt: "Audit {slice scope} for security implications, data sensitivity, and auth requirements.")
```

### Merge Findings

Collect all agent outputs. Use unified context to:
- Plan with informed approach
- Reuse existing patterns
- Define accurate acceptance criteria

## Instructions

### 1. Data Touchpoint Map (MANDATORY)

Scan slice requirements for external data dependencies (APIs, databases, file systems, credentials, data feeds). For each, produce:

| Data Source | Build Mode | Synthetic Approach | Real Integration (Phase 6) | Fallback |
|-------------|------------|--------------------|-----------------------------|----------|
| {source} | synthetic | {approach} | {real path} | {fallback} |

**Build mode is ALWAYS `synthetic` for new features.** Exception: existing real integrations must be flagged with `real (existing)` and human must confirm approach.

### 2. Task Groups

For each task group:
- **Tasks:** Specific work items
- **Acceptance Criteria:** How we know done
- **Files:** Exact files to create/modify
- **Integration Points:** Connection to existing code
- **Data Touchpoints:** Which data sources used

### 3. Data Reality Requirements

For every data touchpoint:
- Implement DataReality contract with `configuredMode: "synthetic"`
- Build synthetic implementation (stub, fixture, generator)
- Document real integration path in contract metadata

### 4. Execution Notes + Confidence Gate

For each task group, add execution notes: files, implementation order, verification steps, stop conditions.

Self-assess confidence (5 dimensions): clarity, precedent, complexity, risk, dependency. If any RED, stop and surface blocker.

Write confidence metric with this JSON structure:
```json
{
  "jira_key": "{jira-key}",
  "task_group": "{task-group-description}",
  "timestamp": "<ISO-8601>",
  "dimensions": {
    "clarity": "green|amber|red",
    "precedent": "green|amber|red",
    "complexity": "green|amber|red",
    "risk": "green|amber|red",
    "dependency": "green|amber|red"
  },
  "overall": "green|amber|red",
  "rationale": "Brief explanation of confidence assessment",
  "discovery_health_score": null
}
```

## Output

Write slice plan to `.opencode/plans/{jira-key}-phase3-{slice-name}.md`

Write the confidence metric to:
- `.opencode/metrics/confidence-{jira-key}.json` for single-slice work
- `.opencode/metrics/confidence-{jira-key}-{slice}.json` for multiple tracked slices

Update phase-state to Phase 4 with JSON: `{"jira_key": "{jira-key}", "current_phase": "4", "phase_history": [{"phase": "4", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Gate

Present for approval:
1. Data Touchpoint Map — synthetic approach correct?
2. Task groups — work correctly decomposed?
3. Confidence result — ready to build?
4. Prerequisites — anything human needs to provision?

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before planning
- `skill({name: "writing-plans"})` — structure plan output
- `skill({name: "handoff-contracts"})` — structured handoff between phases
- `skill({name: "context-budget"})` — context window management
- `skill({name: "trace-capture"})` — observability tracing
- `skill({name: "task-decomposition"})` — break complex tasks into subtasks

## Completion Response (MANDATORY)

End with:
- Current phase status
- Files written (slice plan + confidence + phase state)
- Next command: `/build {jira-key} {slice-name}` after approval

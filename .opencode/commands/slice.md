---
description: "Phase 2 — Slice Recommendation. In Plan Mode. Recommend how to slice the brief for delivery. Map dependencies. Recommend sequence."
---

# Phase 2: Slice Recommendation

You are entering Phase 2 of the factory chain. Stay in Plan Mode.

## Restore Context

Before slicing, resolve `{jira-key}` from `$ARGUMENTS` and read `.opencode/metrics/phase-state-{jira-key}.json`.

- Read all `approved_artifacts`, especially Phase 1 brief understanding
- Confirm `next_required_action` allows Phase 2 slicing
- If cursor missing, reconstruct from `.opencode/plans/{jira-key}-phase1-brief-understanding.md`
- If cursor points to another action, stop and report it

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{jira-key}.json`
2. **D1 brief exists:** `.opencode/plans/{jira-key}-phase1-brief-understanding.md`
3. **Standing constraints:** `AGENTS.md` tables
4. **Design handoff (if exists):** `.opencode/metrics/design-handoff-{jira-key}.json` — read it if present to incorporate design tokens, verified components, and Figma references into slice recommendations

If any check fails, STOP and report what's missing.

## Research Phase

Before recommending slices, gather context.

### Assess Complexity

From brief summary, estimate concerns:
- **Simple (< 3 concerns):** 1 explore agent
- **Complex (> 3 concerns):** 2-3 explore agents in parallel

Use `dispatching-parallel-agents` skill for coordination pattern.

### Dispatch Explore Agents

**Single agent (simple):**
```
task(subagent_type: "explore", description: "Analyse codebase for slice boundaries", prompt: "Analyse codebase structure for {brief summary}, find patterns, map dependencies, check similar features")
```

**Multiple agents (complex):**
```
task(subagent_type: "explore", description: "Identify slice boundaries", prompt: "Analyse codebase structure and identify natural slice boundaries")
task(subagent_type: "explore", description: "Find existing implementation patterns", prompt: "Find existing patterns and similar features already implemented")
task(subagent_type: "explore", description: "Map dependencies and integrations", prompt: "Map dependencies and external integration points")
```

### Source Priority

Each explore agent checks sources in order:
1. graphify/codegraph for code structure
2. claude-mem for similar patterns
3. MCPs for external dependencies
4. websearch for library-specific docs

### Merge Findings

Collect all agent outputs. Use unified context to:
- Identify natural slice boundaries
- Avoid duplicating existing patterns
- Flag external dependencies early
- Recommend informed delivery sequence

## Instructions

1. Based on approved brief understanding, recommend vertical delivery slices
2. Each slice should:
   - Deliver user-visible value independently
   - Be deployable on its own
   - Have clear boundaries (files, components, APIs)
3. For each slice, provide:
   - **Name:** Brief descriptive name
   - **Objective:** What this slice delivers
   - **Scope:** Files/components/APIs involved
   - **Complexity:** S / M / L
   - **Dependencies:** What must be done before this slice
4. Map dependency graph between slices
5. Recommend delivery sequence (which first, which can parallelise)
6. Identify which slices could be built in parallel using `task` tool

## Jira

Create one sub-task per slice: `{PROJ-KEY}: Slice N — {slice name}`

## Output

Write to `.opencode/plans/{jira-key}-phase2-slice-strategy.md`. Update phase-state to Phase 2 with JSON: `{"jira_key": "{jira-key}", "current_phase": "2", "phase_history": [{"phase": "2", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Gate

Present slicing strategy for human approval before proceeding.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before slicing
- `skill({name: "brainstorming"})` — validate slice approach
- `skill({name: "handoff-contracts"})` — structured handoff between phases
- `skill({name: "context-budget"})` — context window management
- `skill({name: "trace-capture"})` — observability tracing

## Completion Response (MANDATORY)

End with:
- Current phase status
- Files written (plan + metric)
- Next command: `/plan-slice {jira-key} {slice-name}` after approval

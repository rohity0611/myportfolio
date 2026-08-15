---
description: "Phase D2 — Design Slice. Break design into per-component delivery slices."
---

# Phase D2: Design Slice

You are entering Phase D2 of the design workflow. Break the design into manageable component slices.

## Restore Context

Before slicing, resolve `{ticket-id}` from `$ARGUMENTS` and read `.opencode/metrics/phase-state-{ticket-id}.json`.

- Read `approved_artifacts`, especially Phase D1 brief
- Confirm `next_required_action` allows Phase D2 slicing
- If cursor missing, reconstruct from `.opencode/plans/{ticket-id}-design-brief.md` and `design/{ticket-id}/`
- If cursor points to another action, stop and report it

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{ticket-id}.json`
2. **D1 brief exists:** `.opencode/plans/{ticket-id}-design-brief.md`
3. **Design data exists:** `design/{ticket-id}/figma-meta.json` and `design/{ticket-id}/tokens.json`
4. **Design images exist:** `design/{ticket-id}/images/` directory has files

If any check fails, STOP and report what's missing.

## Research Phase

Before recommending slices, gather context.

### Assess Complexity

From design structure, estimate concerns:
- **Simple (< 5 components):** 1 explore agent
- **Complex (> 5 components, design system):** 2-3 explore agents in parallel

Use `dispatching-parallel-agents` skill for coordination pattern.

### Dispatch Explore Agents

**Single agent (simple):**
```
task(subagent_type: "explore", description: "Find slice patterns from context", prompt: "Check claude-mem for similar component slicing patterns. Check graphify/codegraph for existing component structure. Read design/{ticket-id}/figma-meta.json and recommend vertical slices.")
```

**Multiple agents (complex):**
```
task(subagent_type: "explore", description: "Check previous slice patterns", prompt: "Check claude-mem for previous design slice patterns. Read figma-meta.json and identify natural component boundaries.")
task(subagent_type: "explore", description: "Map component dependencies", prompt: "Check graphify/codegraph for existing components that overlap with Figma design. Map dependencies between slices.")
```

### Source Priority

Each explore agent checks sources in order:
1. graphify/codegraph for existing components, reusable patterns
2. claude-mem for similar slicing approaches
3. Figma MCP for design structure (figma-meta.json)
4. websearch for component architecture patterns

### Merge Findings

Collect all agent outputs. Use unified context to:
- Identify natural slice boundaries
- Avoid duplicating existing components
- Flag shared tokens between slices

## Instructions

1. Read `design/{ticket-id}/figma-meta.json` for design structure
2. Read `design/{ticket-id}/tokens.json` for design system
3. Based on Figma frame hierarchy, recommend vertical delivery slices
4. Each slice should:
   - Deliver one UI component independently
   - Be testable on its own
   - Have clear boundaries (files, styles, tokens)
5. For each slice, provide:
   - **Name:** Brief descriptive name (e.g., "header", "hero", "features-grid")
   - **Objective:** What this component delivers
   - **Scope:** Files/components involved
   - **Complexity:** S / M / L
   - **Dependencies:** What must be done before this slice
   - **Figma node ID:** Reference to the Figma frame
6. Map dependency graph between slices
7. Recommend delivery sequence (which first, which can parallelise)

## Output

Write to `.opencode/plans/{ticket-id}-design-slice.md`. Update phase-state to Phase D2 with JSON: `{"jira_key": "{ticket-id}", "current_phase": "D2", "phase_history": [{"phase": "D2", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Gate

Present slicing strategy for human approval before proceeding.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before slicing
- `skill({name: "brainstorming"})` — validate slice approach
- `skill({name: "improve-codebase-architecture"})` — analyze architecture for slice boundaries
- `skill({name: "grill-me"})` — pressure-test slice recommendations

## Completion Response (MANDATORY)

End with:
- Current phase status
- Files written (slice plan + phase state)
- Next command: `/design-plan-slice {ticket-id} {slice-name}` after approval

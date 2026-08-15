---
description: "Phase D3 — Design Plan Slice. Create detailed execution plan for one component with design metadata references."
---

# Phase D3: Design Plan Slice

You are entering Phase D3 of the design workflow. Plan one component's execution with full design context.

## Restore Context

Before planning a slice, resolve `{ticket-id}` and target slice from `$ARGUMENTS`, then read `.opencode/metrics/phase-state-{ticket-id}.json`.

- Read `approved_artifacts`, especially Phase D2 slice strategy
- Confirm `next_required_action` allows planning this slice
- If cursor missing, reconstruct from `.opencode/plans/{ticket-id}-design-slice.md` and `design/{ticket-id}/`
- If slice conflicts with `current_slice`, stop and report

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{ticket-id}.json`
2. **D2 slice plan exists:** `.opencode/plans/{ticket-id}-design-slice.md`
3. **Target slice is valid:** `{slice-name}` appears in the D2 slice plan
4. **Design data exists:** `design/{ticket-id}/tokens.json` and `design/{ticket-id}/figma-meta.json`

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
task(subagent_type: "explore", description: "Find component implementation patterns", prompt: "Check claude-mem for similar component implementations. Check graphify/codegraph for reusable patterns. Read design/{ticket-id}/ context for slice '{slice-name}'.")
```

**Multiple agents (complex):**
```
task(subagent_type: "explore", description: "Review proven component approaches", prompt: "Check claude-mem for proven component approaches. Read figma-meta.json and tokens.json for this slice's design context.")
task(subagent_type: "explore", description: "Find reusable components and patterns", prompt: "Check graphify/codegraph for existing components to reuse. Check websearch for React+Tailwind patterns for this component type.")
```

### Source Priority

Each explore agent checks sources in order:
1. graphify/codegraph for existing components, patterns to reuse
2. claude-mem for proven approaches, similar components built before
3. Figma MCP for design context (get_design_context for reference code)
4. websearch for component-specific documentation

### Merge Findings

Collect all agent outputs. Use unified context to:
- Plan with informed approach
- Reuse existing patterns
- Define accurate acceptance criteria

## Phase Work

1. Read the approved slice definition from `.opencode/plans/{ticket-id}-design-slice.md`
2. Read `design/{ticket-id}/figma-meta.json` for this component's node ID
3. Load `figma-design-to-code` skill (MANDATORY before `get_design_context`)
4. `figma_get_design_context` → get reference React+Tailwind code for this frame
5. Read `design/{ticket-id}/tokens.json` for component-specific tokens
6. Create execution plan with:
   - **Component structure:** What to generate (props, styles, children)
   - **Token mappings:** Which tokens to apply (color/primary → var(--color-primary))
   - **Existing components:** What to reuse from codebase
   - **Design metadata reference:**
     * Figma node ID: {node-id}
     * Screenshot path: design/{ticket-id}/images/{slice-name}.png
     * Token mappings: {list of token → CSS variable mappings}
     * Reference code: from figma_get_design_context output

## Output

Write slice plan to `.opencode/plans/{ticket-id}-design-plan-{slice-name}.md`. Update phase-state to Phase D3 with JSON: `{"jira_key": "{ticket-id}", "current_phase": "D3", "phase_history": [{"phase": "D3", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Gate

Present for approval:
1. Component structure — correct decomposition?
2. Token mappings — design system applied correctly?
3. Design metadata reference — Figma context included?
4. Prerequisites — anything human needs to provision?

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before planning
- `skill({name: "writing-plans"})` — structure plan output
- `skill({name: "prototype"})` — rapid prototyping patterns
- `skill({name: "grill-me"})` — pressure-test execution plan

## Completion Response (MANDATORY)

End with:
- Current phase status
- Files written (slice plan + phase state)
- Next command: `/design-build {ticket-id} {slice-name}` after approval

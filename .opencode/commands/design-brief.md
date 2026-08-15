---
description: "Phase D1 — Design Brief. Analyze Figma design, extract tokens, download images, store locally."
---

# Phase D1: Design Brief

You are entering Phase D1 of the design workflow. Analyze a Figma design and extract all data locally.

## Restore Context

Before analyzing, resolve `{ticket-id}` and `{figma-url}` from `$ARGUMENTS` (or ask if unknown).

Check `.opencode/metrics/phase-state-{ticket-id}.json`:
- If exists, read it and `approved_artifacts` before using chat history
- If shows unfinished required action, report it before restarting
- If not exists, create after brief approval

Record `jira_key`, `current_phase`, `start_position`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{ticket-id}.json`
2. **Figma URL accessible:** `{figma-url}` provided and reachable
3. **Design directory:** `design/{ticket-id}/` exists or can be created
4. **No stale data:** `design/{ticket-id}/figma-meta.json` does not already exist (or confirm overwrite)

If any check fails, STOP and report what's missing.

## Research Phase

Before analyzing the Figma URL, gather context.

### Assess Complexity

From Figma URL structure, estimate concerns:
- **Simple (single page):** 1 explore agent
- **Complex (multi-page, design system):** 2-3 explore agents in parallel

Use `dispatching-parallel-agents` skill for coordination pattern.

### Dispatch Explore Agents

**Single agent (simple):**
```
task(subagent_type: "explore", description: "Analyse Figma design and patterns", prompt: "Check claude-mem for previous Figma designs and similar components. Check graphify/codegraph for existing patterns. Then analyze Figma design at {figma-url} using Figma MCP tools: figma_get_metadata, figma_get_variable_defs, figma_get_screenshot.")
```

**Multiple agents (complex):**
```
task(subagent_type: "explore", description: "Check previous Figma designs", prompt: "Check claude-mem for similar Figma designs solved before. Analyze Figma structure: figma_get_metadata for page hierarchy, figma_get_variable_defs for design tokens.")
task(subagent_type: "explore", description: "Check existing component patterns", prompt: "Check graphify/codegraph for existing component patterns. Download screenshots: figma_get_screenshot for each major frame.")
task(subagent_type: "explore", description: "Search Figma API and download assets", prompt: "Check websearch for Figma API patterns. Download raw assets: figma_download_assets for images/icons.")
```

### Source Priority

Each explore agent checks sources in order:
1. graphify/codegraph for existing components, design patterns, architecture
2. claude-mem for similar Figma designs, proven component approaches
3. Figma MCP for design data (get_variable_defs, get_screenshot, get_metadata)
4. websearch for Figma API documentation, React+Tailwind patterns

### Merge Findings

Collect all agent outputs. Use unified context to:
- Pre-populate design risks
- Identify reusable components before extraction
- Suggest clarifying questions

## Phase Work

1. Create `design/{ticket-id}/` directory
2. `figma_get_metadata` → extract file key, node IDs, page structure, all frames/components
3. `figma_get_variable_defs` → extract ALL design tokens (colors, fonts, spacing, shadows, border-radius)
4. `figma_get_screenshot` → download screenshot for each major frame/component
5. `figma_download_assets` → download any images/icons used in the design
6. Save `figma-meta.json` with structure, URLs, and component hierarchy
7. Save `tokens.json` with extracted design tokens
8. Save screenshots to `design/{ticket-id}/images/`
9. Update phase-state to Phase D1: `{"jira_key": "{ticket-id}", "current_phase": "D1", "phase_history": [{"phase": "D1", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`

## Output

Write to `.opencode/plans/{ticket-id}-design-brief.md`. Update phase-state to Phase D1 with JSON: `{"jira_key": "{ticket-id}", "current_phase": "D1", "phase_history": [{"phase": "D1", "status": "complete", "timestamp": "<ISO-8601>"}]}`.

## Gate

Present structure, tokens, and screenshots for human approval before proceeding.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before analyzing
- `skill({name: "brainstorming"})` — validate approach during brief understanding
- `skill({name: "extract-design-system"})` — extract design primitives from existing codebase
- `skill({name: "grill-me"})` — pressure-test brief understanding before proceeding

## Completion Response (MANDATORY)

End with:
- Current phase status
- Files written (figma-meta.json, tokens.json, images)
- Next command: `/design-slice {ticket-id}` after approval

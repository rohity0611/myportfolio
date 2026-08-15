---
description: "Phase D4 — Design Build. Generate React+Tailwind component code from Figma design."
---

# Phase D4: Design Build

You are entering Phase D4 of the design workflow. Generate code from the approved plan.

## Restore Context

Before building, resolve `{ticket-id}` and slice from `$ARGUMENTS`, then read `.opencode/metrics/phase-state-{ticket-id}.json`.

- Read `approved_artifacts`, especially Phase D3 slice plan
- Confirm `next_required_action` allows Phase D4 build for this slice
- If cursor missing, reconstruct from `.opencode/plans/{ticket-id}-design-plan-{slice-name}.md` and `design/{ticket-id}/`
- If cursor points to another gate, run or report that action first

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{ticket-id}.json`
2. **Slice plan exists:** `.opencode/plans/{ticket-id}-design-plan-{slice-name}.md`
3. **Design data exists:** `design/{ticket-id}/tokens.json` and `design/{ticket-id}/images/`
4. **Standing constraints:** `AGENTS.md` tables
5. **Architecture standards:** `.opencode/rules/architecture-standards.md`

If any check fails, STOP and report what's missing.

## Research Phase (Conditional)

Research required if ANY true:
- Component creates new files
- Component uses unfamiliar library
- Component needs responsive breakpoints not in design

**Skip if:** Pattern exists in codebase, tokens already mapped

**Execute if required:**
```
task(subagent_type: "explore", description: "Find component pattern and docs", prompt: "Find existing pattern for {component type}, check Context7 docs for library usage, verify responsive approach")
```

## Build Rules

1. **Functional correctness ONLY** — make it match the design, nothing more
2. Do NOT add: error handling, logging, tests, security, documentation (Phase 6)
3. Follow `.opencode/rules/design-patterns.md`
4. Follow `.opencode/rules/architecture-standards.md`
5. Apply design tokens from `tokens.json` as CSS custom properties
6. **Token→CSS step:** Use `figma_get_variable_defs` to extract design tokens (colors, spacing, typography) from Figma. Map them to MUI theme tokens or CSS custom properties. Never hardcode hex values.

## Output Location

Save generated components to `design/{ticket-id}/components/{SliceName}/index.tsx`.

This directory is referenced by Phase D5 verification checks.

## Gate

Approval required before each task group:

- New file creation → MUST ask human before first edit
- Substantial multi-file edit → ask once before first write
- Tiny single-file adjustment → may proceed without asking

Use `question` tool with options: `Approve`, `Deny`, or custom feedback.
If denied → STOP, report not applied.
If feedback → revise summary, re-run gate.

## Execution

For each task group in the plan:

1. **Prepare Planned Change Summary** — files to create/modify, brief reason
2. **Run approval gate** (see Gate section above)
3. If approved → implement the task group
4. **Verify:** code compiles, component renders, tokens applied correctly
5. **Commit:** `{TICKET-ID}: design — {slice-name} component`

**Collaboration:** Ask once per task group, not per file. After approval, finish without re-asking unless scope changes materially.

## Post-Build: Record Outcome

Write to `.opencode/metrics/design-execution-{ticket-id}-{slice-name}.json`:

```json
{
  "event": "design_execution_outcome",
  "ticket_id": "TICKET-123",
  "slice": "slice-name",
  "outcome": "success|partial|failure",
  "files_created": ["components/Header/index.tsx"],
  "tokens_applied": ["color-primary", "font-heading", "spacing-lg"],
  "figma_node_id": "1:2",
  "timestamp": "ISO-8601"
}
```

Update phase-state to Phase D4 with JSON: `{"jira_key": "{ticket-id}", "current_phase": "D4", "phase_history": [{"phase": "D4", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Post-Build: Refresh Context

Design code changes make indexes stale.

After metrics, dispatch a subagent to refresh context:
```
task(subagent_type: "executor", description: "Refresh indexes after design build", prompt: "Run /context-refresh to update CodeGraph and Graphify indexes after this design build. Report if any warnings.")
```

Runs in background — doesn't block the build pipeline.

## Next Steps

- More slices remain → `/design-plan-slice {ticket-id} {next-slice}`
- ALL slices built → `/design-verify {ticket-id} {slice-name}` for each slice

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before building
- `skill({name: "clean-code"})` — maintain code quality during implementation
- `skill({name: "figma-design-to-code"})` — MANDATORY for Figma code generation
- `skill({name: "design-taste-frontend"})` — ensure design quality
- `skill({name: "image-to-code"})` — convert design images to code patterns
- `skill({name: "verification-before-completion"})` — verify before claiming done

## Completion Response (MANDATORY)

End with:
- Build outcome for this slice
- Files created/modified
- Next command: `/design-plan-slice {ticket-id} {next-slice}` or `/design-verify {ticket-id} {slice-name}`

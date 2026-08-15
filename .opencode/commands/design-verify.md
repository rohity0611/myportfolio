---
description: "Phase D5 — Design Verify. Automated visual verification using Imugi + Playwright."
---

# Phase D5: Design Verify

You are entering Phase D5 of the design workflow. Verify the built component matches the Figma design.

## Restore Context

Before verifying, resolve `{ticket-id}` and slice from `$ARGUMENTS`, then read `.opencode/metrics/phase-state-{ticket-id}.json`.

- Read `approved_artifacts`, especially Phase D4 execution outcome
- Confirm `next_required_action` allows Phase D5 verification
- If cursor missing, reconstruct from `.opencode/plans/{ticket-id}-design-plan-{slice-name}.md` and `design/{ticket-id}/`
- If cursor points to another gate, run or report that action first

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{ticket-id}.json`
2. **Component built:** `design/{ticket-id}/components/{SliceName}/index.tsx` exists
3. **Build metric exists:** `.opencode/metrics/design-execution-{ticket-id}-{slice-name}.json` exists
4. **Design reference exists:** `design/{ticket-id}/images/{slice-name}.png` exists
5. **Dev server accessible:** localhost URL or configurable

If any check fails, STOP and report what's missing.

## Gate

| Metric | Threshold | Pass | Fail |
|--------|-----------|------|------|
| `composite_score` | >= 95% | Return score | Iterate |
| Iterations | <= 5 | Return score | Return final score with warning |

On first pass → record verification outcome and proceed.
On fail after 5 iterations → record outcome as `fail`, report specific CSS diffs, then:

   a. Generate a fix plan: `.opencode/plans/{ticket-id}-design-fix-plan.md` with specific CSS fixes needed
   b. Dispatch an executor agent to apply the fixes
   c. Write `.opencode/plans/{ticket-id}-design-fix-execution.md` recording what was fixed
   d. Surface to human: "Design verification failed after 5 iterations. Fix plan written. Review and re-run /design-verify {ticket-id} {slice-name}."
   e. Do NOT write handoff for this slice — failed slices block full handoff

## Verification Loop (Imugi — Primary)

Use Imugi MCP for automated visual verification:

```
1. imugi_capture → screenshot the running component at localhost
2. imugi_compare → compare design/{ticket-id}/images/{slice-name}.png vs captured screenshot
3. Read result:
   - composite_score (SSIM + pixelmatch + Claude Vision)
   - heatmaps (red overlay showing diff locations)
   - dom_computed_styles (actual CSS values in diff regions)
   - figma_spec_diff (design vs code CSS comparison)
4. If score >= 95%: DONE → return score
5. If score < 95%:
   - Read heatmaps + DOM styles to identify specific CSS fixes
   - Edit component code
   - Re-capture → re-compare
   - Loop (max 5 iterations)
6. Return final score and iteration count
```

## Fallback (Playwright — If Imugi Unavailable)

If Imugi MCP is not responding, use Playwright for capture + agent-driven visual comparison:

```
1. playwright_browser_navigate → dev server URL
2. playwright_browser_take_screenshot → save to design/{ticket-id}/verification/code/{slice-name}.png
3. figma_get_screenshot → download Figma design reference for this slice
4. Agent visually compares the two screenshots (Claude Vision)
5. If differences found:
   - Identify specific CSS fixes needed
   - Edit component code
   - Re-capture → re-compare
   - Loop (max 5 iterations)
6. Return final pass/fail and iteration count
```

## Post-Verification: Refresh Context

If code was modified during the verification loop (any iteration edited CSS/TSX), indexes are stale.

Dispatch a subagent to refresh context:
```
task(subagent_type: "executor", description: "Refresh indexes after verification", prompt: "Run /context-refresh to update CodeGraph and Graphify indexes after verification code changes. Report if any warnings.")
```

Runs in background — doesn't block verification.

## Post-Verification: Record Outcome

Write to `.opencode/metrics/design-verification-{ticket-id}-{slice-name}.json`:

```json
{
  "event": "design_verification_outcome",
  "ticket_id": "TICKET-123",
  "slice": "slice-name",
  "method": "imugi|playwright",
  "final_score": 97,
  "iterations": 2,
  "outcome": "pass|fail",
  "threshold": 95,
  "figma_node_id": "1:2",
  "timestamp": "ISO-8601"
}
```

Update phase-state to Phase D5 with JSON: `{"jira_key": "{ticket-id}", "current_phase": "D5", "phase_history": [{"phase": "D5", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Interactive Component Testing

For components with hover states, dropdowns, modals, or click interactions:

```
1. playwright_browser_navigate → dev server URL
2. playwright_browser_hover / playwright_browser_click → trigger interactive state
3. playwright_browser_take_screenshot → capture the interactive state
4. Compare against Figma interactive state reference (if available in design/{ticket-id}/states/)
5. If mismatch → edit component code → re-capture → verify
```

Interactive state testing supplements, not replaces, the primary verification loop.

## Component Migration

After verification passes for a slice, promote the component from the design sandbox to the source tree:

1. Copy `design/{ticket-id}/components/{SliceName}/index.tsx` → `src/components/{SliceName}/{index.tsx}`
2. Copy any companion assets (`*.css`, `*.module.css`) alongside
3. If target path already exists, merge — do not overwrite unless explicitly replacing
4. Commit the migration or stage it for the build PR

The component is now ready for the build phase.

## Design→Build Handoff

When ALL slices are verified, write the formal handoff record that links design outputs to build phase input.

Write to `.opencode/metrics/design-handoff-{ticket-id}.json`:

```json
{
  "event": "design_handoff",
  "ticket_id": "TICKET-123",
  "jira_key": "PROJ-123",
  "slices_completed": [
    { "name": "header", "verification_score": 97, "files": ["components/Header/index.tsx"] },
    { "name": "footer", "verification_score": 99, "files": ["components/Footer/index.tsx"] }
  ],
  "tokens_path": "design/TICKET-123/tokens.json",
  "components_path": "design/TICKET-123/components/",
  "verification_scores": { "header": 97, "footer": 99 },
  "design_decisions": [
    "Used CSS custom properties from tokens.json for theming",
    "MUI Box with sx prop (not a new CSS file) per design-patterns.md"
  ],
  "figma_file_key": "abc123def456",
  "timestamp": "ISO-8601"
}
```

The handoff record is read by `/plan-brief` to seed the Jira ticket description with design assets. During Phase 3 (slice planning), the design tokens and reference components inform the build plan. Design handoff metrics must be checked during build phase context restore: if a design handoff exists for the ticket, the build agent must read it and reference the design assets.

## Next Steps

- More slices to verify → `/design-verify {ticket-id} {next-slice}`
- ALL slices verified → design workflow complete, proceed to `/plan-brief {jira-key}` for implementation

## Related Skills

Before executing, load relevant skills:
- `skill({name: "verification-before-completion"})` — verify before claiming done
- `skill({name: "webapp-testing"})` — Playwright browser testing patterns
- `skill({name: "design-taste-frontend"})` — design quality review
- `skill({name: "imugi-verify"})` — automated visual verification loop

## Completion Response (MANDATORY)

End with:
- Verification outcome (score, iterations, pass/fail)
- Files written (verification report)
- Next command: `/design-verify {ticket-id} {next-slice}` or design workflow complete

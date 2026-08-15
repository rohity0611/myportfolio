---
description: "Phase 5 — Build. Execute the approved plan. Functional correctness only. No hardening. After each slice: update architecture visualisation."
---

# Phase 5: Build

You are entering the build phase. Execute the approved plan with precision.

## Restore Context

Before building, resolve `{jira-key}` and slice from `$ARGUMENTS`, then read `.opencode/metrics/phase-state-{jira-key}.json`.

- Read `approved_artifacts`, especially approved Phase 3 slice plan and confidence metric
- Confirm `next_required_action` allows Phase 5 build for this slice
- If cursor missing, reconstruct from `.opencode/plans/` and `.opencode/metrics/`
- If cursor points to another gate, run or report that action first

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{jira-key}.json`
2. **Confidence gate passed:** confidence metric exists and approved
3. **Slice plan exists:** `.opencode/plans/{jira-key}-phase3-{slice-name}.md`
4. **Design handoff (if applicable):** Check `.opencode/metrics/design-handoff-*.json` — if exists, read design tokens and reference components for this build
5. **Standing constraints:** `AGENTS.md` tables
6. **Architecture standards:** `.opencode/rules/architecture-standards.md`

If any check fails, STOP and report what's missing.

## Research Phase (Conditional)

Research required if ANY true:
- Task group creates new files
- Task group uses unfamiliar library
- Task group calls external API
- Task group modifies auth/security

**Skip if:** Only editing existing files, pattern exists, no external deps

**Execute if required:**
```
task(subagent_type: "explore", description: "Find existing implementation pattern", prompt: "Find existing pattern for {task}, check Context7 docs, verify integration approach")
```

## Build Rules

1. **Functional correctness ONLY** — make it work, nothing more
2. Do NOT add: error handling, logging, tests, security, documentation (Phase 6)
3. Follow `.opencode/rules/design-patterns.md`
4. Follow `.opencode/rules/architecture-standards.md`
5. Commit frequently — small, atomic commits with Jira key

## Execution

For each task group in the plan:

1. **Prepare Planned Change Summary** — files to create/modify, brief reason
2. **Approval gate** (MANDATORY):
   - New file creation → MUST ask human before first edit
   - Substantial multi-file edit → ask once before first write
   - Tiny single-file adjustment → may proceed without asking
3. **Use `question` tool** with options: `Approve`, `Deny`, or custom feedback
4. If approved → implement the task group
5. If denied → STOP, report not applied
6. If feedback → revise summary, ask again
7. **Verify:** code compiles, feature works, acceptance criteria met
8. **Commit:** `{JIRA-KEY}: {description}`

**Collaboration:** Ask once per task group, not per file. After approval, finish without re-asking unless scope changes materially.

## Specialist Dispatch (Optional)

If the task group requires focused expertise beyond general implementation, dispatch a specialist agent:

- **Backend-heavy (APIs, auth, DB):** `task(subagent_type: "backend-engineer", description: "Implement backend slice", prompt: "Implement {slice} backend code. Context: {plan path}.")`
- **Frontend-heavy (UI, components):** `task(subagent_type: "frontend-engineer", description: "Implement frontend slice", prompt: "Implement {slice} frontend code. Context: {plan path}.")`
- **Infrastructure (CI/CD, Docker):** `task(subagent_type: "devops-engineer", description: "Implement DevOps tasks", prompt: "Implement {slice} infrastructure code. Context: {plan path}.")`
- **Architecture design needed:** `task(subagent_type: "system-design-engineer", description: "Design system for slice", prompt: "Design architecture for {slice}. Context: {plan path}.")`
- **Build debugging needed:** `task(subagent_type: "debugger", description: "Debug build failure", prompt: "Debug {error}. Context: {plan path}.")`
- **Documentation alongside build:** `task(subagent_type: "documentation-agent", description: "Write docs for build", prompt: "Document code built in {slice}.")`

Use specialist dispatch only when the task group clearly maps to one concern. For general implementation, build directly.

## Post-Build: Architecture Review (MANDATORY)

After completing this slice, you MUST run architecture review before anything else:

1. Run `/update-architecture` to refresh visualisation
2. Review output — does architecture still make sense?
3. Check Data Reality view — coverage regressed?
4. Record result in execution outcome
5. If structural issues → STOP, surface to human
6. If `refactor_needed` → complete refactoring, re-run, then proceed

## Post-Build: Record Outcome

Write to `.opencode/metrics/execution-outcome-{jira-key}[-slice].json`:

```json
{
  "event": "execution_outcome",
  "jira_key": "PROJ-123",
  "slice": "slice-name",
  "confidence_rating": "green",
  "outcome": "success|partial|failure",
  "one_shot": true,
  "replan_count": 0,
  "architecture_review": "pass|refactor_needed|refactor_completed|blocked",
  "data_reality_coverage": 0.85,
  "timestamp": "ISO-8601"
}
```

**`architecture_review` is required.** Missing = next-slice gate blocks.

Update phase-state to Phase 5 with JSON: `{"jira_key": "{jira-key}", "current_phase": "5", "slice": "{slice-name}", "phase_history": [{"phase": "5", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Post-Build: Refresh Context

Code changes make Graphify and CodeGraph indexes stale.

After architecture review and metrics, dispatch a subagent to refresh context:
```
task(subagent_type: "executor", description: "Refresh code indexes after build", prompt: "Run /context-refresh to update CodeGraph and Graphify indexes after this build. Report if any warnings.")
```

Runs in background — doesn't block the build pipeline.

## Next Steps

- More slices remain → `/plan-slice {jira-key} {next-slice}`
- ALL slices built → `/harden {jira-key}`
- Do NOT start Phase 6 until ALL slices built and verified

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before building
- `skill({name: "executing-plans"})` — structured plan execution
- `skill({name: "clean-code"})` — maintain code quality
- `skill({name: "tdd"})` — test-driven development workflow
- `skill({name: "systematic-debugging"})` — debug build failures
- `skill({name: "image-to-code"})` — convert design images to code
- `skill({name: "verification-before-completion"})` — verify before claiming done
- `skill({name: "handoff-contracts"})` — structured handoff between phases
- `skill({name: "error-recovery"})` — retry/fallback protocols
- `skill({name: "output-validation"})` — structured return format
- `skill({name: "trace-capture"})` — observability tracing
- `skill({name: "context-budget"})` — context window management
- `skill({name: "shared-state"})` — cross-agent coordination (use `read_shared_state` and `write_shared_state` tools)
- `skill({name: "review-pipeline"})` — multi-pass verification

## Completion Response (MANDATORY)

End with:
- Build outcome for this slice
- Architecture review result
- Next command: `/plan-slice {jira-key} {next-slice}` or `/harden {jira-key}`

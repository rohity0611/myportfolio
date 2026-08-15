---
description: "Phase 7 — Ship. Create feature branch, commit changes, create PR. Runs ONCE for all slices."
---

# Phase 7: Ship

You are entering Phase 7 of the factory chain. This runs ONCE — single PR for the complete feature.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "finishing-a-development-branch"})` — guide branch completion
- `skill({name: "verification-before-completion"})` — verify before shipping
- `skill({name: "handoff"})` — compress session for continuation
- `skill({name: "requesting-code-review"})` — prepare PR for review
- `skill({name: "receiving-code-review"})` — process review feedback
- `skill({name: "handoff-contracts"})` — structured handoff between phases
- `skill({name: "trace-capture"})` — observability tracing
- `skill({name: "context-budget"})` — context window management
- `skill({name: "output-validation"})` — structured return format

## Restore Context

Before shipping, resolve `{jira-key}` from `$ARGUMENTS` and read `.opencode/metrics/phase-state-{jira-key}.json`.

- Read all `approved_artifacts`, including swarm completion and final execution outcomes.
- Confirm `next_required_action` allows Phase 7 shipping.
- If hardening is incomplete, reconciliation is unresolved, or the cursor points to another required action, stop and report it.
- If the cursor is missing, reconstruct it from `.opencode/plans/` and `.opencode/metrics/` before proceeding.

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` whenever updating phase state.

## Gate Check (MANDATORY)

Before shipping, verify:
- [ ] All 7 hardening agents completed or were explicitly skipped with rationale (check swarm_completion metric)
- [ ] Reconciliation resolved all conflicts
- [ ] Code still compiles after hardening
- [ ] Application still starts and acceptance criteria still pass

## Research Phase

Before shipping, verify readiness.

### Assess Readiness

From hardening completion, verify:
- All agents completed or skipped with rationale
- No unresolved conflicts
- Tests pass
- Build succeeds

### Dispatch Explore Agent

```
task(subagent_type: "explore", description: "Pre-ship verification check", prompt: "Verify all hardening complete, check for uncommitted changes, verify tests pass, check for any issues before shipping")
```

### Source Priority

1. graphify/codegraph for final verification
2. claude-mem for known issues
3. Existing tests for verification

## Branch Naming

Use this format: `{type}/{jira-key}-{short-description}`

**Types:**
- `feature`: new functionality
- `fix`: bug fix
- `refactor`: code restructuring
- `docs`: documentation only
- `test`: test additions

**Examples:**
- `feature/PROJ-123-user-login`
- `fix/PROJ-456-null-pointer`
- `refactor/PROJ-789-extract-service`

## Commit Message Rules

Write commit messages that anyone can understand.

### Format

```
{action}: {what changed}
```

### Actions (use one)

| Action | When to use |
|--------|-------------|
| `add` | New feature or file |
| `fix` | Bug fix |
| `update` | Change to existing feature |
| `remove` | Delete code or file |
| `refactor` | Restructure without changing behavior |
| `test` | Add or update tests |
| `docs` | Documentation changes |

### Examples

**Good:**
- `add: user login page`
- `fix: null pointer in user service`
- `update: change password validation`
- `remove: unused import statements`
- `refactor: extract user service from controller`
- `test: add unit tests for user service`
- `docs: update API documentation`

**Bad:**
- `PROJ-123: updated code`
- `fixes`
- `WIP`
- `asdf`
- `changes`
- `update`
- `misc`

### Rules

1. **Use simple English** — anyone should understand
2. **Be specific** — say what changed, not just "update"
3. **One line only** — keep it short
4. **No Jira key in commit** — Jira link goes in PR description
5. **No period at end** — keep it clean

## Instructions

1. **Update Jira status** to "In Review"
2. **Create feature branch** following naming convention
3. **Commit all changes** with clean commit messages following the rules above
4. **Check if you need:**
   - Database migrations — create if schema changed
   - Feature flags — add if gradual rollout needed
   - Environment config — update if new vars needed
   - CI/CD config — ensure pipeline will run tests
5. **Run final verification:**
   - Full test suite passes
   - Build succeeds
   - Linter passes
   - No unresolved merge conflicts
6. **Create PR** with description including:
   - Jira ticket link
   - What was built (simple English)
   - Files changed summary
   - Hardening agents that ran and outcomes
   - Test coverage summary
7. **Update Jira status** to "Done" when PR merges

## Metrics

Write ship event to `.opencode/metrics/shipped-{jira-key}.json`:
```json
{
  "event": "shipped",
  "jira_key": "",
  "slice": "",
  "branch": "",
  "pr_number": "",
  "files_changed": 0,
  "tests_added": 0,
  "coverage_percent": 0,
  "hardening_agents_complete": 7,
  "timestamp": ""
}
```

Also update `.opencode/metrics/phase-state-{jira-key}.json` to record Phase 7 as the current phase, appending a `phase_history` entry with `{"phase": "7", "status": "complete", "timestamp": "<ISO-8601>"}`.

## Completion Response (MANDATORY)

End the command response with:
- ship status and PR/deploy status
- written metric files
- explicit closure note: factory chain complete for this ticket

---
description: "Phase 6 — Harden. Dispatch 7+1 agent team for parallel hardening. 7 core agents always run. Optional 8th (Data Integration Hardener) activates for mock-to-real transitions. Runs ONCE after ALL slices built."
---

# Phase 6: Harden

You are entering Phase 6 of the factory chain.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "clean-code"})` — code quality standards
- `skill({name: "verification-before-completion"})` — verify before claiming done
- `skill({name: "api-security-best-practices"})` — secure API design patterns for security agent
- `skill({name: "frontend-security-coder"})` — frontend security patterns for UI hardening
- `skill({name: "document-coherence"})` — maintain documentation consistency
- `skill({name: "web-design-guidelines"})` — interface guidelines for accessibility agent
- `skill({name: "dispatching-parallel-agents"})` — coordinate 7+ parallel hardening agents
- `skill({name: "handoff-contracts"})` — structured handoff between phases
- `skill({name: "error-recovery"})` — retry/fallback protocols
- `skill({name: "output-validation"})` — structured return format
- `skill({name: "trace-capture"})` — observability tracing
- `skill({name: "context-budget"})` — context window management
- `skill({name: "parallel-tracking"})` — track parallel agent status
- `skill({name: "shared-state"})` — cross-agent coordination (use `read_shared_state` and `write_shared_state` tools)
- `skill({name: "review-pipeline"})` — multi-pass verification
- `skill({name: "adversarial-verification"})` — independent verification

## Restore Context

Before hardening, resolve `{jira-key}` from `$ARGUMENTS` and read `.opencode/metrics/phase-state-{jira-key}.json`.

- Read all `approved_artifacts`, including slice strategy, slice plans, confidence metrics, and execution outcomes.
- Confirm `next_required_action` allows Phase 6 hardening.
- If any slice cursor still points to `/update-architecture`, `/plan-slice`, or `/build`, stop and report the missing action.
- If the cursor is missing, reconstruct it from `.opencode/plans/` and `.opencode/metrics/` before proceeding.

Record `jira_key`, `current_phase`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` whenever updating phase state.

## All-Slices Gate Check

Before proceeding, verify:
- [ ] **ALL slices** defined in Phase 2 have been built (not just the current one)
- [ ] Each slice has its own execution outcome metric in `.opencode/metrics/`
- [ ] **Architecture review completed** (`/update-architecture` run after final slice)
- [ ] Code compiles without errors in ALL projects
- [ ] Application starts and acceptance criteria pass for ALL slices

**Do NOT start hardening until every slice is built and verified. This is structural, not optional.**

## Research Phase

Before dispatching hardening agents, gather context.

### Assess Complexity

From slice scope, estimate concerns:
- **Simple (< 3 concerns):** 1 explore agent
- **Complex (> 3 concerns):** 2-3 explore agents in parallel

Use `dispatching-parallel-agents` skill for coordination pattern.

### Dispatch Explore Agents

**Single agent (simple):**
```
task(subagent_type: "explore", description: "Find hardening patterns and targets", prompt: "Find existing patterns for {hardening concern}, identify files to harden, check test patterns")
```

**Multiple agents (complex):**
```
task(subagent_type: "explore", description: "Find security hardening targets", prompt: "Find security patterns, identify files to harden, check OWASP compliance")
task(subagent_type: "explore", description: "Find resilience gaps", prompt: "Find error handling patterns, check resilience gaps")
task(subagent_type: "explore", description: "Find test coverage gaps", prompt: "Find test patterns, identify test coverage gaps")
```

### Source Priority

Each explore agent checks sources in order:
1. graphify/codegraph for hardening targets
2. claude-mem for known issues
3. MCPs for security/resilience patterns
4. Existing tests for verification patterns

### Merge Findings

Collect all agent outputs. Use unified context to:
- Prioritize hardening targets
- Identify files needing most attention
- Plan agent dispatch order

## Step 1: Determine 8th Agent Activation

Check if the Data Integration Hardener should activate:

1. Read `HARDENING_DATA_INTEGRATION` from FACTORY_CONFIG in AGENTS.md
2. If `true` → activate the 8th agent
3. If `false` → scan for mock patterns anyway (the 6 types: mock data files, stubbed APIs, placeholder credentials, fake generators, commented-out real calls, environment-conditional mocks)
4. If mock patterns found → recommend activation to human, wait for confirmation

## Step 2: Determine Test Agent Applicability

Read project testing choice from AGENTS standing constraints (or setup summary if AGENTS is not generated yet):

- If testing framework is `none`, do not dispatch the `test-writer` agent.
- Mark `test` as `skipped` in swarm metrics with rationale: `testing framework configured as none during /factory-setup`.
- Do not create test files in this case.
- If testing framework is anything else, dispatch `test-writer` normally.

## Step 3: Launch Hardening Swarm

1. Transition Jira ticket to "In Hardening"
2. Build a Condensed Context Packet from restored phase state and approved artifacts. Include it in every dispatched agent prompt.
3. Dispatch parallel `task` tool calls — one per hardening agent. Run all independent agents in the same message so they execute concurrently:

```markdown
Context: {jira-key} | Phase 6 | Slice: all | Plan: {paths} | Scope: all code | Non-goals: other agents' concerns
```

```
Use the `task` tool for each applicable agent with subagent_type matching the agent name. Prepend the Context Packet to every prompt:
- task(subagent_type: "security-reviewer", description: "Review code for security vulnerabilities", prompt: "Context: ...\n\nReview all code built across slices for OWASP, auth, secrets, injection vulnerabilities. Fix all findings.")
- task(subagent_type: "test-writer", description: "Write tests to 80% coverage", prompt: "Context: ...\n\nWrite unit, integration, and contract tests to 80% coverage for all code built across slices.")  // skip this dispatch when testing framework is none
- task(subagent_type: "resilience-hardener", description: "Add error handling and retries", prompt: "Context: ...\n\nAdd error handling, retries, circuit breakers, and timeouts to all code built across slices.")
- task(subagent_type: "observability-agent", description: "Add logging and monitoring", prompt: "Context: ...\n\nAdd structured logging, monitoring hooks, and health checks to all code built across slices.")
- task(subagent_type: "accessibility-agent", description: "Ensure WCAG accessibility compliance", prompt: "Context: ...\n\nEnsure WCAG compliance, ARIA attributes, keyboard navigation for all frontend code built across slices.")
- task(subagent_type: "code-standards-agent", description: "Run linter and fix code standards", prompt: "Context: ...\n\nRun linter/formatter, fix naming conventions, remove dead code. Run LAST — it reformats others' output.")
- task(subagent_type: "documentation-agent", description: "Update API docs and README", prompt: "Context: ...\n\nUpdate API docs, README, and changelog for all code built across slices.")

Optional (code quality improvement):
- task(subagent_type: "refactor", description: "Refactor code for maintainability", prompt: "Context: ...\n\nIdentify refactoring opportunities across built code: extract functions, reduce duplication, improve naming. Apply safe, behavior-preserving changes.")

Optional (when activated):
- task(subagent_type: "data-integration-hardener", description: "Audit mock patterns across slices", prompt: "Context: ...\n\nSTEP 1 ONLY: Audit mock patterns across all slices. Produce a migration plan at .opencode/hardening/data-integration-plan.md.")

IMPORTANT: Each agent works ONLY on their concern. They must not overlap.
EXECUTION ORDER: Dispatch all agents in one message for parallel execution.
Code standards agent should run last — let others finish first.
```

4. Wait for all agents to complete

## Step 4: Data Integration Gate (if 8th agent activated)

If the Data Integration Hardener produced a plan at `.opencode/hardening/data-integration-plan.md`:

1. **Present the migration plan to the human**
2. **Wait for explicit approval** — this is judgment work:
   - Which mocks to migrate?
   - What credentials/endpoints are available?
   - What's the priority order?
   - Are any mocks intentionally staying as mocks?
3. If approved → run Data Integration Hardener Step 2 (mock-to-real migration)
4. If not approved → record as `skipped` and proceed

## Step 5: Reconcile

1. Review all outputs from all agents
2. Resolve any conflicts between agents
3. If Data Integration Step 2 ran, reconcile its changes too
4. Run full test suite on reconciled code
5. Verify build still works

## Step 6: Refresh Context

Hardening agents modified code. Indexes are now stale.

After reconcile, dispatch a subagent to refresh context:
```
task(subagent_type: "executor", description: "Refresh indexes after hardening", prompt: "Run /context-refresh to update CodeGraph and Graphify indexes after hardening code changes. Report if any warnings.")
```

Runs in background — doesn't block the hardening pipeline.

## Metrics

Write swarm completion to `.opencode/metrics/swarm-{jira-key}.json`:
```json
{
  "event": "swarm_completion",
  "jira_key": "",
  "agents": {
    "security": "complete|partial|failed|skipped",
    "test": "complete|partial|failed|skipped",
    "resilience": "complete|partial|failed|skipped",
    "observability": "complete|partial|failed|skipped",
    "accessibility": "complete|partial|failed|skipped",
    "code_standards": "complete|partial|failed|skipped",
    "documentation": "complete|partial|failed|skipped",
    "data_integration": "complete|partial|failed|skipped"
  },
  "data_integration_step1_approved": false,
  "reconciliation_conflicts": 0,
  "timestamp": ""
}
```

`skipped` is allowed only when a concern is not applicable or the human explicitly waives it with recorded rationale.

When testing framework is `none`, `test: skipped` is expected and valid.

Also update `.opencode/metrics/phase-state-{jira-key}.json` to record Phase 6 as the current phase, appending a `phase_history` entry with `{"phase": "6", "status": "in_progress", "timestamp": "<ISO-8601>"}`.

## Step 7: Next

When hardening is complete (including Step 6 context refresh), proceed to Phase 7 (`/ship`).

## Completion Response (MANDATORY)

End the command response with:
- swarm completion summary (including skipped agents + rationale)
- reconciliation status
- exact next command to run: `/ship {jira-key}`

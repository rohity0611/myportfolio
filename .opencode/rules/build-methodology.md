# Build Methodology — OpenCode Factory v3.0

> Auto-loaded by OpenCode. Full factory methodology for build phases.

## Core Discipline

**Build working software first. Harden it second. Ship it third.**

Every phase has one job. Every agent has one concern. Every plan gets approved before execution.

## The 7-Phase Chain

### Planning Phases (ALWAYS use Plan Mode)

**Phase 1 — Brief Planning (`/plan-brief`):** Read the product brief. Ask clarifying questions. Identify risks. Confirm understanding. → Human approves.

**Phase 2 — Slice Recommendation (`/slice`):** Recommend vertical delivery slices. Map dependencies. Recommend sequence. → Human approves.

**Phase 3 — Slice Planning (`/plan-slice`):** For each slice: break into executable task groups. Define acceptance criteria. Add build-ready execution notes. Write the approved slice plan to `.opencode/plans/`. → Human approves.

**Phase 4 — Execution Planning (inside `/plan-slice`):** For each task group: detailed technical plan with file paths, approach, verification strategy. Self-assess confidence and write the confidence metric. → Confidence gate.

### Execution Phases

**Phase 5 — Build (`/build`):** Execute approved plan. Functional correctness ONLY. No error handling, logging, tests, security, or docs. **After each slice: `/update-architecture`.** Repeat Phase 3→4→5 for EVERY slice before Phase 6.

**Phase 6 — Harden (`/harden`):** Dispatch 7-agent team via parallel `task` tool calls for hardening. Reconcile outputs. **ONCE after ALL slices built.**

**Phase 7 — Ship (`/ship`):** Branch, CI/CD, feature flags, migrations, deploy. **ONCE — single PR.**

## Plan File Location (CRITICAL)

**Plans are written to `.opencode/plans/`.**

## Planning Rules

1. ALWAYS use Plan Mode (Shift+Tab×2) for Phases 1-4
2. NEVER write code without an approved plan
3. Save ALL plans to `.opencode/plans/{jira-key}-{phase}-{description}.md`
4. Commit plans to git for audit trail
5. If a plan isn't clean enough to execute confidently, re-slice
6. Consult `docs/discovery-archive/` during planning if it exists

### Efficient Execution (Default)

For routine, low-risk, already-scoped work:
- Reuse validated outputs from phase-state instead of re-reading all prior artifacts every turn.
- Batch independent reads/tool calls where possible.
- Keep responses concise and move directly to the next required gate.

Efficient execution does NOT permit:
- skipping confidence gate,
- skipping architecture review gate,
- skipping required human approvals,
- skipping security/irreversibility rules.

## Confidence Gate (Phase 4)

Self-assess across 5 dimensions before executing:

| Dimension | Green | Amber | Red |
|-----------|-------|-------|-----|
| **Clarity** | No open questions | Minor ambiguities | Blocked on unknowns |
| **Precedent** | Strong match in codebase | Partial match | Entirely novel pattern |
| **Complexity** | 1-2 files | 3-6 files | Cross-system changes |
| **Risk** | New feature, low blast | Modifying existing flow | Payments, PII, auth |
| **Dependency** | Self-contained, data modes decided | Need docs or credentials pending | Blocked on human/external or data reality undecided |

Note on Dependency: if the slice plan's Data Reality Decision Table has `real` sources that need credentials not yet provisioned, this is Amber minimum. If data reality decisions haven't been made at all, this is Red.

Output to `.opencode/metrics/confidence-{jira-key}.json` for single-slice work, or `.opencode/metrics/confidence-{jira-key}-{slice}.json` when a ticket has multiple tracked slices:
```json
{
  "jira_key": "PROJ-123", "task_group": "description", "timestamp": "ISO-8601",
  "dimensions": { "clarity": "green", "precedent": "green", "complexity": "green", "risk": "green", "dependency": "green" },
  "overall": "green", "rationale": "brief explanation", "discovery_health_score": null
}
```

**Gates:** All green → auto-approve if configured. Any amber → execute + log for review. Any red → STOP.

## Architecture Review (After Phase 5)

**After each slice, run `/update-architecture`.** This is a structural gate — the factory will not proceed to the next slice without it.

The architecture review follows the same trust-building progression as the confidence gate:

| `ARCHITECTURE_REVIEW_MODE` | Behaviour |
|----------------------------|-----------|
| `mandatory` (default) | Agent runs review, presents to human, human confirms before next slice |
| `notify` | Agent runs review, reports summary, proceeds unless issues found |
| `auto` | Agent runs review silently, only surfaces if health check fails |

**Progression:** Start at `mandatory`. After `ARCHITECTURE_REVIEW_AUTO_THRESHOLD` consecutive passes (default 20), the Chain Engineer may move to `notify`. After sustained clean reviews, move to `auto`. Same earned-trust pattern as confidence gate — don't relax until data justifies it.

`ARCHITECTURE_REVIEW_PASS_COUNT` tracks consecutive passes. Resets to 0 on any `refactor_needed` or `blocked`.

If review reveals structural issues → STOP and surface to human regardless of mode.

## Hardening Protocol (Phase 6)

7 core specialist agents + 1 optional, each in own git worktree:

1. **Security Agent** — OWASP, auth/authz, secrets, injection
2. **Test Agent** — Unit, integration, contract tests
3. **Resilience Agent** — Error handling, retry, circuit breakers
4. **Observability Agent** — Structured logging, monitoring, health checks
5. **Accessibility Agent** — WCAG, ARIA, keyboard nav
6. **Code Standards Agent** — Linting, formatting, naming
7. **Documentation Agent** — API docs, README, changelog
8. **Data Integration Hardener** _(optional)_ — Mock-to-real data transition

### 8th Agent: Data Integration Hardener

Activates when `HARDENING_DATA_INTEGRATION: true` in FACTORY_CONFIG, OR when the build contains mock data, stubbed APIs, placeholder credentials, fake generators, or environment-conditional mocks.

**Two-step execution model** (unique — has a human gate mid-execution):
- **Step 1** runs with the swarm: audits 6 mock pattern types, produces migration plan → `.opencode/hardening/data-integration-plan.md`
- **Human approval gate:** plan requires explicit sign-off (which mocks to replace, credentials to provision, ordering)
- **Step 2** runs after approval: replaces mocks with configurable real integrations, preserving mock mode

**Key principle:** Mock mode is sacred. The agent adds real alongside mock, never removes mock. Local dev/CI still works with mocks; production uses real data via config switching.

**Single-concern rule:** Each agent ONLY applies its concern. Separation is structural.

Applicability rule:
- If project setup selected testing framework `none`, the Test Agent is skipped and recorded as `skipped` with rationale. It must not create test files in this case.

**Order:** Code Standards last (reformats others' output). Security typically longest. Data Integration Hardener Step 1 runs with the swarm; Step 2 runs after reconciliation if approved.

## Jira Integration (for Plandek)

| Phase Start | Jira Status |
|-------------|-------------|
| Phase 1 | In Planning |
| Phase 5 | In Build |
| Phase 6 | In Hardening |
| Phase 7 | In Review |
| Complete | Done |

One sub-task per slice. Jira key in all commits, PRs, branch names.

## Git Discipline

- One shipping PR per Jira ticket — keep slices reviewable through small commits and phase plans
- Commit frequently — small, atomic
- Plans committed to `.opencode/plans/` for audit
- Git init in Slice 1, not Phase 7

## Metrics Capture

Phase commands update `phase-state`, confidence, execution outcome, swarm completion, and shipped metrics in `.opencode/metrics/`

## Phase Gate Checks (MANDATORY)

### Slice Complete → Next Slice (ARCHITECTURE REVIEW GATE)
Before returning to Phase 3 for the next slice:
- [ ] Previous slice execution outcome recorded in `.opencode/metrics/`
- [ ] `/update-architecture` has been run after this slice
- [ ] `architecture_review` field in execution outcome is `pass` or `refactor_completed`
- [ ] If `architecture_review` was `refactor_needed` → refactoring done and re-reviewed
- [ ] Data reality coverage has not regressed

**This gate is structural. If `/update-architecture` has not been run, the agent MUST run it before proceeding. Not a suggestion — an enforced prerequisite.**

### `/plan-slice` Complete
- [ ] Phase 3 plan exists in `.opencode/plans/`
- [ ] Execution notes exist for each task group
- [ ] Confidence file exists and complete
- [ ] No RED dimensions
- [ ] Human approved (when auto-approve off)

### Phase 5 → 6 (ALL SLICES)
- [ ] ALL slices built
- [ ] Architecture review completed (`/update-architecture` after final slice)
- [ ] All acceptance criteria pass

### Phase 6 → 7
- [ ] All 7 core agents completed or were explicitly skipped with rationale
- [ ] Data Integration Hardener: completed OR skipped (if no mock patterns)
- [ ] If Data Integration Step 1 produced a plan: human approved before Step 2 ran
- [ ] Reconciliation resolved conflicts

### Enforcement
When the agent receives ANY instruction (build, plan, implement, next slice):
1. Read `.opencode/metrics/phase-state-{jira-key}.json` at session start
2. If a slice was just completed: check for architecture review in execution outcome
3. If architecture review missing → run `/update-architecture` BEFORE doing anything else
4. If confidence gate missing → re-run `/plan-slice` before building
5. If missing, reconstruct phase state from `.opencode/plans/` and `.opencode/metrics/` artifacts

## Escalation Rules

Escalate ONLY when: confidence RED, architecture review reveals blockers, technology not in constraints, external dependency blocking, 3 failed fix attempts, irreconcilable hardening conflicts.

Otherwise: **execute within constraints. No asking. No presenting options.**

## Anti-Patterns

- NEVER mix concerns in a single phase
- NEVER skip planning or architecture review
- NEVER proceed past red confidence
- NEVER let AGENTS.md exceed 100 lines — push to rules files

## Complex Reasoning

For complex architectural decisions, multi-step analysis, or when facing ambiguity, use the `sequentialthinking` tool to:

1. Break down the problem into structured steps
2. Revise reasoning as understanding deepens
3. Verify hypotheses before acting

This is especially useful during Phase 1 (Brief Planning) and Phase 3 (Slice Planning) for trade-off analysis.

## External Documentation

When researching external dependencies or libraries:

1. Use `context7` for library documentation and code examples (e.g., `context7_resolve-library-id` then `context7_query-docs`)
2. Use `deepwiki` for GitHub repository documentation and AI-powered Q&A
3. Use `gh_grep` for real-world code patterns from public repos
4. Use `scout` subagent for cloning and inspecting external dependency source code

## External Dependency Research

When encountering unfamiliar libraries or verifying API usage:

```
task(subagent_type: "scout", description: "Research library API", prompt: "Research {library} API for {specific use case}. Check official docs, GitHub repo, and version compatibility. Report findings with code examples.")
```

Scout clones dependency repos into OpenCode's managed cache and inspects source code without modifying the workspace.

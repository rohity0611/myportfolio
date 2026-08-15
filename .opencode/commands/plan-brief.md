---
description: "Phase 1 — Brief Planning. Enter Plan Mode. Read and understand the product brief. Identify risks and unknowns. Confirm understanding with human."
---

# Phase 1: Brief Planning

You are entering Phase 1 of the factory chain. Switch to Plan Mode immediately.

## Restore Context

Before planning, resolve `{jira-key}` from `$ARGUMENTS` (or ask if unknown).

Check `.opencode/metrics/phase-state-{jira-key}.json`:
- If exists, read it and `approved_artifacts` before using chat history
- If shows unfinished required action, report it before restarting Phase 1
- If not exists, create after brief approval

Check `.opencode/metrics/design-handoff-*.json` for the same jira-key:
- If exists, read the handoff to incorporate design tokens and reference components into the planning

Record `jira_key`, `current_phase`, `start_position`, `current_position`, `next_required_action`, `approved_artifacts`, `last_completed_step`, `blockers`, and `phase_history` when updating.

## Required Checks

1. **Phase state exists:** `.opencode/metrics/phase-state-{jira-key}.json`
2. **Brief exists:** Product brief is available (provided in arguments or from conversation)
3. **Standing constraints:** `AGENTS.md` tables
4. **Design handoff (if exists):** `.opencode/metrics/design-handoff-{jira-key}.json` — read it if present

If any check fails, STOP and report what's missing.

## Research Phase

Before reading the brief, gather codebase context.

### Assess Complexity

From brief title/description, estimate concerns:
- **Simple (< 3 concerns):** 1 explore agent
- **Complex (> 3 concerns):** 2-3 explore agents in parallel

Use `dispatching-parallel-agents` skill for coordination pattern.

### Dispatch Explore Agents

**Single agent (simple):**
```
task(subagent_type: "explore", description: "Analyse architecture and patterns", prompt: "Analyse codebase architecture, find patterns for {feature type from brief}, identify similar features, map external dependencies, check reusable components")
```

**Multiple agents (complex):**
```
task(subagent_type: "explore", description: "Map layer structure and patterns", prompt: "Map layer structure, identify patterns for {feature type}")
task(subagent_type: "explore", description: "Find API and auth patterns", prompt: "Find API integrations, third-party libs, auth patterns")
task(subagent_type: "explore", description: "Find similar features and tests", prompt: "Find similar features, reusable components, test patterns")
```

### Source Priority

Each explore agent checks sources in order:
1. graphify/codegraph for architecture and patterns
2. claude-mem for similar briefs/features solved before
3. MCPs for external dependencies (Context7, Snyk, DeepWiki)
4. websearch for library-specific documentation

### External Dependency Research

If the brief references unfamiliar libraries or services, dispatch Scout:
```
task(subagent_type: "scout", description: "Research external dependencies", prompt: "Research {dependency} for {use case}. Check API compatibility, version requirements, and known issues. Report findings.")
```

Scout clones repos into OpenCode's managed cache for inspection without modifying the workspace.

### Merge Findings

Collect all agent outputs. Use unified context to:
- Pre-populate technical risks
- Identify integration points before reading brief
- Suggest clarifying questions

## Phase Work

1. If CTT key, look up in `.opencode/ctt-jira-mapping.csv` and check `docs/discovery-archive/`
2. Read the product brief (or reference from `$ARGUMENTS`)
3. Cross-reference brief with research findings
4. Identify: risks, unknowns, external dependencies, ambiguities, integration points
5. Ask clarifying questions only for unresolved ambiguities
6. Produce summary: what we're building, key decisions, risks, open questions

## Jira

Transition ticket to "In Planning" status.

## Output

Write to `.opencode/plans/{jira-key}-phase1-brief-understanding.md`. Update phase-state to Phase 1 with JSON: `{"jira_key": "{jira-key}", "current_phase": "1", "phase_history": [{"phase": "1", "status": "in_progress", "timestamp": "<ISO-8601>"}]}`.

## Gate

Present understanding for human approval before proceeding.

## Related Skills

Before executing, load relevant skills:
- `skill({name: "research-first"})` — gather context before planning
- `skill({name: "brainstorming"})` — validate ideas during brief understanding
- `skill({name: "grill-me"})` — pressure-test brief understanding
- `skill({name: "improve-codebase-architecture"})` — analyze architecture for context
- `skill({name: "handoff-contracts"})` — structured handoff between phases
- `skill({name: "context-budget"})` — context window management
- `skill({name: "trace-capture"})` — observability tracing

## Completion Response (MANDATORY)

End with:
- Current phase status
- Files written (plan + metric)
- Next command: `/slice {jira-key}` after approval

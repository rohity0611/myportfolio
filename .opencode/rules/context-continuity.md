# Context Continuity

> Auto-loaded by OpenCode. Preserves factory run position across compaction, new sessions, and subagent dispatch.

## Core Rule

Every factory phase command MUST restore durable run context before deciding what to do next.

The authoritative cursor is `.opencode/metrics/phase-state-{jira-key}.json`. Chat history, recent tool output, and memory notes are secondary.

## Restore Context Pre-Flight

At the start of `/plan-brief`, `/slice`, `/plan-slice`, `/build`, `/harden`, `/ship`, `/design-brief`, `/design-slice`, `/design-plan-slice`, `/design-build`, and `/design-verify`:

0. Search claude-mem for recent context: `mem-search(query: "{jira-key} phase status", limit: 3)` — use as supplementary context.
1. Resolve `{jira-key}` from command arguments or ask the human if missing.
2. Read `.opencode/metrics/phase-state-{jira-key}.json` if it exists.
3. Read the files listed in `approved_artifacts` before using prior chat context.
4. Compare `current_position` and `next_required_action` with the requested command.
5. If the requested command would skip a required gate, stop and run the required action first.
6. If the cursor is missing, reconstruct it from `.opencode/plans/` and `.opencode/metrics/` before proceeding.

### Efficient Execution

Use a minimal restore path first: read `phase-state-{jira-key}.json` and only the artifact required by `next_required_action`.

Avoid repeated reads when phase cursor and required artifacts are unchanged.

Do not ask clarification questions if required values are already present in phase-state or current user input.

Gates remain strict at all times:
- Never skip confidence gates.
- Never skip architecture review gates.
- Never skip required human approvals.
- Never infer missing required fields.

## Run Cursor Fields

Each phase-state file records:

- `start_position` — command or event where this factory run began
- `current_position` — current phase, slice, and task group in human-readable form
- `next_required_action` — exact next gate or command required
- `approved_artifacts` — durable plan/metric files that define the approved scope
- `last_completed_step` — latest completed phase, slice, or task group
- `blockers` — unresolved blockers that must be addressed before continuing

## Subagent Context Packets

Every dispatched subagent must receive a compact Context Packet. Do not rely on subagents reading the whole conversation.

```markdown
Context Packet:
- Jira key:
- Phase:
- Slice:
- Task group:
- Approved plan:
- Scope:
- Non-goals:
- Last completed step:
- Required output:
```

For hardening agents, include the single concern and explicit non-goals so agents do not cross responsibilities.

## Failure Handling

If restored state conflicts with user instruction, report the conflict and the required next action. Do not guess the run position.

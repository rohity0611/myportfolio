---
name: handoff-contracts
description: "Use when transitioning between phases to ensure clean structured handoffs"
risk: low
source: factory
date_added: "2026-07-22"
---

# Handoff Contracts Skill

Ensure clean, structured handoffs between phases in the factory workflow.

## When to Use
- Transitioning from one phase to another
- Resuming work after interruption
- Handing off work between agents
- Starting a new phase with context from previous phase

## Handoff Format

Every phase transition must include:

### 1. Phase Output Summary
- What was produced
- Key decisions made
- Blockers encountered

### 2. Context Payload
- Relevant file paths
- Key data structures
- Dependencies carried forward

### 3. Validation Checklist
- [ ] All required outputs exist
- [ ] All outputs pass schema validation
- [ ] No unresolved blockers

### 4. Next Phase Expectations
- What the next phase should produce
- Known risks for next phase
- Recommended approach

## Handoff Artifacts

Store handoffs in `.opencode/handoffs/`:
- `{phase}-to-{next-phase}.md` — structured handoff document
- `{phase}-outputs.json` — machine-readable output manifest

## Protocol

### Before Phase Completion
1. Generate phase output summary
2. Validate all outputs against schema
3. Write handoff document to `.opencode/handoffs/`
4. Write output manifest to `.opencode/handoffs/`

### During Phase Transition
1. Next phase MUST read handoff document before starting
2. Next phase MUST acknowledge handoff receipt
3. Next phase MUST validate inputs match handoff manifest

### Handoff Document Template
```markdown
## Phase: {phase-name}
## Timestamp: {ISO-8601}
## Status: {completed|partial|blocked}

### Outputs
- {output-1}: {path}
- {output-2}: {path}

### Key Decisions
- {decision-1}: {rationale}
- {decision-2}: {rationale}

### Blockers
- {blocker-1}: {status}

### Next Phase Expectations
- {expectation-1}
- {expectation-2}
```

## Validation Rules
- Handoff document MUST exist before next phase starts
- Output manifest MUST match actual files
- All required outputs MUST be present
- All file paths MUST be valid
- All blockers MUST be documented with status

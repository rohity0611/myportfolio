# Handoff Contracts Rules

## Mandatory Handoff Protocol

Every phase transition MUST follow this protocol:

### Before Phase Completion
1. Generate phase output summary
2. Validate all outputs against schema
3. Write handoff document to `.opencode/handoffs/`
4. Write output manifest to `.opencode/handoffs/`

### During Phase Transition
1. Next phase MUST read handoff document before starting
2. Next phase MUST acknowledge handoff receipt
3. Next phase MUST validate inputs match handoff manifest

### Handoff Document Format
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

### Output Manifest Format
```json
{
  "phase": "phase-name",
  "timestamp": "ISO-8601",
  "status": "completed|partial|blocked",
  "outputs": [
    {
      "name": "output-name",
      "path": "file-path",
      "type": "file|text|data",
      "required": true
    }
  ],
  "blockers": [
    {
      "name": "blocker-name",
      "status": "resolved|pending|escalated"
    }
  ]
}
```

### Validation
- Handoff document MUST exist before next phase starts
- Output manifest MUST match actual files
- All required outputs MUST be present
- All file paths MUST be valid
- All blockers MUST be documented with status
- Handoff MUST be acknowledged by receiving phase

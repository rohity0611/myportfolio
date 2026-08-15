# Context Checkpoint Rules

## Mandatory Checkpoints in Discovery

### Automatic Checkpoints
- MUST create checkpoint after every 10 tool calls
- MUST create checkpoint after every 30 minutes
- MUST create checkpoint when token usage exceeds 50%
- MUST create checkpoint before phase transition

### Manual Checkpoints
- MUST create checkpoint before complex operation
- MUST create checkpoint before parallel dispatch
- MUST create checkpoint before risky operation
- MUST create checkpoint when user requests

### Checkpoint Requirements
- MUST capture current task
- MUST capture completed tasks
- MUST capture pending tasks
- MUST capture key decisions
- MUST capture outputs
- MUST capture blockers
- MUST include metadata

### Checkpoint Storage
- MUST write to `.opencode/checkpoints/`
- MUST name: `{phase}-{agent}-{checkpointNumber}.json`
- MUST include all required fields
- MUST validate JSON format

### Checkpoint Restoration
- MUST find latest checkpoint for phase/agent
- MUST validate checkpoint integrity
- MUST restore all context fields
- MUST verify context consistency
- MUST resume from checkpoint

### Checkpoint Retention
- Keep checkpoints for 30 days
- Aggregate into phase summaries
- Archive old checkpoints to cold storage

### Validation
- Every checkpoint MUST have unique checkpointId
- Every checkpoint MUST be valid JSON
- Every checkpoint MUST be written to storage
- Every restoration MUST verify context consistency

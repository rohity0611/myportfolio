# Parallel Tracking Rules

## Mandatory Parallel Tracking

### On Dispatch
- MUST create tracking document
- MUST set all agents to `pending`
- MUST write to `.opencode/tracking/`
- MUST include dispatchId and timestamp

### On Agent Start
- MUST set agent status to `running`
- MUST record start time
- MUST update tracking document

### On Agent Completion
- MUST set agent status to `completed`
- MUST record end time
- MUST record output summary
- MUST update summary counts
- MUST update tracking document

### On Agent Failure
- MUST set agent status to `failed`
- MUST record end time
- MUST record error message
- MUST update summary counts
- MUST update tracking document

### Completion Detection
- MUST check summary counts after each update
- MUST proceed when `pending == 0` and `failed == 0`
- MUST decide on retry when `failed > 0`
- MUST abort when `completed == 0`

### Tracking Storage
- MUST write tracking to `.opencode/tracking/`
- MUST name files: `{dispatchId}.json`
- MUST include all required fields
- MUST validate JSON format

### Tracking Retention
- Keep tracking documents for 30 days
- Aggregate into daily summaries
- Archive old tracking to cold storage

### Validation
- Every dispatch MUST have tracking document
- Every status change MUST update tracking
- Every tracking document MUST be valid JSON
- Every tracking document MUST be written to storage

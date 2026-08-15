# Trace Capture Rules

## Mandatory Trace Logging

### Critical Phases (Must Trace)
- `build` phase — all agent executions
- `harden` phase — all security scans
- `ship` phase — all deployment steps

### Trace Requirements

#### Phase Level
- MUST generate traceId at phase start
- MUST create root span for phase
- MUST record phase start/end times
- MUST record phase status

#### Agent Level
- MUST create child span for each agent execution
- MUST record agent name and task
- MUST record agent start/end times
- MUST record agent status

#### Tool Level
- MUST create child span for each tool call
- MUST record tool name and input
- MUST record tool output summary
- MUST record tool start/end times
- MUST record tool status

### Trace Storage
- MUST write traces to `.opencode/traces/`
- MUST name files: `{traceId}.json`
- MUST include all required fields
- MUST validate JSON format

### Trace Retention
- Keep individual traces for 30 days
- Aggregate into daily summaries
- Archive old traces to cold storage

### Validation
- Every trace MUST have unique traceId
- Every span MUST have unique spanId
- Every span MUST have parentSpanId (except root)
- Every trace MUST be valid JSON
- Every trace MUST be written to storage

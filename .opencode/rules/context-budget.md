# Context Budget Rules

## Mandatory Context Management

### Token Monitoring
- MUST track token usage per agent
- MUST track token usage per phase
- MUST log when warning threshold reached
- MUST log when max threshold reached

### When Warning Threshold Reached
- MUST summarize older context
- MUST remove redundant information
- MUST compress verbose outputs
- MUST keep essential decisions and outputs

### When Max Threshold Reached
- MUST force compaction
- MUST keep only:
  - Current task context
  - Essential outputs
  - Critical decisions
- MUST archive rest to `.opencode/context-archives/`

### Context Archive Requirements
- MUST write archive to `.opencode/context-archives/`
- MUST name files: `{phase}-{agent}-{timestamp}.json`
- MUST include all required fields
- MUST validate JSON format

### Context Restoration
- When resuming work, MUST read relevant archive
- MUST restore essential outputs first
- MUST restore critical decisions second
- MUST restore current task context last

### Validation
- MUST NOT exceed max token limit
- MUST log all compaction events
- MUST preserve all essential outputs
- MUST preserve all critical decisions
- Archives MUST be valid JSON

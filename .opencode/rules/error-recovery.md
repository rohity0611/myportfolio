# Error Recovery Rules

## Mandatory Error Handling

Every agent MUST handle errors according to these rules:

### Transient Errors
- MUST retry up to 3 times
- MUST use exponential backoff (1s, 2s, 4s)
- MUST log each retry attempt
- MUST fallback after 3 failed attempts

### Permanent Errors
- MUST log error details
- MUST attempt alternative approach
- MUST mark task as blocked if no alternative
- MUST continue with next task

### Critical Errors
- MUST stop immediately
- MUST log critical error
- MUST notify user
- MUST NOT retry

### Error Logging Format
```json
{
  "timestamp": "ISO-8601",
  "agent": "agent-name",
  "task": "task-description",
  "error": {
    "category": "transient|permanent|critical",
    "message": "description",
    "tool": "tool-name",
    "stack": "stack trace if available"
  },
  "action": "retry|fallback|abort",
  "attempt": 1
}
```

### Error Storage
- Store error logs in `.opencode/errors/`
- Name files: `{agent-name}-{timestamp}.json`
- Keep last 100 errors per agent
- Aggregate into daily error summaries

### Validation
- Every error MUST be logged
- Every retry MUST be logged
- Every fallback MUST be logged
- Critical errors MUST halt execution
- Error logs MUST be preserved for debugging

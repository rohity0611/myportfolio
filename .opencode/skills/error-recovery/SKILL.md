---
name: error-recovery
description: "Use when handling errors to apply structured retry and fallback protocols"
risk: low
source: factory
date_added: "2026-07-22"
---

# Error Recovery Skill

Provide structured error recovery protocols for all agents.

## When to Use
- Tool execution fails
- Subagent returns error
- Validation fails
- Network or resource unavailable
- Any transient or permanent error

## Error Categories

### 1. Transient Errors (Retry)
- Network timeouts
- Rate limiting
- Temporary resource unavailability
- Tool execution timeout

**Protocol:**
1. Wait 2^attempt seconds (exponential backoff)
2. Retry up to 3 times
3. If still failing, escalate to fallback

### 2. Permanent Errors (Fallback)
- Invalid input
- Missing dependencies
- Schema validation failure
- Tool not available

**Protocol:**
1. Log error details
2. Attempt alternative approach
3. If no alternative, mark as blocked
4. Continue with next task

### 3. Critical Errors (Abort)
- Security violation
- Data corruption
- Resource exhaustion
- Permission denied

**Protocol:**
1. Stop immediately
2. Log critical error
3. Notify user
4. Do not retry

## Error Response Format

```json
{
  "error": {
    "category": "transient|permanent|critical",
    "message": "description",
    "tool": "tool-name",
    "attempt": 1,
    "maxAttempts": 3,
    "fallback": "alternative approach",
    "timestamp": "ISO-8601"
  }
}
```

## Retry Protocol

```
attempt 1: wait 1s, retry
attempt 2: wait 2s, retry
attempt 3: wait 4s, fallback
```

## Fallback Protocol

1. Check for alternative tool/approach
2. If available, use alternative
3. If not available, mark task as blocked
4. Continue with next task in queue

## Error Logging

Every error MUST be logged with:
- Timestamp
- Agent name
- Task description
- Error category and message
- Tool that failed
- Attempt number
- Action taken (retry/fallback/abort)

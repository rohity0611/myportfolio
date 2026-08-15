# Agent Conversation Rules

## Overview

Multi-turn conversations between agents using `conversation_id` for context persistence.

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| Max turns | 5 | Maximum turns per conversation |
| Timeout | 1 hour | Conversation expires after this |
| Storage | `.opencode/shared-state/conversations/` | Conversation history location |

## Rules

### When to use conversation_id

- Task requires multiple rounds of review/refinement
- Context from previous exchanges is needed
- Iteration is expected (code review, security hardening, etc.)

### When NOT to use conversation_id

- Simple, single-turn tasks
- Tasks that don't benefit from history
- When you want a fresh context (no history injection)

### Self-limiting

- Conclude early if result is satisfactory
- Don't iterate for simple tasks
- Escalate to user if stuck after 3 turns

### Safety net (plugin enforced)

- Plugin rejects task calls if max turns exceeded
- Error message: "Conversation exceeded max turns. Start a new conversation."
- To continue, use a NEW conversation_id

## Storage format

```json
{
  "id": "conversation-id",
  "turns": [
    {
      "from": "agent-a",
      "to": "agent-b",
      "prompt": "original prompt",
      "response": "agent response",
      "timestamp": "2026-07-22T12:00:00Z"
    }
  ],
  "created": "2026-07-22T12:00:00Z",
  "max_turns": 5
}
```

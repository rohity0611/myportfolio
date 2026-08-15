---
name: agent-conversation
description: Enable multi-turn conversations between agents using conversation_id for context persistence
---

# Agent Conversation Skill

## What I do

Enable multi-turn conversations between agents by using `conversation_id` in task dispatches. The plugin stores conversation history and injects it into follow-up calls.

## When to use me

Use this when:
- A task requires multiple rounds of review/refinement
- You need to iterate with a specialist agent
- One turn isn't sufficient to complete the work
- You need context from previous exchanges

## How to use

### Starting a conversation

```
task({
  agent: "security-reviewer",
  prompt: "Review this code for vulnerabilities",
  conversation_id: "sec-review-1"
})
```

### Continuing a conversation

Use the SAME `conversation_id` for follow-up turns:

```
task({
  agent: "security-reviewer",
  prompt: "Fix the SQL injection vulnerability you found",
  conversation_id: "sec-review-1"
})
```

### Ending a conversation

Simply DON'T use `conversation_id` for the next task — it starts a new conversation.

## Self-limiting rules

- Default max turns: 5 (plugin enforces as safety net)
- Conclude early if result is satisfactory
- Don't iterate for simple tasks — use single turn
- Escalate to user if stuck after 3 turns

## Examples

### Code review iteration
```
Turn 1: "Review this function" → Found 2 issues
Turn 2: "Fix issue #1" → Fixed
Turn 3: "Re-review, issue #1 fixed" → Looks good, issue #2 remains
Turn 4: "Fix issue #2" → Fixed
Turn 5: "Final review" → All clear
```

### Security hardening
```
Turn 1: "Scan for vulnerabilities" → Found 3 issues
Turn 2: "Fix critical issues only" → Fixed 1 critical
Turn 3: "Fix high-severity issues" → Fixed 2 high
Turn 4: "Verify all fixes" → Confirmed
```

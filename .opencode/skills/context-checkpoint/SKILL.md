---
name: context-checkpoint
description: "Use when saving and restoring context during long-running phases"
risk: low
source: factory
date_added: "2026-07-22"
---

# Context Checkpoint Skill

Save and restore context during long-running phases.

## When to Use
- During long-running phases
- Before complex operations
- Before parallel dispatch
- When resuming after interruption
- When token usage is high

## Checkpoint Format

```json
{
  "checkpointId": "unique-checkpoint-id",
  "phase": "phase-name",
  "agent": "agent-name",
  "timestamp": "ISO-8601",
  "context": {
    "currentTask": "current task description",
    "completedTasks": ["task1", "task2"],
    "pendingTasks": ["task3", "task4"],
    "keyDecisions": [
      {
        "decision": "decision description",
        "rationale": "rationale"
      }
    ],
    "outputs": {
      "output1": "output1 path"
    },
    "blockers": ["blocker1"]
  },
  "metadata": {
    "tokenUsage": 50000,
    "elapsedTime": "PT1H30M",
    "checkpointNumber": 3
  }
}
```

## When to Checkpoint

### Automatic Checkpoints
1. After every 10 tool calls
2. After every 30 minutes
3. When token usage exceeds 50%
4. Before phase transition

### Manual Checkpoints
1. Before complex operation
2. Before parallel dispatch
3. Before risky operation
4. When user requests

## Checkpoint Creation

### 1. Capture Current State
- Current task
- Completed tasks
- Pending tasks
- Key decisions
- Outputs
- Blockers

### 2. Save Checkpoint
- Write to `.opencode/checkpoints/`
- Name: `{phase}-{agent}-{checkpointNumber}.json`
- Include metadata

### 3. Update Tracking
- Update checkpoint list
- Record checkpoint number
- Update last checkpoint time

## Checkpoint Restoration

### 1. Find Latest Checkpoint
- Search `.opencode/checkpoints/`
- Find latest for current phase/agent
- Validate checkpoint integrity

### 2. Restore Context
- Restore current task
- Restore completed tasks
- Restore pending tasks
- Restore key decisions
- Restore outputs
- Restore blockers

### 3. Continue Execution
- Resume from checkpoint
- Verify context consistency
- Continue with next task

## Usage

When context is large or phase is long:
1. Create checkpoints regularly
2. Save all relevant context
3. When resuming, find latest checkpoint
4. Restore context
5. Continue execution

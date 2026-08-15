---
name: parallel-tracking
description: "Use when dispatching parallel subagents to track their status"
risk: low
source: factory
date_added: "2026-07-22"
---

# Parallel Tracking Skill

Track status of parallel subagent executions.

## When to Use
- Dispatching multiple agents in parallel
- Monitoring parallel execution
- Collecting results from parallel agents
- Handling parallel failures

## Tracking Format

```json
{
  "dispatchId": "unique-dispatch-id",
  "timestamp": "ISO-8601",
  "totalAgents": 5,
  "agents": [
    {
      "agentId": "unique-agent-id",
      "agentType": "agent-type",
      "task": "task-description",
      "status": "pending|running|completed|failed|cancelled",
      "startTime": "ISO-8601",
      "endTime": "ISO-8601",
      "duration": "elapsed milliseconds",
      "output": "output summary if completed",
      "error": "error message if failed"
    }
  ],
  "summary": {
    "completed": 3,
    "failed": 1,
    "cancelled": 0,
    "pending": 1
  }
}
```

## Status Updates

### On Dispatch
1. Create tracking document
2. Set all agents to `pending`
3. Write to `.opencode/tracking/{dispatchId}.json`

### On Agent Start
1. Set agent status to `running`
2. Record start time
3. Update tracking document

### On Agent Completion
1. Set agent status to `completed`
2. Record end time
3. Record output summary
4. Update summary counts
5. Update tracking document

### On Agent Failure
1. Set agent status to `failed`
2. Record end time
3. Record error message
4. Update summary counts
5. Update tracking document

## Completion Detection

### All Complete
- When `summary.pending == 0` and `summary.failed == 0`
- Phase can proceed to next step

### Some Failed
- When `summary.failed > 0`
- Decide: retry failed agents or continue with partial results

### All Failed
- When `summary.completed == 0`
- Abort phase and report error

## Usage

When dispatching parallel agents:
1. Create tracking document
2. Dispatch all agents
3. Monitor status updates
4. Wait for completion
5. Collect and merge results

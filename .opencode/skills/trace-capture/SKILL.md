---
name: trace-capture
description: "Use when executing critical phases to capture execution traces for observability"
risk: low
source: factory
date_added: "2026-07-22"
---

# Trace Capture Skill

Capture execution traces for observability and debugging.

## When to Use
- During build phase execution
- During harden phase execution
- During ship phase execution
- When debugging agent execution
- When analyzing performance

## Trace Format

Every trace span MUST include:

```json
{
  "traceId": "unique-trace-id",
  "spanId": "unique-span-id",
  "parentSpanId": "parent-span-id if applicable",
  "operation": "operation-name",
  "agent": "agent-name",
  "task": "task-description",
  "startTime": "ISO-8601",
  "endTime": "ISO-8601",
  "duration": "elapsed milliseconds",
  "status": "success|error|cancelled",
  "attributes": {
    "tool": "tool-name",
    "input": "input summary",
    "output": "output summary"
  },
  "events": [
    {
      "name": "event-name",
      "timestamp": "ISO-8601",
      "attributes": {}
    }
  ]
}
```

## Trace Levels

### Level 1: Phase Traces
- One trace per phase execution
- Includes all subagent traces as children

### Level 2: Agent Traces
- One trace per agent execution
- Includes all tool calls as children

### Level 3: Tool Traces
- One trace per tool call
- Includes input/output details

## Trace Storage
- Store traces in `.opencode/traces/`
- Name files: `{traceId}.json`
- Keep traces for 30 days
- Aggregate into daily summaries

## Protocol

### On Phase Start
1. Generate traceId
2. Create root span for phase
3. Record phase start time

### On Agent Dispatch
1. Create child span for agent
2. Record agent name and task
3. Record agent start time

### On Tool Call
1. Create child span for tool
2. Record tool name and input
3. Record tool start time

### On Completion
1. Record end time
2. Record status
3. Write trace to storage

---
name: dynamic-dispatch
description: "Use when encountering complex tasks that require spawning additional agents"
risk: medium
source: factory
date_added: "2026-07-22"
---

# Dynamic Dispatch Skill

Spawn agents mid-execution based on findings.

## When to Use
- Large codebase detected (>10 files)
- Complex task requiring multiple expertise areas
- Security-sensitive code discovered
- Performance-critical code discovered
- Cross-cutting concerns identified

## Dispatch Decision Tree

```
Task received
  ├── Is task complex? → Dispatch parallel agents
  ├── Is codebase large? → Dispatch explore agents
  ├── Is code security-sensitive? → Dispatch security agents
  ├── Is code performance-critical? → Dispatch performance agents
  └── Is task simple? → Execute directly
```

## Dispatch Protocol

### 1. Analyze Task
- Parse task requirements
- Identify subtasks
- Determine agent types needed
- Estimate complexity

### 2. Create Dispatch Plan
```json
{
  "dispatchId": "unique-dispatch-id",
  "parentAgent": "parent-agent-name",
  "timestamp": "ISO-8601",
  "subtasks": [
    {
      "subtask": "subtask-description",
      "agentType": "agent-type",
      "priority": "high|medium|low",
      "dependencies": []
    }
  ]
}
```

### 3. Dispatch Agents
- Use `task` tool to dispatch each subtask
- Set appropriate `subagent_type`
- Provide clear task description
- Include relevant context

### 4. Collect Results
- Monitor agent completion
- Collect outputs
- Validate outputs
- Merge results

### 5. Continue Execution
- Use merged results to continue
- Handle any failures
- Update tracking

## Usage

When encountering complex tasks:
1. Analyze task complexity
2. If complex, create dispatch plan
3. Dispatch agents in parallel
4. Collect and merge results
5. Continue with merged context

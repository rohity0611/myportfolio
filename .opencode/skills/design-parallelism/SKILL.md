---
name: design-parallelism
description: "Use when executing parallel tasks in design and planning phases"
risk: low
source: factory
date_added: "2026-07-22"
---

# Design Parallelism Skill

Enable parallel execution in design and planning phases.

## When to Use
- Multiple independent tasks in design phase
- Parallel agent dispatch for planning
- Concurrent exploration of alternatives
- Simultaneous validation of options

## Parallelism Levels

### Level 1: Task Parallelism
- Execute independent tasks in parallel
- No dependencies between tasks
- Merge results after completion

### Level 2: Agent Parallelism
- Dispatch multiple agents in parallel
- Each agent handles different aspect
- Merge results after completion

### Level 3: Phase Parallelism
- Execute independent phases in parallel
- No dependencies between phases
- Merge results after completion

## Dispatch Protocol

### 1. Analyze Dependencies
- Identify task dependencies
- Identify agent dependencies
- Identify phase dependencies
- Group independent items

### 2. Create Parallel Plan
```json
{
  "parallelId": "unique-parallel-id",
  "level": "task|agent|phase",
  "groups": [
    {
      "groupId": "group-1",
      "items": [
        {
          "item": "item-description",
          "agentType": "agent-type",
          "dependencies": []
        }
      ]
    }
  ]
}
```

### 3. Dispatch Parallel
- Dispatch all items in group simultaneously
- Monitor completion
- Handle failures
- Collect results

### 4. Merge Results
- Combine results from all items
- Resolve conflicts
- Validate merged output
- Continue execution

## Merge Strategies

### Simple Merge
- Combine all outputs
- No conflict resolution
- Use when outputs are independent

### Priority Merge
- Use priority to resolve conflicts
- Higher priority wins
- Use when outputs may conflict

### Consensus Merge
- Require agreement across outputs
- Majority wins
- Use when correctness is critical

## Error Handling

### Partial Failure
- Continue with successful outputs
- Retry failed outputs
- Report partial results

### Complete Failure
- Abort parallel execution
- Report error
- Resume with sequential execution

## Usage

When executing parallel tasks:
1. Analyze dependencies
2. Group independent items
3. Dispatch parallel
4. Monitor completion
5. Merge results
6. Continue execution

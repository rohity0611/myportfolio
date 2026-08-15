---
name: hierarchical-dispatch
description: "Use when dispatching child agents with scoped context and aggregating results"
risk: medium
source: factory
date_added: "2026-07-22"
---

# Hierarchical Dispatch Skill

Dispatch child agents with scoped context and aggregate results.

## When to Use
- Task requires multiple specialized agents
- Task has independent components
- Task requires parallel execution
- Task has hierarchical structure

## Dispatch Protocol

### 1. Analyze Task
- Identify subtasks
- Map dependencies
- Determine agent types needed

### 2. Create Context Files
For each child agent, create a context file:
```json
{
  "taskId": "unique-task-id",
  "subtask": "subtask description",
  "scope": "what this agent should focus on",
  "inputs": ["input-1", "input-2"],
  "outputs": ["expected-output-1", "expected-output-2"],
  "constraints": ["constraint-1", "constraint-2"]
}
```

### 3. Dispatch Children
- Use `task` tool for each child
- Provide context file path
- Set appropriate agent type
- Dispatch independent children in parallel

### 4. Monitor Children
- Track completion status
- Handle failures
- Retry if appropriate

### 5. Aggregate Results
- Read each child's output
- Merge results
- Resolve conflicts
- Produce final output

## Context Scoping

### What to Include
- Task description
- Relevant inputs
- Expected outputs
- Constraints
- Dependencies

### What to Exclude
- Other agents' tasks
- Unrelated context
- Sensitive information
- Implementation details

## Result Aggregation

### Simple Merge
- Combine all outputs
- No conflicts expected
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

### Child Failure
- Log failure details
- Decide: retry or continue
- Record in shared state

### Partial Failure
- Continue with successful outputs
- Retry failed children
- Report partial results

### Complete Failure
- Abort dispatch
- Report error
- Resume with sequential execution

## Usage

When dispatching hierarchical tasks:
1. Analyze task structure
2. Create context files for each child
3. Dispatch children in parallel
4. Monitor completion
5. Aggregate results
6. Produce final output

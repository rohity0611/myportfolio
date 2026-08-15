---
name: task-decomposition
description: "Use when breaking down complex tasks into subtasks"
risk: medium
source: factory
date_added: "2026-07-22"
---

# Task Decomposition Skill

Break down complex tasks into manageable subtasks.

## When to Use
- Task is too complex for a single agent
- Task requires multiple expertise areas
- Task has independent components
- Task requires parallel execution

## Decomposition Protocol

### 1. Analyze Task Complexity
- Is the task larger than one agent can handle?
- Does it require multiple specialties?
- Are there independent components?
- Can parts be done in parallel?

### 2. Identify Subtask Boundaries
- Where does one concern end and another begin?
- What are the natural seams in the problem?
- What can be done independently?

### 3. Map Dependencies
- Which subtasks depend on others?
- Which subtasks can run in parallel?
- What is the critical path?

### 4. Map to Agents
- Which agent type is best for each subtask?
- Are there conflicts between agents?
- What context does each agent need?

### 5. Create Dispatch Plan
```json
{
  "taskId": "unique-task-id",
  "subtasks": [
    {
      "id": "subtask-1",
      "description": "subtask description",
      "agentType": "agent-name",
      "context": "relevant context",
      "dependencies": [],
      "priority": "high|medium|low",
      "estimatedEffort": "small|medium|large"
    }
  ]
}
```

## Decomposition Patterns

### By Concern
- Frontend vs Backend
- Data vs Logic
- Security vs Functionality

### By Expertise
- Code standards
- Security
- Performance
- Testing

### By Phase
- Analysis
- Implementation
- Validation

### By Risk
- High-risk components first
- Independent components in parallel
- Dependent components sequentially

## Usage

When encountering complex tasks:
1. Analyze task complexity
2. Identify subtask boundaries
3. Map dependencies
4. Map to agents
5. Create dispatch plan
6. Execute plan

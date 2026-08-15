---
name: orchestrate
description: "Entry point for complex tasks requiring decomposition and parallel agent dispatch"
---

# Orchestrate

Entry point for complex tasks requiring decomposition and parallel agent dispatch.

## Usage

```
/orchestrate <task description>
```

## What It Does

1. Analyzes the task
2. Decomposes into subtasks
3. Dispatches specialist agents in parallel
4. Collects and synthesizes results

## When to Use

- Task is too complex for a single agent
- Task requires multiple expertise areas
- Task has independent components
- You want parallel execution for speed

## Example

```
/orchestrate Implement user authentication with JWT tokens, including API endpoints, middleware, and tests
```

This will:
1. Decompose into: API endpoints, middleware, tests
2. Dispatch: backend-engineer, security-reviewer, test-writer
3. Collect results from all three
4. Synthesize into final implementation

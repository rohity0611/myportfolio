---
name: generate-registry
description: "Generate the agent registry from agent definition files"
---

# Generate Registry

Generate the agent registry from agent definition files.

## Usage

```
/generate-registry
```

## What It Does

1. Reads all agent files from `.opencode/agents/`
2. Parses YAML frontmatter for capabilities
3. Generates `.opencode/schemas/agent-registry.json`

## Output

A machine-readable registry that can be queried by the orchestrator to find the best agent for a task.

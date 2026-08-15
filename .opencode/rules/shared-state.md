# Shared State Rules

## Purpose
Enable cross-agent coordination through shared state files. Prevents duplicate work, conflicting changes, and missed dependencies.

## Before Starting Work

### 1. Read Shared State
```
Read .opencode/shared-state/findings.json
Read .opencode/shared-state/decisions.json
Read .opencode/shared-state/files-modified.json
Read .opencode/shared-state/blockers.json
```

### 2. Check for Conflicts
- If your planned changes overlap with `files-modified.json`, coordinate with the other agent
- If a blocker affects your work, address it before proceeding
- If a finding is relevant to your task, incorporate it

### 3. Plan Your Work
- Note which files you will modify
- Note any findings you will generate
- Note any decisions you will make
- Note any blockers you encounter

## During Work

### 4. Record Changes in Real-Time
- When you modify a file, record it immediately
- When you make a finding, record it immediately
- When you make a decision, record it immediately
- When you encounter a blocker, record it immediately

## After Completing Work

### 5. Update Shared State
- Write all findings to `.opencode/shared-state/findings.json`
- Write all decisions to `.opencode/shared-state/decisions.json`
- Write all file modifications to `.opencode/shared-state/files-modified.json`
- Write all blockers to `.opencode/shared-state/blockers.json`

## Shared State Format

### findings.json
```json
[
  {
    "agent": "agent-name",
    "timestamp": "ISO-8601",
    "finding": "description",
    "severity": "low|medium|high|critical"
  }
]
```

### decisions.json
```json
[
  {
    "agent": "agent-name",
    "timestamp": "ISO-8601",
    "decision": "description",
    "rationale": "why"
  }
]
```

### files-modified.json
```json
[
  {
    "agent": "agent-name",
    "timestamp": "ISO-8601",
    "file": "file-path",
    "action": "create|edit|delete"
  }
]
```

### blockers.json
```json
[
  {
    "agent": "agent-name",
    "timestamp": "ISO-8601",
    "blocker": "description",
    "status": "open|resolved|escalated"
  }
]
```

## Conflict Resolution

When two agents need to modify the same file:
1. Check `files-modified.json` for the file
2. Read the other agent's changes
3. Coordinate to avoid conflicts
4. If conflict unavoidable, escalate to orchestrator

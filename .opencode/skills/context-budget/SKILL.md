---
name: context-budget
description: "Use when managing context window usage to prevent overflow"
risk: low
source: factory
date_added: "2026-07-22"
---

# Context Budget Skill

Manage context window usage to prevent overflow.

## When to Use
- Context usage approaches limits
- Token count exceeds warning threshold
- Before complex operations
- When resuming long-running phases

## Budget Limits

### By Agent Type
| Agent Type | Max Tokens | Warning Threshold | Action |
|------------|-----------|-------------------|--------|
| Primary (build/plan) | 100,000 | 80,000 | Compact |
| Subagent (general) | 50,000 | 40,000 | Summarize |
| Subagent (explore) | 30,000 | 24,000 | Truncate |
| Subagent (scout) | 30,000 | 24,000 | Truncate |

### By Phase
| Phase | Max Tokens | Warning Threshold | Action |
|-------|-----------|-------------------|--------|
| plan-brief | 20,000 | 16,000 | Summarize |
| slice | 30,000 | 24,000 | Compact |
| plan-slice | 40,000 | 32,000 | Compact |
| build | 80,000 | 64,000 | Compact |
| harden | 60,000 | 48,000 | Compact |
| ship | 40,000 | 32,000 | Summarize |
| discovery | 50,000 | 40,000 | Compact |

## Budget Management Protocol

### When Warning Threshold Reached
1. Summarize older context
2. Remove redundant information
3. Compress verbose outputs
4. Keep essential decisions and outputs

### When Max Threshold Reached
1. Force compaction
2. Keep only:
   - Current task context
   - Essential outputs
   - Critical decisions
3. Archive rest to `.opencode/context-archives/`

## Context Archive Format

```json
{
  "phase": "phase-name",
  "agent": "agent-name",
  "timestamp": "ISO-8601",
  "archivedContext": "compressed context",
  "essentialOutputs": [],
  "criticalDecisions": []
}
```

## Usage

When context usage approaches limits:
1. Check current token count
2. If warning threshold, summarize
3. If max threshold, force compaction
4. Archive compressed context
5. Continue with essential context only

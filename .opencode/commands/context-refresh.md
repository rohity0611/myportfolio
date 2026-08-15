# /context-refresh — Refresh Context Artifacts

Refreshes Graphify report, CodeGraph index, and context state.

## What This Does

1. Checks if refresh is needed (early exit if everything is current)
2. Refreshes Graphify graph report if available
3. Updates CodeGraph code index if available
4. Updates `.gitignore` with ignore patterns if missing
5. Updates `.opencode/metrics/context-state.json`
6. Reports what was refreshed

## When to Run

- After `/build` completes a slice
- After `/design-build` completes a slice
- After `/design-verify` modifies code
- Before `/harden` dispatches agents
- When context feels stale or search results are outdated
- After significant code changes

## Steps

### 0. Check If Refresh Needed (Early Exit)

Before doing any work, check:

1. Read `.opencode/metrics/context-state.json`
2. Check `last_refresh` timestamp
3. If last refresh was < 10 minutes ago AND no code changes since:
   - Output: "Context is current. No refresh needed."
   - STOP — skip unnecessary work

### 1. Refresh Graphify

If `.graphify/` directory exists, run `graphify update .` to regenerate the report.

### 2. Update CodeGraph Index

Check if `codegraph` CLI is available by running `codegraph --version`.

If available, run `codegraph index` to update the code index.

If CodeGraph API is running via MCP, the index updates automatically.

### 3. Update .gitignore

Check if `.gitignore` exists in the project root.

Ensure these ignore patterns are present:

```
# Local Graphify outputs
.graphify/
.graphify_*
graphify-out/
**/graphify-out/

# Local code intelligence indexes
.codegraph/
```

If `.gitignore` exists but is missing patterns, append them.
If `.gitignore` does not exist, create it with these lines.

### 4. Update Context State

Read current `.opencode/metrics/context-state.json`, update `last_refresh` timestamp, and refresh `graphify.last_updated` and `codegraph.last_indexed` with current timestamps. Write back.

### 5. Report

Show what was refreshed:
```
Context Refresh Complete
━━━━━━━━━━━━━━━━━━━━━━━

Graphify:    ✅ Report refreshed
CodeGraph:   ✅ Index updated
State:       ✅ Updated
```

If a tool is not available, show ⚠️ with installation instructions.

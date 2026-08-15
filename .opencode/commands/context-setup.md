# /context-setup — One-Command Context Library Setup

Sets up the context library: Graphify, CodeGraph, gh_grep, and Claude-Mem.

## When to Run

- **After Phase 1 (`/plan-brief`) completes** — you understand the codebase and can verify indexes
- **First time setting up a project** — if no context tools are configured
- **When tools are missing/broken** — repair configuration

Do NOT run every session. Use `/context-refresh` after code changes.

## What This Does

1. Checks prerequisites (codegraph CLI, graphify CLI, gh_grep, claude-mem)
2. Installs missing tools if possible
3. Creates dynamic MCP wrapper scripts (no hardcoded paths)
4. Configures MCP servers in `opencode.json` using wrapper scripts
5. Sets up Claude-Mem worker and plugin (if not already configured)
6. Generates initial Graphify report
7. Generates CodeGraph index
8. Updates `.gitignore` with ignore patterns
9. Generates initial context state
10. Runs `/context-doctor` to verify
11. Tells user to restart the OpenCode session so MCP servers reconnect

## Reference Guide

For claude-mem setup details, read `.opencode/guides/claude-mem-setup.md`.

## Steps

### 0. Check If Already Setup (Early Exit)

Before doing anything, check if context is already configured:

1. Read `.opencode/metrics/context-state.json`
2. If it exists AND all tools show `available: true`:
   - Output: "Context already configured. Use /context-refresh if needed."
   - STOP — do not re-run setup
3. If file doesn't exist or tools are missing, proceed with setup

### 1. Check Prerequisites

Check these tools in the environment:

```
codegraph --version
graphify --version
node --version  # Requires 20+
```

**If codegraph is not found:**
```
npm install -g @colbymchenry/codegraph
```

**If graphify is not found:**
```
npm install -g @sentropic/graphify
```

### 2. Setup Claude-Mem (Skip if Already Configured)

Check if claude-mem is already configured:

1. Check if `~/.claude-mem/settings.json` exists
2. Check if `~/.claude/plugins/marketplaces/thedotmack` exists
3. Check if worker is running: `curl -s http://127.0.0.1:37801/api/health`

**If all checks pass:** Skip to Step 3 (Claude-Mem already configured)

**If not configured:** Dispatch subagent to set up claude-mem:

```
task(subagent_type: "executor", description: "Install and configure claude-mem", prompt: "Read .opencode/guides/claude-mem-setup.md and set up claude-mem following the 7-step guide. Steps: (1) Check prerequisites, (2) Run npx claude-mem install --ide opencode, (3) Configure settings.json with openrouter provider, (4) Add plugin to opencode.json, (5) Start worker with cmem-up.cmd, (6) Test health, (7) Report status.")
```

The subagent will:
1. Run `npx claude-mem install --ide opencode` if not already installed
2. Verify settings.json is configured with openrouter provider
3. Verify plugin is in opencode.json
4. Start worker: `~/.claude-mem/cmem-up.cmd`
5. Test health: `curl http://127.0.0.1:37801/api/health`
6. Report status back

### 3. Create MCP Wrapper Scripts

OpenCode does NOT inherit your shell PATH when spawning MCP servers. We use platform-native wrapper scripts that resolve binary paths at runtime.

Wrapper scripts are pre-bundled in `.opencode/scripts/`:
- `codegraph-mcp.cmd` (Windows)
- `codegraph-mcp.sh` (macOS/Linux)

These wrappers:
- Search common install locations (`~/.local/bin/`, npm global, etc.)
- Fall back to PATH search
- Execute the binary directly — no `node` or other runtime needed

### 3. Configure MCP in opencode.json

Detect the platform and write the correct command to `.opencode/opencode.json`:

**Windows:**
```json
{
  "mcp": {
    "codegraph": {
      "type": "local",
      "command": [".opencode/scripts/codegraph-mcp.cmd"],
      "enabled": true
    },
    "gh_grep": {
      "type": "remote",
      "url": "https://mcp.grep.app",
      "timeout": 30000,
      "enabled": true
    }
  }
}
```

**macOS/Linux:**
```json
{
  "mcp": {
    "codegraph": {
      "type": "local",
      "command": [".opencode/scripts/codegraph-mcp.sh"],
      "enabled": true
    },
    "gh_grep": {
      "type": "remote",
      "url": "https://mcp.grep.app",
      "timeout": 30000,
      "enabled": true
    }
  }
}
```

### 4. Generate Graphify Report

Check if `.graphify/GRAPH_REPORT.md` exists in the project root.

**If report does NOT exist, generate it:**
- Run `graphify update .` to generate a code-only graph
- This produces `.graphify/GRAPH_REPORT.md` and `.graphify/graph.json`
- If graphify CLI is not available, note it as degraded in context state

**If report exists:**
- Note it as available in the context state

### 5. Generate CodeGraph Index

Check if `codegraph` CLI is available by running `codegraph --version`.

**If CodeGraph CLI is available:**
- Run `codegraph init -i` to initialize the project index
- This creates `.codegraph/` directory with the project index

**If CodeGraph CLI is not available:**
- Note it as degraded in the context state

### 6. Update .gitignore

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

### 7. Generate Context State

Create `.opencode/metrics/context-state.json` with:
```json
{
  "version": "1.0.0",
  "last_refresh": "<current ISO timestamp>",
  "graphify": { "available": <true if report exists>, "report_path": ".graphify/GRAPH_REPORT.md" },
  "codegraph": { "available": <true if CLI installed>, "mcp_configured": true },
  "claude_mem": { "available": <true if worker running>, "port": 37801 },
  "mcp": { "configured": ["codegraph", "gh_grep"] },
  "warnings": [],
  "next_required_action": "Restart OpenCode session to connect MCP servers"
}
```

### 8. Run Context Doctor

After setup completes, run `/context-doctor` to show the current state.

### 9. Tell User to Restart Session

MCP servers only connect when OpenCode starts. After setup:

```
Setup complete! To connect the MCP servers, please restart this OpenCode session.

Run: opencode --resume <current-session-id>

Or start a new session with: opencode
```

## Error Handling

- If codegraph is not installed, note it as degraded and provide installation instructions
- If graphify fails with "non-code corpus files" error, run `graphify update .` instead
- If MCP config cannot be written, show the config snippet and ask the user to add it manually

# /context-doctor — Diagnose and Fix Context Issues

Diagnoses common context library problems and provides fix instructions. Helps users stuck on dependency installation.

## What This Checks

1. CodeGraph CLI installed and on PATH
2. Graphify CLI installed and on PATH
3. MCP configuration in `opencode.json`
4. Claude-Mem worker and plugin status
5. Graphify report existence
6. Context state file integrity
7. Wrapper scripts existence

## Reference Guide

For claude-mem setup details, read `.opencode/guides/claude-mem-setup.md`.

## Steps

### 1. Check CodeGraph CLI

Run `codegraph --version`.

**If not found:**
```
Installing CodeGraph...

npm install -g @colbymchenry/codegraph

If installation fails, try:
1. Run as administrator (Windows) or use sudo (macOS/Linux)
2. Check Node.js version: node --version (requires 20+)
3. Clear npm cache: npm cache clean --force
4. Try alternative install: yarn global add @colbymchenry/codegraph
```

### 2. Check Graphify CLI

Run `graphify --version`.

**If not found:**
```
Installing Graphify...

npm install -g @sentropic/graphify

If installation fails, try:
1. Run as administrator (Windows) or use sudo (macOS/Linux)
2. Check Node.js version: node --version (requires 20+)
3. Clear npm cache: npm cache clean --force
```

### 3. Check Claude-Mem Status

Check if claude-mem is properly configured:

1. Check if `~/.claude-mem/settings.json` exists
2. Check if `~/.claude/plugins/marketplaces/thedotmack` exists
3. Check if worker is running: `curl -s http://127.0.0.1:37801/api/health`

**If settings.json not found:**
```
Claude-Mem not configured. Dispatching setup subagent...

task(subagent_type: "executor", description: "Install and configure claude-mem", prompt: "Read .opencode/guides/claude-mem-setup.md and set up claude-mem following the 7-step guide. Steps: (1) Check prerequisites, (2) Run npx claude-mem install --ide opencode, (3) Configure settings.json with openrouter provider, (4) Add plugin to opencode.json, (5) Start worker with cmem-up.cmd, (6) Test health, (7) Report status.")
```

**If plugin not found:**
```
Claude-Mem plugin not installed. Run:

npx claude-mem install --ide opencode
```

**If worker not running:**
```
Starting Claude-Mem worker...

~/.claude-mem/cmem-up.cmd
```

**If health check fails:**
```
Worker started but health check failed. Check:

1. Port 37801 is not in use: netstat -ano | findstr :37801
2. Settings.json has correct port: cat ~/.claude-mem/settings.json
3. Worker logs: cat ~/.claude-mem/worker-stderr.log
```

### 4. Check MCP Configuration

Read `.opencode/opencode.json` and verify:
- `codegraph` MCP entry exists with `type: "local"` and command using wrapper script (`.opencode/scripts/codegraph-mcp.cmd` or `.sh`)

**If missing:** Show the config snippet to add.

**Windows:**
```json
{
  "mcp": {
    "codegraph": {
      "type": "local",
      "command": [".opencode/scripts/codegraph-mcp.cmd"],
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
    }
  }
}
```

### 5. Check Wrapper Scripts

Check if `.opencode/scripts/codegraph-mcp.cmd` (Windows) or `.opencode/scripts/codegraph-mcp.sh` (macOS/Linux) exists. Scripts are pre-bundled — should be present.

**If missing:**
- The pre-bundled script was deleted — restore it from the factory pack
- These scripts resolve the codegraph binary path at runtime

### 6. Check Graphify Report

Check if `.graphify/GRAPH_REPORT.md` exists in the project root. If not, note it as not yet generated.

### 7. Check Context State

Read `.opencode/metrics/context-state.json` and verify it is valid JSON with required fields.

### 8. Generate Doctor Report

```
Context Doctor Report
━━━━━━━━━━━━━━━━━━━━

✅ CodeGraph CLI:    v1.0.0
✅ Graphify CLI:     v1.0.0
✅ MCP Config:       codegraph configured
✅ Wrapper Scripts:  Found
✅ Claude-Mem:       Worker running on port 37801
❌ Graphify Report:  Not found

Issues Found:
  1. Graphify report not generated yet

Manual Actions Needed:
  1. Run graphify to generate the report (if CLI available)
  2. Or continue without it (plugin will generate on first use)
```

## Common Fixes

### "command not found: npm"
- Install Node.js from https://nodejs.org
- Restart terminal after installation
- Verify: `node --version` and `npm --version`

### "permission denied" during npm install
- Windows: Run terminal as administrator
- macOS/Linux: Use `sudo npm install -g <package>`
- Alternative: Use `npm install -g <package> --prefix ~/.local`

### "codegraph: command not found" after installation
- Check npm global bin path: `npm config get prefix`
- Add to PATH: `export PATH="$(npm config get prefix)/bin:$PATH"` (add to ~/.bashrc or ~/.zshrc)
- Windows: Check if npm global bin is in system PATH

### MCP server not connecting
- Restart OpenCode session after MCP configuration changes
- Check wrapper script is executable (macOS/Linux: `chmod +x .opencode/scripts/codegraph-mcp.sh`)
- Verify wrapper script path is correct in opencode.json

### Graphify "non-code corpus files" error
- Run `graphify update .` instead of `graphify .`
- This handles mixed file types gracefully

### Claude-Mem worker not starting
- Check if port 37801 is in use: `netstat -ano | findstr :37801`
- Kill existing process: `taskkill /F /PID <pid>`
- Check settings.json: `cat ~/.claude-mem/settings.json`
- Check worker logs: `cat ~/.claude-mem/worker-stderr.log`
- Restart: `~/.claude-mem/cmem-up.cmd`

### Claude-Mem plugin not loading in OpenCode
- Check `opencode.json` has `@ephemushroom/opencode-claude-mem` in plugins
- Check `~/.config/opencode/tui.json` has the plugin entry
- Restart OpenCode twice (once to heal, once to load)

### Claude-Mem memory not injecting
- Verify worker is running: `curl http://127.0.0.1:37801/api/health`
- Check plugin logs in OpenCode
- Verify settings.json has correct port (37801)
- Verify OpenRouter API key is valid

### Claude-Mem OpenRouter API errors
- Verify API key is valid
- Check `CLAUDE_MEM_OPENROUTER_BASE_URL` is `https://opencode.ai/zen/v1`
- Check model is `deepseek-v4-flash-free`
- Check rate limits at https://openrouter.ai/keys

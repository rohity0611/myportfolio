# Claude-Mem — Existing Setup Reference

This guide documents the existing claude-mem setup for OpenCode. Follow these 7 steps to set up claude-mem on a new machine.

## What the Installation Creates

Running `npx claude-mem install --ide opencode` creates:

```
~/.claude-mem/                          ← settings + scripts
├── settings.json                       ← worker configuration
├── start.bat                           ← starts worker (called by cmem-up.cmd)
├── stop.bat                            ← stops worker (called by cmem-down.cmd)
├── cmem-up.cmd                         ← user-facing: start worker
├── cmem-down.cmd                       ← user-facing: stop worker
├── claude-mem.db                       ← memory storage
└── logs/                               ← worker logs

~/.claude/plugins/marketplaces/thedotmack/  ← plugin files
├── bun/                                ← bun runtime
└── plugin/
    └── worker-service.cjs              ← worker service
```

---

## Step 1: Check Prerequisites

```bash
node --version    # Requires 20+
npm --version
bun --version     # Auto-installed if missing
```

---

## Step 2: Install Claude-Mem

```bash
npx claude-mem install --ide opencode
```

**This creates:**
- `~/.claude-mem/` directory with `settings.json`, `start.bat`, `stop.bat`, `cmem-up.cmd`, `cmem-down.cmd`
- `~/.claude/plugins/marketplaces/thedotmack/` with the plugin and worker service

**Verify installation:**
```bash
ls ~/.claude-mem/settings.json
ls ~/.claude-mem/cmem-up.cmd
ls ~/.claude/plugins/marketplaces/thedotmack/plugin/worker-service.cjs
```

---

## Step 3: Configure settings.json

Edit `~/.claude-mem/settings.json` with the following working configuration:

```json
{
  "CLAUDE_MEM_RUNTIME": "worker",
  "CLAUDE_MEM_PROVIDER": "openrouter",
  "CLAUDE_MEM_OPENROUTER_BASE_URL": "https://opencode.ai/zen/v1",
  "CLAUDE_MEM_OPENROUTER_API_KEY": "<your-opencode-zen-api-key>",
  "CLAUDE_MEM_OPENROUTER_MODEL": "deepseek-v4-flash-free",
  "CLAUDE_MEM_MODEL": "claude-haiku-4-5-20251001",
  "CLAUDE_MEM_CONTEXT_OBSERVATIONS": "50",
  "CLAUDE_MEM_WORKER_PORT": "37801",
  "CLAUDE_MEM_WORKER_HOST": "127.0.0.1",
  "CLAUDE_MEM_CLAUDE_AUTH_METHOD": "subscription",
  "CLAUDE_MEM_GEMINI_API_KEY": "",
  "CLAUDE_MEM_GEMINI_MODEL": "gemini-2.5-flash-lite",
  "CLAUDE_MEM_GEMINI_RATE_LIMITING_ENABLED": "true",
  "CLAUDE_MEM_OPENROUTER_SITE_URL": "",
  "CLAUDE_MEM_OPENROUTER_APP_NAME": "claude-mem",
  "CLAUDE_MEM_DATA_DIR": "C:\\Users\\sabin\\.claude-mem",
  "CLAUDE_MEM_LOG_LEVEL": "INFO",
  "CLAUDE_MEM_PYTHON_VERSION": "3.13",
  "CLAUDE_CODE_PATH": "",
  "CLAUDE_MEM_CONTEXT_SHOW_READ_TOKENS": "false",
  "CLAUDE_MEM_CONTEXT_SHOW_WORK_TOKENS": "false",
  "CLAUDE_MEM_CONTEXT_SHOW_SAVINGS_AMOUNT": "false",
  "CLAUDE_MEM_CONTEXT_SHOW_SAVINGS_PERCENT": "true",
  "CLAUDE_MEM_CONTEXT_FULL_COUNT": "0",
  "CLAUDE_MEM_CONTEXT_FULL_FIELD": "narrative",
  "CLAUDE_MEM_SEMANTIC_INJECT": "true",
  "CLAUDE_MEM_SEMANTIC_INJECT_LIMIT": "5",
  "CLAUDE_MEM_CONTEXT_SESSION_COUNT": "10",
  "CLAUDE_MEM_CONTEXT_SHOW_LAST_SUMMARY": "true",
  "CLAUDE_MEM_CONTEXT_SHOW_LAST_MESSAGE": "false",
  "CLAUDE_MEM_FOLDER_CLAUDEMD_ENABLED": "false",
  "CLAUDE_MEM_PORT": 37801
}
```

**API Key:** Get your key from [opencode.ai/zen](https://opencode.ai/zen). Same key used in your `opencode.json` for OpenRouter.

**Key settings to verify:**
- `CLAUDE_MEM_PROVIDER`: `openrouter`
- `CLAUDE_MEM_OPENROUTER_MODEL`: `deepseek-v4-flash-free`
- `CLAUDE_MEM_WORKER_PORT`: `37801`
- `CLAUDE_MEM_DATA_DIR`: Points to `~/.claude-mem`

---

## Step 4: Add Plugin to OpenCode

Edit `.opencode/opencode.json` and add `@ephemushroom/opencode-claude-mem` to the `"plugin"` array:

```json
{
  "plugin": [
    ".opencode/extensions/graphify.js",
    "@ephemushroom/opencode-claude-mem"
  ]
}
```

---

## Step 5: Start the Worker

```bash
~/.claude-mem/cmem-up.cmd
```

This runs `start.bat` which:
1. Waits 3 seconds for any previous process to clear
2. Starts `worker-service.cjs` on port 37801
3. Retries health check up to 10 times (2 seconds apart)
4. Reports: `Worker: OK (port 37801)` or `Worker: WARNING`

---

## Step 6: Test Health

```bash
curl http://127.0.0.1:37801/api/health
```

**Expected response:**
```json
{"status":"ok"}
```

If you see `{"status":"ok"}`, the worker is running and ready.

---

## Step 7: Restart OpenCode Session

Plugins and MCP servers only connect when OpenCode starts. After installation, restart your session:

```bash
# Resume current session
opencode --resume <session-id>

# Or start fresh
opencode
```

---

## Stopping the Worker

```bash
~/.claude-mem/cmem-down.cmd
```

This runs `stop.bat` which kills the worker process on port 37801 and cleans up any zombie processes on port 37800.

---

## Quick Reference

| Command | Action |
|---------|--------|
| `~/.claude-mem/cmem-up.cmd` | Start worker |
| `~/.claude-mem/cmem-down.cmd` | Stop worker |
| `curl http://127.0.0.1:37801/api/health` | Check health |
| `netstat -ano \| findstr :37801` | Check port 37801 is in use |

---

## File Locations

| File | Path | Purpose |
|------|------|---------|
| settings.json | `~/.claude-mem/settings.json` | Worker configuration |
| start.bat | `~/.claude-mem/start.bat` | Worker starter (called by cmem-up.cmd) |
| stop.bat | `~/.claude-mem/stop.bat` | Worker stopper (called by cmem-down.cmd) |
| cmem-up.cmd | `~/.claude-mem/cmem-up.cmd` | User-facing: start worker |
| cmem-down.cmd | `~/.claude-mem/cmem-down.cmd` | User-facing: stop worker |
| opencode.json | `.opencode/opencode.json` | Plugin registration (line 79-82) |
| claude-mem.db | `~/.claude-mem/claude-mem.db` | Memory storage |
| worker.pid | `~/.claude-mem/worker.pid` | Worker process ID |
| logs | `~/.claude-mem/logs/` | Worker logs |

---

## Troubleshooting

### Worker not starting
```bash
# Check if port is in use
netstat -ano | findstr :37801

# Kill existing process
taskkill /F /PID <pid>

# Restart
~/.claude-mem/cmem-up.cmd
```

### Plugin not loading in OpenCode
1. Check `opencode.json` has `@ephemushroom/opencode-claude-mem` in plugins
2. Restart OpenCode twice (once to heal, once to load)

### Memory not injecting
1. Verify worker is running: `curl http://127.0.0.1:37801/api/health`
2. Check plugin logs in OpenCode
3. Verify settings.json has correct port (37801)

### OpenRouter API errors
1. Verify API key is valid (from opencode.ai/zen)
2. Check `CLAUDE_MEM_OPENROUTER_BASE_URL` is `https://opencode.ai/zen/v1`
3. Check model is `deepseek-v4-flash-free`

---

## Subagent Dispatch

When context-setup or context-doctor runs, it can dispatch an explore agent:

```
task(subagent_type: "explore", prompt: "Read .opencode/guides/claude-mem-setup.md and set up claude-mem following the reference guide. Check if already installed, skip if done. Start worker, verify health, report status.")
```

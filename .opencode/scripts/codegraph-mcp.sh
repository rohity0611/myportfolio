#!/bin/bash
# codegraph-mcp.sh — Resolve codegraph binary and launch MCP server
# Searches common install locations, falls back to PATH

BIN=""

for path in "$HOME/.local/bin/codegraph" \
            "$HOME/.npm-global/bin/codegraph" \
            "$(npm root -g 2>/dev/null)/@colbymchenry/codegraph/bin/cli.js" \
            "/usr/local/bin/codegraph"; do
    if [ -x "$path" ]; then
        BIN="$path"
        break
    fi
done

if [ -z "$BIN" ]; then
    BIN="codegraph"
fi

exec "$BIN" serve --mcp

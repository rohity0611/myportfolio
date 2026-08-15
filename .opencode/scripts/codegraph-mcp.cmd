@echo off
REM codegraph-mcp.cmd — Resolve codegraph binary and launch MCP server
REM Searches common npm global install locations, falls back to PATH

setlocal enabledelayedexpansion

set "BIN="

if exist "%APPDATA%\npm\codegraph.cmd" set "BIN=%APPDATA%\npm\codegraph.cmd"
if exist "%LOCALAPPDATA%\npm\codegraph.cmd" set "BIN=%LOCALAPPDATA%\npm\codegraph.cmd"
if exist "%USERPROFILE%\AppData\Roaming\npm\codegraph.cmd" set "BIN=%USERPROFILE%\AppData\Roaming\npm\codegraph.cmd"

if not defined BIN set "BIN=codegraph"

"%BIN%" serve --mcp

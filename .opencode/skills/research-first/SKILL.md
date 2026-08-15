---
name: research-first
description: "Research before action. Use graphify, memory, MCPs, and websearch to gather context before making decisions."
risk: unknown
source: custom
date_added: "2026-07-18"
---

# Research-First Execution

## Core Principle

Research before action. Multiple sources reduce hallucinations.

## MCP Research Tools

Use these purpose-built MCP tools instead of websearch for technical research:

| Tool | Purpose | Priority |
|------|---------|----------|
| `context7_resolve-library-id` + `context7_query-docs` | Library/framework documentation and code examples | High |
| `deepwiki_read_wiki_structure` + `deepwiki_read_wiki_contents` + `deepwiki_ask_question` | GitHub repository documentation and Q&A | Medium |
| `gh_grep_searchGitHub` | Real-world code patterns from public repos | Medium |
| `scout` subagent | Clone and inspect external dependency source | Low |

## Data Source Priority

Check sources in this order (stop when you have enough):

1. **graphify/codegraph** — local code context (fastest, most relevant)
2. **claude-mem** — historical patterns (if available)
3. **MCPs** — Context7, Snyk, Figma, etc.
4. **websearch** — current info (slowest, use last)

## Simple Task Criteria (SKIP research)

- Steps: < 3
- Files: < 2 affected
- Pattern: known (exists in codebase)
- External: none

## Complex Task Criteria (MUST research)

- Steps: > 3
- Files: > 2 affected
- Pattern: novel or unfamiliar
- External: API calls, new library, auth

## Explore Subagent Prompt Template

```
Analyse codebase for: {task description}

Check sources in priority order:
1. graphify/codegraph for local context
2. claude-mem for historical patterns
3. MCPs for external tools (Context7, Snyk, etc.)
4. websearch as fallback

Return structured findings:
- Relevant patterns found
- Existing code to reuse
- Dependencies identified
- Risks or unknowns
```

## Fallback

If explore subagent fails:

- Main agent uses grep/read directly
- Note limitation in response
- Don't guess, don't skip

## Verification

After research, verify findings before responding.

# FACTORY_CONFIG Additions — Opus Patch
# Add these flags to the FACTORY_CONFIG section of your AGENTS.md or AGENTS-BUILD.md
# Version: March 2026

## New flags

```
# Agentic safety level
# standard   — Rules 1–5 active. Irreversibility gate on destructive actions only (default).
# elevated   — Rules 1–5 active. Irreversibility gate on ALL external writes.
# Use elevated for builds with agents that have write access to production systems, customer data, or shared infrastructure.
AGENTIC_SAFETY_LEVEL: standard

# Extended thinking mode restriction for web/browser agents
# When true, the security-reviewer will flag any agent using extended thinking on untrusted web content.
# Basis: Opus System Card (Section 5.2.1) — elevated prompt injection risk with extended thinking in browser contexts.
# Default true. Set false only if you have reviewed the risk and accepted it explicitly.
RESTRICT_EXTENDED_THINKING_BROWSER: true

```

## Where to add

In your `AGENTS.md` (or `AGENTS-BUILD.md`), find the `FACTORY_CONFIG` block and append these two flags.

Typical location:
```
## FACTORY_CONFIG
HARDENING_DATA_VALIDATION: false
PHASE_4_AUTO_APPROVE: false
AGENTIC_SAFETY_LEVEL: standard          # ← add
RESTRICT_EXTENDED_THINKING_BROWSER: true  # ← add
```

## How the flags are consumed

`AGENTIC_SAFETY_LEVEL` is read by:
- `.opencode/rules/agentic-safety.md` (Rule 3 — Irreversibility Gate strictness)

`RESTRICT_EXTENDED_THINKING_BROWSER` is read by:
- `.opencode/agents/security-reviewer.md` (Check 11 — Agentic Browser/Web Content Processing)

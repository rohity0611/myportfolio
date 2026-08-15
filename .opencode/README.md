# OpenCode Factory v3.1 — Discovery + Build + Architecture + Safety 

A portable, tech-stack-agnostic methodology for analysing **existing** codebases, building on them, and continuously validating architecture using OpenCode.

> For **scube** repos where you already know the tech stack, skip discovery and run the factory setup directly.

## What's New in v3.1

- **Framework validation:** `.opencode/scripts/validate-framework.mjs` checks command contracts, context continuity, stale references, and metric schemas
- **Agentic safety rules:** 5 standing rules derived from Opus 4.6 System Card — credential scope, minimal footprint, irreversibility gates, explicit failure reporting, purpose over objective
- **Agent purpose statements:** All agent definitions now include a purpose statement (why the work matters, not just what to do) — addresses multi-agent manipulation risk
- **Security reviewer extended:** 4 new checks — credential scope, irreversibility gates, calculated output verification, browser/extended-thinking prompt injection risk
- **Test writer extended:** Intermediate output verification for calculated/rule-derived functions — catches correct-reasoning/wrong-output failures
- **New FACTORY_CONFIG flags:** `AGENTIC_SAFETY_LEVEL` (standard/elevated) and `RESTRICT_EXTENDED_THINKING_BROWSER` (true/false)
- **Agent template updated:** New agents must include purpose statement, single-concern exclusions, minimal tool grants, and safety rule compliance

## What Was New in v3.0

- **Two entry modes:** Scube (no discovery) or Discovery → Build
- **Architecture-as-code:** Living `architecture.html` updated at every build phase
- **Document coherence specialist:** Post-setup cleanup removes discovery scaffolding from AGENTS.md context
- **`.opencode/rules/` auto-load:** Architecture standards, design patterns, build methodology, and context continuity live in rules (not AGENTS.md)
- **AGENTS.md stays lean:** Under 100 lines — standing constraints, key paths, factory config only
- **Data Reality Framework:** Every data touchpoint mapped, visualised, and tracked through build→harden lifecycle
- **Continuous architecture review:** `/update-architecture` command after every structural change

## Three Factories, One Workflow

### Discovery Factory (5 phases) — for existing codebases
Interrogate an existing codebase with 10 specialist analysis agents.

```
/discover/orientation    → Map structure, stack, scale
/discover/analyse        → 10-agent parallel swarm
/discover/synthesise     → Unified assessment + health score
/discover/roadmap        → Prioritised work items
/discover/report         → 3 deliverables
```

### Factory Setup — generates AGENTS.md + rules
Configures the repo for build mode. Two entry points:

```
# After discovery (existing codebase)
/factory-setup discovery

# Scube (new project, you provide the tech stack)
/factory-setup scube
```

### Build Factory (7 phases) — for building features
Build new features with confidence gates and parallel hardening agents.

```
/plan-brief          → Phase 1: Brief Planning
/slice               → Phase 2: Slice Recommendation
/plan-slice          → Phase 3: Slice Planning
                     → Phase 4: Confidence Gate
/build               → Phase 5: Build
/update-architecture → Refresh architecture visualisation
/harden              → Phase 6: Harden (7+1 agents)
/ship                → Phase 7: Ship
```

### Design Factory (5 phases) — Figma to Code
Convert Figma designs into verified React+Tailwind components. Integrates with Build Factory via design handoff.

```
/design-brief        → Phase D1: Analyze Figma, extract tokens, download assets
/design-slice        → Phase D2: Break design into component slices
/design-plan-slice   → Phase D3: Plan each component's execution with Figma context
/design-build        → Phase D4: Generate React+Tailwind code from design
/design-verify       → Phase D5: Visual verification (Imugi/Playwright), then handoff to Build
```

**Flow:** Design Factory produces verified components + `design-handoff-{ticket}.json`. Build Factory's `/plan-brief` and `/slice` automatically read the handoff to incorporate design tokens, component paths, and verification scores.

**When to use:** If your brief includes a Figma URL, start with `/design-brief`. If no Figma URL, use Build Factory directly.

### The Bridge
Discovery outputs feed directly into factory setup. Factory setup generates:
- `AGENTS.md` — lean agent guidance (<100 lines)
- `.opencode/rules/architecture-standards.md` — code-verified architecture (auto-loads)
- `.opencode/rules/design-patterns.md` — coding conventions (auto-loads)
- `.opencode/rules/build-methodology.md` — factory phases (auto-loads)
- `.opencode/rules/context-continuity.md` — durable run cursor and subagent context packets (auto-loads)
- `.opencode/rules/agentic-safety.md` — safety rules (auto-loads)
- `.opencode/rules/senior-engineering-standards.md` — engineering role expectations (auto-loads)
- `.opencode/rules/memory.md` — persistent session context (auto-loads)
- `architecture.html` — living visual architecture document

## Quick Start

### Existing Codebase
1. Copy factory pack into your repo
2. `cp OPENCODE-DISCOVERY.md AGENTS.md`
3. Run `/discover/orientation` through `/discover/report`
4. Run `/factory-setup discovery`
5. Run `/plan-brief` to start building

### Scube Project
1. Copy factory pack into your repo
2. Run `/factory-setup scube`
3. Answer the tech stack questions
4. Run `/plan-brief` to start building

See `docs/INSTALL.md` for the full installation guide.

## Safety Architecture (v3.1)

The factory enforces safety at three layers:

| Layer | Mechanism | What it catches |
|-------|-----------|-----------------|
| **Validation** | `node .opencode/scripts/validate-framework.mjs` + framework contracts | Command/rule drift, stale references, schema violations |
| **Rules** | `agentic-safety.md` (5 standing rules, auto-loaded) | Credential scope, destructive actions, silent failures |
| **Hardening** | Security reviewer (checks 8–11) | Agentic credential misuse, irreversibility gaps, output/reasoning divergence, extended-thinking injection risk |

### Agentic Safety Level

Set via `AGENTIC_SAFETY_LEVEL` in FACTORY_CONFIG:
- `standard` (default) — Irreversibility gate on destructive actions only
- `elevated` — Irreversibility gate on ALL external writes (use for production/customer data builds)

## Folder Guide

- `commands/` — workflow commands
- `rules/` — auto-loaded methodology, architecture, and design constraints
- `agents/` — specialist hardening roles used in Phase 6
- `plans/` — approved phase outputs and execution plans
- `metrics/` — machine-readable workflow state and outcome records
- `schemas/` — JSON schemas for framework metric validation
- `scripts/` — local framework tooling with no external dependencies
- `skills/` — project-local specialist skills
- `docs/` — installation guide, discovery methodology, data reality framework
- `opencode.json` — OpenCode config with instructions, permissions, skills, and runtime settings

## Validation

Run framework validation after file operations that touch files inside `.opencode/`.

You can also run it directly:

```bash
node .opencode/scripts/validate-framework.mjs
```

The validator checks:
- required framework files exist
- required commands are present
- retired build-doc references are gone
- `factory-setup` advertises `scube`
- metric JSON files match their schemas

There is no separate public validation command. Run the Node validator directly when `.opencode` framework files change.

## Framework Rules

- Keep command names, rules, and metric filenames aligned
- Update `phase-state` ownership whenever a phase contract changes
- Prefer one authoritative workflow path over duplicate wording
- Treat schemas as the source of truth for metric structure
- Keep framework files small enough to maintain safely

## Compatibility Notes

- old `greenfield` usage is normalized to `scube`
- discovery handoff flows through `/factory-setup discovery`
- shipping uses one PR per Jira ticket

## Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| v3.1 | March 2026 | Post-edit validation hooks, Opus 4.6 safety patch, agent purpose statements |
| v3.0 | February 2026 | Architecture-as-code, Data Reality Framework, document coherence, rules auto-load |

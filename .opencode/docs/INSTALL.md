# OpenCode Factory v3.1 — Installation Guide

**Version:** 3.1.0
**For:** Chain Engineers installing the factory on a new or existing repo

---

## What's in the pack

```
opencode-factory-v3/
├── OPENCODE-DISCOVERY.md               # Discovery methodology
├── .opencode/
│   ├── README.md                       # Factory overview
│   ├── opencode.json                   # OpenCode config, instructions, permissions, MCP
│   ├── commands/
│   │   ├── factory-setup.md           # /factory-setup → generates AGENTS.md + rules
│   │   ├── update-architecture.md     # /update-architecture → refresh arch viz
│   │   ├── context-refresh.md         # /context-refresh → update indexes
│   │   ├── context-setup.md           # /context-setup → claude-mem init
│   │   ├── context-doctor.md          # /context-doctor → diagnose context issues
│   │   ├── discover/                   # Discovery phase commands (5 phases)
│   │   ├── plan-brief.md              # Build Phase 1
│   │   ├── slice.md                   # Build Phase 2
│   │   ├── plan-slice.md              # Build Phase 3
│   │   ├── build.md                   # Build Phase 5 (+ arch review)
│   │   ├── harden.md                  # Build Phase 6 (8 agents)
│   │   ├── ship.md                    # Build Phase 7
│   │   ├── design-brief.md            # Design Phase D1
│   │   ├── design-slice.md            # Design Phase D2
│   │   ├── design-plan-slice.md       # Design Phase D3
│   │   ├── design-build.md            # Design Phase D4
│   │   └── design-verify.md           # Design Phase D5
│   ├── agents/                         # 26 subagents (5 setup, 8 hardening, 13 platform)
│   ├── rules/                          # 6 auto-loading rules
│   │   ├── architecture-standards.md  # Layer contracts, BFF pattern
│   │   ├── design-patterns.md         # File organisation, naming, patterns
│   │   ├── build-methodology.md       # 7-phase build chain
│   │   ├── context-continuity.md      # Run cursor + subagent context packets
│   │   ├── agentic-safety.md          # 5 standing safety rules
│   │   └── senior-engineering-standards.md  # Senior role behaviour
│   ├── skills/                         # 40+ factory skills
│   ├── plans/
│   ├── metrics/
│   ├── schemas/                        # 8 JSON schemas for metric validation
│   ├── scripts/                        # validate-framework.mjs, schema-validator.mjs
│   └── hardening/
└── docs/
    ├── INSTALL.md                      # This file
    ├── discovery-factory.md            # Discovery methodology deep-dive
    ├── data-reality-framework.md       # Data Reality Framework
    └── claude-mem-setup.md             # claude-mem installation guide
```

---

## Installation: Existing Codebase (Discovery → Build)

### 1. Copy the pack into the existing repo

```bash
cp -r /path/to/opencode-factory-v3/.opencode .
cp /path/to/opencode-factory-v3/OPENCODE-DISCOVERY.md .
cp /path/to/opencode-factory-v3/AGENTS-TEMPLATE.md .
cp /path/to/opencode-factory-v3/MEMORY-TEMPLATE.md .
cp -r /path/to/opencode-factory-v3/docs .
```

### 2. Start with Discovery

```bash
cp OPENCODE-DISCOVERY.md AGENTS.md
```

### 3. Run Discovery (5 phases)

```
/discover/orientation
/discover/analyse
/discover/synthesise     ← human reviews
/discover/roadmap        ← human reviews
/discover/report
```

### 4. Run Factory Setup

```
/factory-setup discovery
```

This generates:
- `AGENTS.md` — lean agent guidance (<100 lines) from discovery outputs
- `.opencode/rules/architecture-standards.md` — from Phase 2 architecture analysis
- `.opencode/rules/design-patterns.md` — from Phase 2 code quality analysis
- `architecture.html` — initial architecture visualisation
- Archives discovery outputs to `docs/discovery-archive/`
- Runs document coherence check

### 5. Start Building

```
/plan-brief
```

---

## Installation: Scube Project

### 1. Copy the pack

```bash
cp -r /path/to/opencode-factory-v3/.opencode .
cp /path/to/opencode-factory-v3/AGENTS-TEMPLATE.md .
cp /path/to/opencode-factory-v3/MEMORY-TEMPLATE.md .
cp -r /path/to/opencode-factory-v3/docs .
```

### 2. Run Factory Setup

```
/factory-setup scube
```

Answer the tech stack questions. This generates:
- `AGENTS.md` — from your answers
- `.opencode/rules/architecture-standards.md` — skeleton from declared stack
- `.opencode/rules/design-patterns.md` — language/framework defaults
- `architecture.html` — skeleton (populated after first build phase)

### 3. Start Building

```
/plan-brief
```

---

## Key Changes from v2.1

| Feature | v2.1 | v3.0/v3.1 |
|---------|------|------------|
| Entry modes | Discovery then manual swap | `/factory-setup discovery` or `scube` |
| AGENTS.md size | Unbounded (grew large) | <100 lines (strict) |
| Architecture detail | In AGENTS.md | In `.opencode/rules/` (auto-loads) |
| Build methodology | In AGENTS.md | In `.opencode/rules/` (auto-loads) |
| Architecture viz | Not included | `architecture.html` + `/update-architecture` |
| Doc coherence | Not included | `.opencode/skills/document-coherence/` |
| Data Reality | Not included | Full lifecycle: plan → build → visualise → harden |
| Post-build review | Optional | Mandatory architecture review per slice |
| Hardening agents | 7 core | 7 core + 1 optional (Data Integration) |
| Design workflow | Not included | 5-phase design pipeline (D1-D5) |
| Context continuity | Not included | Run cursor + subagent context packets |
| Agentic safety | Not included | 5 standing rules (credential scope, minimal footprint, irreversibility gate, failure reporting, purpose over objective) |
| Metric validation | Not included | JSON schemas per metric + validator script |
| Self-containment | Global agents only | 26 local agents in `.opencode/agents/` |

---

## Troubleshooting

**Hardening agents not available:** Check `.opencode/agents/` exists and agent frontmatter includes `description` and `mode: subagent`.

**Architecture review not running between slices:** Check `ARCHITECTURE_REVIEW_MODE` in FACTORY_CONFIG. Default is `mandatory`. The slice-to-slice gate enforces this.

**AGENTS.md getting too long:** Run the document coherence specialist. Push detail to `.opencode/rules/` files. AGENTS.md should only contain standing constraints, key paths, and factory config.

**Architecture.html empty after setup:** Run `/update-architecture` after your first build phase. The skeleton is populated on first real scan.

**Rules not auto-loading:** Ensure files are in `.opencode/rules/` directory (not `.opencode/rules` as a file). OpenCode auto-loads all `.md` files from this directory.

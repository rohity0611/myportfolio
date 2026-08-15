---
description: "Update the living architecture visualisation. Run after every build phase. Scans codebase, regenerates architecture.html, updates graphify graph."
---

# Update Architecture Visualization

You are the **custodian of the visual architecture document** (`architecture.html`). You own both the data and the design.

## When To Run

- **After every slice in Phase 5** (mandatory — part of build verification)
- After any structural change (new layer, component type, data flow)
- After hardening (Phase 6) to capture cross-cutting concerns
- On demand when the human wants to review architecture

## Procedure

### Step 1: Scan the Codebase

Gather fresh data by reading source files. Build a SCAN object:
- **File metrics:** source count, test count, LOC
- **Architectural layers:** components, status, files per layer
- **Data contracts:** inter-layer models
- **Configuration:** registries, factories, composition points
- **Wiring:** inputs, outputs, parameters per component
- **Data flows:** runtime pipeline, config-to-instance flow

### Step 2: Update `architecture.html`

Find `// SCAN_START` and `// SCAN_END` markers. Replace with fresh SCAN object. If file doesn't exist, create skeleton with three view modes: Components | Data Flow | Data Reality.

### Step 3: Update Graphify Graph

Run incremental graph update to keep knowledge graph in sync:
```bash
graphify update .
```

If graph doesn't exist yet, run init to create it:
```bash
graphify update .
```

Verify update completed:
```bash
node -e "const g=require('./graphify-out/graph.json'); console.log('Nodes:', g.nodes?.length || 0); console.log('Edges:', g.edges?.length || 0);"
```

### Step 4: Update Codegraph (if available)

If `.codegraph/` directory exists, run codegraph index update to keep code graph in sync.

### Step 5: Architecture Health Check

Assess:
- **Structural drift:** Components outside declared layers?
- **Orphaned code:** Unreachable from entry points?
- **Coupling hotspots:** Too many connections?
- **Missing contracts:** Untyped data between layers?
- **Data reality gaps:** Components touching external data without DataReality contract?
- **Silent fallbacks:** Fallback chains that don't surface activation?
- **Stale data risk:** Real sources without freshness thresholds?

Report data reality coverage:
```
Data Reality: X/Y sources audited (Z%)
  Real: N | Synthetic (by design): N | Fallback-active: N | Unknown: N
  ⚠ N components touch external data without DataReality contracts
```

Report issues with severity:
- **Refactor now** — compounds with next slice
- **Refactor before hardening** — can wait, must fix before Phase 6
- **Note for future** — not blocking
- **Data reality gap** — component needs DataReality contract before production

### Step 6: Store Architecture Decisions (Claude-Mem)

If significant findings, store in claude-mem for future sessions:
- Structural drift detected → store decision to refactor
- Data reality gaps → store decision to add contracts
- Architecture pattern established → store for reuse

### Step 7: Write and Report

1. Write updated `architecture.html`
2. Report: SCAN changes, graph updates, health issues

## Related Skills

Before executing, load relevant skills:
- `skill({name: "improve-codebase-architecture"})` — architecture analysis and improvement

## Completion Response (MANDATORY)

End with:
- Architecture review status: `pass | refactor_needed | refactor_completed | blocked`
- Data reality coverage summary
- Graphify update status: `updated | skipped (no graph)`
- Next command based on phase cursor

# Design Workflow — Figma to Code

> 5-phase pipeline for converting Figma designs into verified React+Tailwind components.

## Overview

The Design Workflow transforms Figma designs into production-ready code through five sequential phases. It integrates with the Build Factory via a formal design handoff, ensuring design tokens, component references, and verification scores flow into implementation.

```
┌─────────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐
│  D1: Brief  │ →  │ D2: Slice   │ →  │ D3: Plan     │ →  │ D4: Build   │ →  │ D5: Verify   │
│             │    │             │    │              │    │             │    │              │
│ Extract     │    │ Component   │    │ Execution    │    │ Generate    │    │ Visual       │
│ tokens +    │    │ boundaries  │    │ plan +       │    │ React+TW    │    │ comparison   │
│ structure   │    │ + deps      │    │ Figma refs   │    │ code        │    │ + handoff    │
└─────────────┘    └─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘
```

## Phases

### D1: Design Brief (`/design-brief {ticket-id} {figma-url}`)

**Purpose:** Analyze Figma design, extract all data locally.

**What it does:**
1. Connects to Figma via MCP tools
2. Extracts file structure, node hierarchy, and component tree
3. Downloads design tokens (colors, fonts, spacing, shadows, border-radius)
4. Captures screenshots for each major frame/component
5. Downloads raw assets (images, icons)

**Output files:**
- `design/{ticket-id}/figma-meta.json` — structure, URLs, component hierarchy
- `design/{ticket-id}/tokens.json` — extracted design tokens
- `design/{ticket-id}/images/` — screenshots and assets

**Skills loaded:** `research-first`, `brainstorming`, `extract-design-system`, `grill-me`

**Gate:** Human approves structure, tokens, and screenshots before proceeding.

---

### D2: Design Slice (`/design-slice {ticket-id}`)

**Purpose:** Break design into per-component delivery slices.

**What it does:**
1. Reads `figma-meta.json` and `tokens.json`
2. Identifies natural component boundaries from Figma frame hierarchy
3. Maps dependencies between components
4. Recommends delivery sequence

**Each slice includes:**
- Name (e.g., "header", "hero", "features-grid")
- Objective, scope, complexity (S/M/L)
- Dependencies and Figma node ID

**Output:** `.opencode/plans/{ticket-id}-design-slice.md`

**Skills loaded:** `research-first`, `brainstorming`, `improve-codebase-architecture`, `grill-me`

**Gate:** Human approves slicing strategy before proceeding.

---

### D3: Design Plan Slice (`/design-plan-slice {ticket-id} {slice-name}`)

**Purpose:** Create detailed execution plan for one component.

**What it does:**
1. Reads the approved slice from D2
2. Loads `figma-design-to-code` skill (mandatory)
3. Calls `figma_get_design_context` for reference React+Tailwind code
4. Maps design tokens to CSS custom properties
5. Identifies reusable components from codebase

**Plan includes:**
- Component structure (props, styles, children)
- Token mappings (color/primary → var(--color-primary))
- Existing components to reuse
- Figma node ID, screenshot path, reference code

**Output:** `.opencode/plans/{ticket-id}-design-plan-{slice-name}.md`

**Skills loaded:** `research-first`, `writing-plans`, `prototype`, `grill-me`

**Gate:** Human approves component structure, token mappings, and prerequisites.

---

### D4: Design Build (`/design-build {ticket-id} {slice-name}`)

**Purpose:** Generate React+Tailwind code from the approved plan.

**What it does:**
1. Reads the D3 execution plan
2. Applies design tokens as CSS custom properties
3. Generates component code following architecture standards
4. Records execution outcome metrics

**Build rules:**
- Functional correctness ONLY — match the design, nothing more
- No error handling, logging, tests, security, documentation (Phase 6 handles these)
- Follow `architecture-standards.md` and `design-patterns.md`
- Use `figma_get_variable_defs` to extract tokens — never hardcode hex values

**Output:**
- `design/{ticket-id}/components/{SliceName}/index.tsx`
- `.opencode/metrics/design-execution-{ticket-id}-{slice-name}.json`

**Skills loaded:** `research-first`, `clean-code`, `figma-design-to-code`, `design-taste-frontend`, `image-to-code`, `verification-before-completion`

**Gate:** Approval required for new file creation and substantial multi-file edits.

---

### D5: Design Verify (`/design-verify {ticket-id} {slice-name}`)

**Purpose:** Automated visual verification that built component matches Figma design.

**Primary method (Imugi):**
1. `imugi_capture` → screenshot the running component
2. `imugi_compare` → compare against Figma design reference
3. Read composite_score (SSIM + pixelmatch + Claude Vision)
4. If score >= 95%: pass. If < 95%: identify CSS fixes, iterate (max 5 iterations)

**Fallback method (Playwright):**
1. `playwright_browser_navigate` → dev server
2. `playwright_browser_take_screenshot` → capture
3. `figma_get_screenshot` → download Figma reference
4. Agent-driven visual comparison

**Post-verification:**
- Migrate component from `design/{ticket-id}/components/` to `src/components/`
- Write `design-handoff-{ticket-id}.json` with tokens, paths, and verification scores
- Refresh codegraph/graphify indexes

**Output:**
- `.opencode/metrics/design-verification-{ticket-id}-{slice-name}.json`
- `.opencode/metrics/design-handoff-{ticket-id}.json` (when all slices verified)

**Skills loaded:** `verification-before-completion`, `webapp-testing`, `design-taste-frontend`, `imugi-verify`

**Gate:** Composite score >= 95% required. After 5 failed iterations, generate fix plan and surface to human.

---

## Integration with Build Factory

The Design Workflow connects to the Build Factory through `design-handoff-{ticket-id}.json`:

```json
{
  "event": "design_handoff",
  "ticket_id": "TICKET-123",
  "slices_completed": [
    { "name": "header", "verification_score": 97, "files": ["components/Header/index.tsx"] }
  ],
  "tokens_path": "design/TICKET-123/tokens.json",
  "components_path": "design/TICKET-123/components/",
  "verification_scores": { "header": 97 },
  "figma_file_key": "abc123def456"
}
```

**How Build Factory reads the handoff:**
- `/plan-brief` — checks for `design-handoff-{jira-key}.json` and incorporates design tokens into planning
- `/slice` — reads handoff to inform slice boundaries based on verified components
- `/plan-slice` — references design tokens and component paths in execution plans
- `/build` — uses design components as starting point

## Required MCP Tools

| Tool | Phase | Purpose |
|------|-------|---------|
| `figma_get_metadata` | D1 | Extract file structure and node hierarchy |
| `figma_get_variable_defs` | D1 | Extract design tokens |
| `figma_get_screenshot` | D1, D5 | Download design screenshots |
| `figma_download_assets` | D1 | Download images and icons |
| `figma_get_design_context` | D3 | Get reference React+Tailwind code |
| `imugi_capture` | D5 | Screenshot running component |
| `imugi_compare` | D5 | Visual comparison (primary) |
| `playwright_browser_*` | D5 | Visual comparison (fallback) |

## File Structure

```
design/
└── {ticket-id}/
    ├── figma-meta.json          # D1: Figma structure
    ├── tokens.json              # D1: Design tokens
    ├── images/                  # D1: Screenshots and assets
    │   ├── {slice-name}.png
    │   └── ...
    └── components/              # D4: Generated code
        └── {SliceName}/
            └── index.tsx

.opencode/plans/
├── {ticket-id}-design-brief.md          # D1 output
├── {ticket-id}-design-slice.md          # D2 output
└── {ticket-id}-design-plan-{slice}.md   # D3 output

.opencode/metrics/
├── design-execution-{ticket}-{slice}.json    # D4 metric
├── design-verification-{ticket}-{slice}.json # D5 metric
└── design-handoff-{ticket}.json              # D5 final handoff
```

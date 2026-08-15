# Imugi Verify Skill

Use when running `/design-verify` or comparing built UI against Figma designs. Provides the automated visual verification loop using Imugi MCP.

## When to Use

- Comparing a built component against its Figma design export
- Running visual regression checks after code changes
- Verifying pixel-perfect accuracy (95%+ threshold)
- Patching CSS based on automated diff analysis

## Prerequisites

- Imugi MCP server running (`imugi` in MCP config)
- Dev server running (via `imugi_serve` or `npm run dev`)
- Design reference image saved locally (from `figma_get_screenshot`)

## Verification Loop

### Step 1: Capture

```
imugi_capture → screenshot the running component at localhost
```

If dev server not running:
```
imugi_serve → start dev server for the project
```

### Step 2: Compare

```
imugi_compare → compare design image vs captured screenshot
```

Returns:
- `composite_score` (0-100%): SSIM + pixelmatch + Claude Vision
- `heatmaps`: red overlay showing exact diff locations
- `crop_pairs`: side-by-side zoomed crops of each diff region
- `dom_computed_styles`: actual CSS values in diff regions
- `figma_spec_diff`: design vs code CSS comparison (if FIGMA_TOKEN set)

### Step 3: Evaluate

| Score | Action |
|-------|--------|
| >= 95% | PASS — save report, done |
| 70-94% | PATCH — surgical CSS fixes based on heatmaps |
| < 70% | REGENERATE — full code regeneration needed |

### Step 4: Patch (if score < 95%)

1. Read `heatmaps` → identify which regions differ
2. Read `dom_computed_styles` → get actual CSS values per region
3. Read `figma_spec_diff` → see exact design vs code comparison:
   ```
   fontSize: design=42px → code=48px
   color: design=#1C1C1A → code=#2D2D2D
   padding: design=16px → code=24px
   ```
4. Edit component code with targeted CSS fixes
5. Re-capture → re-compare
6. Loop (max 5 iterations)

### Step 5: Save Report

Write to `.opencode/metrics/design-verification-{ticket-id}-{slice}.json`:

```json
{
  "event": "design_verification_outcome",
  "ticket_id": "TICKET-123",
  "slice": "header",
  "method": "imugi",
  "final_score": 97,
  "iterations": 2,
  "outcome": "pass",
  "threshold": 95,
  "figma_node_id": "1:2",
  "timestamp": "ISO-8601"
}
```

## Fallback: Playwright

If Imugi MCP unavailable, use Playwright:

```
1. playwright_browser_navigate → http://localhost:3000
2. playwright_browser_take_screenshot → save to /verification/code/{slice}.png
3. User visually compares against /design/{ticket-id}/images/{slice}.png
4. If differences found → edit code → re-capture → re-compare
```

## Threshold Configuration

Default: 95% (IMUGI_THRESHOLD=0.95)

Adjust via environment variable if needed:
- Higher threshold (98%+) = stricter, more iterations
- Lower threshold (90%) = faster, less precise

## Tips

- Run `imugi_detect` first to identify project tech stack
- Use `imugi_analyze` for detailed fix suggestions beyond heatmaps
- Set `FIGMA_TOKEN` env var for Figma spec diffs (exact CSS comparison)
- Max 5 iterations prevents infinite loops
- Below 70% score: consider full regeneration instead of patching

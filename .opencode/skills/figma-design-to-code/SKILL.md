# figma-design-to-code — Convert Figma Designs to React+Tailwind Code

MANDATORY skill for Phase D3 (Design Plan Slice) and Phase D4 (Design Build).

## Purpose

Bridge Figma design nodes to production-ready React+Tailwind components using Figma MCP tools, while respecting the project's existing component library and design tokens.

## Workflow

### Step 1: Get Design Context

Use the Figma MCP `figma_get_design_context` tool with the frame's nodeId and fileKey. Returns reference code (React+Tailwind), a screenshot, and contextual hints.

### Step 2: Load Design System Context

Call `figma_search_design_system` to find existing components, variables, and styles from the project's Figma design libraries. Reuse mapped Code Connect components instead of generating from scratch.

### Step 3: Adapt to Project Conventions

The reference code from `figma_get_design_context` is generic. Adapt it to:
- Project's existing component library (MUI, shadcn, custom, etc.)
- Project's token system (`tokens.json` → CSS custom properties or theme variables)
- Project's file structure and naming conventions (see `.opencode/rules/design-patterns.md`)

### Step 4: Honor Response Hints

Prioritize by importance:
1. **Code Connect snippets** → use the mapped codebase component directly
2. **Component documentation** → follow usage and guidelines
3. **Design annotations** → follow designer notes or constraints
4. **Design tokens as CSS variables** → map to the project's token system
5. **Raw hex / absolute positioning** → loosely structured; use the screenshot

### Step 5: Verify Against Screenshot

Visually verify the generated component against the Figma screenshot from `figma_get_design_context`. Use Phase D5 verification (Imugi) for automated comparison.

## Related Figma MCP Tools

| Tool | Purpose |
|------|---------|
| `figma_get_design_context` | Primary tool — returns reference code + screenshot + hints |
| `figma_search_design_system` | Find existing components, variables, styles |
| `figma_get_libraries` | List available design libraries |
| `figma_get_variable_defs` | Extract design tokens for a node |
| `figma_get_screenshot` | Download pixel-perfect screenshot |

## Important Notes

- The reference code from `figma_get_design_context` is a REFERENCE, not final code. Always adapt it to the project's stack and conventions.
- Never generate components from scratch if a design system match exists — always `figma_search_design_system` first.

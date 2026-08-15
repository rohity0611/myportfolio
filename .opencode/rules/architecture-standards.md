# Architecture Standards — {{APP_NAME}}

> Auto-loaded by OpenCode. Starter architecture — expand as the codebase grows.

## System Architecture

BFF (Backend-for-Frontend) pattern with Next.js.

```
Browser → Next.js (SSR + API routes) → External API (target)
```

No database is exposed to the browser — all data flows through Next.js API routes.

## Layer Contract

```
src/pages/          → Page components + getServerSideProps (entry points)
src/pages/api/      → BFF API routes (security boundary)
src/features/       → Domain logic: slices, constants, validators, transformers
src/hooks/          → React Query wrappers + custom hooks
src/lib/            → Server utilities, auth, API clients, logging
src/lib/api/        → Canonical client-side API functions
src/components/     → Feature-specific UI components
src/commonComponents/ → Shared UI primitives (design system layer)
src/store/          → Redux store configuration
src/styles/         → CSS files
src/theme/          → MUI theme
```

**Dependency direction:** pages → components/hooks → features/lib. Never the reverse.

## BFF API Route Contract

Every BFF route SHOULD follow this structure:

```typescript
export default async function handler(req, res) {
  // 1. Method guard
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // 2. Session validation (if protected)
  // const session = await getSession(req, res);
  // if (!session) return res.status(401).json({ success: false, message: "Unauthorized" });

  // 3. Input validation
  // const sanitized = sanitizePayload(req.body, allowedFields);

  // 4. Backend proxy with timeout
  // const response = await axios.post(endpoint, sanitized, { timeout: 15000 });

  // 5. Consistent response envelope
  return res.status(200).json({ success: true, data: response.data });
}
```

## State Management

| Concern | Tool | Location |
|---------|------|----------|
| Server data (requests, responses) | React Query | `hooks/` |
| UI state (modals, sidebars) | React state or Context | Local |
| Complex form state | Redux | `store/` |
| Multi-step workflows | Redux | `features/` |

## Key File Locations

| What | Where |
|------|-------|
| Pages | `src/pages/` |
| API routes | `src/pages/api/` |
| Components | `src/components/` |
| Hooks | `src/hooks/` |
| Lib/ utilities | `src/lib/` |

## LSP Integration

OpenCode has TypeScript and ESLint LSP servers enabled. The agent can use the `lsp` tool for:
- `goToDefinition` — find where symbols are defined
- `findReferences` — find all usages of a symbol
- `hover` — get type information

For diagnostics (errors/warnings), prefer running `npm run lint` and `npx tsc --noEmit` directly — CLI tools give more reliable feedback than LSP diagnostics.

## Known Architectural Debt

None yet — this is a greenfield project. Record debt here as it accumulates.

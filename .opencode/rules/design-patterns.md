# Design Patterns — {{APP_NAME}}

> Auto-loaded by OpenCode. Starter patterns — expand as the codebase grows.

## File Organisation

### File Size Discipline
- **Target size:** Prefer source files around 150-175 lines where practical.
- **Split rule:** If a source file exceeds ~175 lines, extract cohesive modules (helpers, hooks, services, validators, transformers, components) when splitting improves readability and maintenance.
- **Boundary rule:** Keep each extracted module focused on one concern.
- **Pragmatic rule:** Do not split mechanically; keep cohesive flows together when splitting would reduce clarity.
- **Exemptions:** Configuration files, schemas, migrations, generated files, and lockfiles.

### Naming Conventions
- **Pages:** kebab-case (`add-business.js`, `order-detail.js`)
- **Components:** PascalCase directories with `index.js` (lowercase) entry
- **Features:** kebab-case directories (`schedule-availability/`)
- **Hooks:** camelCase with `use` prefix (`useAppMutation.js`, `useVendorOrders.js`)
- **Lib utilities:** camelCase (`getDetails.js`, `authHelpers.js`)
- **Constants:** UPPER_SNAKE_CASE exports, camelCase files (`ordersConstants.js`)
- **Validators:** camelCase files with `Validation` suffix (`listingValidation.js`)
- **Transformers:** camelCase files with `Transform(ers)` suffix (`ordersTransformers.js`)

### File Extensions
- `.ts` / `.tsx` for TypeScript source
- `.css` for stylesheets, `.module.css` for CSS Modules

### Import Aliases
- `@/*` maps to `./src/*` (configured in `tsconfig.json`/`jsconfig.json`)
- Always use `@/` prefix for non-relative imports

## Component Patterns

### Page Component Structure
```typescript
import MainLayout from "@/components/layout";

export default function PageName({ data }) {
  return (
    <MainLayout>
      {/* Page content */}
    </MainLayout>
  );
}

export const getServerSideProps = async (ctx) => {
  // Fetch page data
  return { props: { data } };
};
```

### Presentational vs Container
- **Container components** handle data fetching and state — co-located in `pages/` or `containers/`
- **Presentational components** render UI — in `components/`

## Form Patterns

### Controlled Components
```typescript
const [value, setValue] = useState("");
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
```

## Data Fetching Patterns

| Context | Pattern |
|---------|---------|
| SSR in `getServerSideProps` | Direct fetch with error handling |
| Client-side queries | `useQuery` from React Query |
| Client-side mutations | `useMutation` from React Query |

## Error Handling

### Server-Side (API Routes)
```typescript
try {
  const result = await someOperation();
  return res.status(200).json({ success: true, data: result });
} catch (error) {
  console.error("Operation failed:", error);
  return res.status(500).json({ success: false, message: "Something went wrong" });
}
```

### Client-Side
```typescript
try {
  await mutateAsync(data);
} catch (error) {
  // Display error via toast or alert
}
```

## Styling Patterns

### Preferred: MUI sx prop with theme tokens
```typescript
<Box sx={{ color: "text.primary", bgcolor: "background.paper", p: 2 }}>
```

### Avoid: Hardcoded hex values
```typescript
// BAD
<Box sx={{ color: "#1C1C1A", backgroundColor: "#FEFDFC" }}>

// GOOD
<Box sx={{ color: "text.primary", bgcolor: "background.default" }}>
```

## Design Token Integration (Design Workflow)

When the design workflow produces `design/{ticket-id}/tokens.json`, map Figma tokens to CSS custom properties:

### Token → CSS Variable Mapping
```json
{
  "color-primary": "--color-primary",
  "color-secondary": "--color-secondary",
  "font-heading": "--font-heading",
  "spacing-lg": "--spacing-lg",
  "radius-md": "--radius-md",
  "shadow-card": "--shadow-card"
}
```

### Applying Design Tokens
```typescript
// tokens.json provides the mapping
// Apply via CSS custom properties or MUI theme
<Box sx={{
  color: "var(--color-primary)",
  fontFamily: "var(--font-heading)",
  p: "var(--spacing-lg)",
  borderRadius: "var(--radius-md)"
}}>
```

### Rules
1. **Never hardcode hex values** from Figma — always use token variables
2. **Reference `tokens.json`** for the current ticket's design system
3. **Use `figma_get_variable_defs`** to extract tokens if `tokens.json` is missing
4. **Component output** goes to `design/{ticket-id}/components/{SliceName}/` during design workflow, then migrates to `src/components/` after verification

## Testing Patterns

### Jest + React Testing Library
```typescript
import { render, screen } from "@testing-library/react";
import MyComponent from "./MyComponent";

test("renders heading", () => {
  render(<MyComponent />);
  expect(screen.getByRole("heading")).toBeInTheDocument();
});
```

## Logging

### Server-Side
Use `console.log` / `console.error` initially. Add structured logging (pino/winston) when needed.

### Client-Side
Use `console.log` for development. No PII in client logs.

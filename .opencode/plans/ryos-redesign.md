# RY/OS — Neural Engineering System: Execution Plan

## Architecture Decision

**Single-page scroll-driven experience.** The entire site is one page with a persistent3D canvas (React Three Fiber). DOM overlays handle text/forms. GSAP ScrollTrigger drives camera position and section transitions. Lenis provides smooth scroll.

**Contact form backend:** Resend (free tier, 100 emails/day, zero config with Next.js API routes). The form submits to `/api/contact` which sends to `yadavrohit0660@gmail.com`.

---

## File Structure (New/Modified)

```
src/
├── app/
│   ├── layout.tsx              # Strip Navbar/Footer, add3D canvas + cursor + Lenis
│   ├── page.tsx                # Single scroll page with all sections
│   ├── globals.css             # Complete rewrite — RY/OS visual language
│   └── api/contact/route.ts    # Resend email API
├── components/
│   ├── canvas/
│   │   ├── Scene.tsx           # Master3D scene (fog, lights, environment)
│   │   ├── NeuralCore.tsx      # Hero 3D core (procedural geometry + shaders)
│   │   ├── Particles.tsx       # GPU instanced particle system
│   │   ├── SkillOrbit.tsx      # Skills solar system (orbiting nodes)
│   │   ├── QAPipeline.tsx      # QA Lab 3D testing pipeline
│   │   ├── ProjectArchive.tsx  # Projects floating archive
│   │   └── Environment.tsx     # Fog, grid, atmospheric effects
│   ├── sections/
│   │   ├── HeroSection.tsx     # Boot sequence + core + typography
│   │   ├── AboutSection.tsx    # Identity + floating tech nodes
│   │   ├── ExperienceSection.tsx # Time tunnel
│   │   ├── SkillsSection.tsx   # Solar system overlay
│   │   ├── QALabSection.tsx    # Testing pipeline
│   │   ├── ProjectsSection.tsx # 3D archive
│   │   ├── ContactSection.tsx  # Transmission portal + form
│   │   └── FooterSection.tsx   # System shutdown
│   ├── ui/
│   │   ├── CustomCursor.tsx    # Inertia cursor with context
│   │   ├── NavigationHUD.tsx   # Floating RY/MENU system
│   │   ├── ScrollIndicator.tsx # Vertical progress + section numbers
│   │   ├── MagneticButton.tsx  # Liquid hover magnetic buttons
│   │   ├── BootSequence.tsx    # INITIALIZING RY/OS... animation
│   │   └── SectionLabel.tsx    # SYSTEM / 01 labels
│   └── shaders/
│       ├── fresnel.ts          # Glass/fresnel material
│       ├── noise.ts            # Noise distortion
│       └── particles.ts        # Particle vertex/fragment
├── hooks/
│   ├── useMouse.ts             # Mouse position + velocity + spring
│   ├── useScrollProgress.ts    # Normalized scroll position
│   └── useCursorContext.ts     # Cursor state (VIEW/EXPLORE/etc)
├── lib/
│   ├── scroll.ts               # GSAP ScrollTrigger setup
│   └── lenis.ts                # Lenis smooth scroll config
└── data/
    ├── profile.ts              # Update title to "Full-Stack Developer × QA Engineer"
    ├── experience.ts           # Keep as-is
    ├── projects.ts             # Keep as-is
    ├── skills.ts               # Flatten for orbit display
    └── certificates.ts         # Keep as-is
```

---

## Dependencies to Install

```
resend                    # Email API
@gsap/react              # React GSAP integration (if needed)
```

Everything else (three, @react-three/fiber, @react-three/drei, gsap, lenis, framer-motion) is already installed.

---

## Execution Phases

### Phase 1: Core Infrastructure

**Files:** `layout.tsx`, `globals.css`, `Scene.tsx`, `CustomCursor.tsx`, `useMouse.ts`, `useCursorContext.ts`, `lenis.ts`, `NavigationHUD.tsx`, `ScrollIndicator.tsx`, `Particles.tsx`, `Environment.tsx`, `BootSequence.tsx`

1. Rewrite `globals.css` — RY/OS color palette (#05070A, #0B1017, #111923), remove light theme, cursor:none, custom font vars
2. Rewrite `layout.tsx` — Remove Navbar/Footer imports, add3D canvas, custom cursor, Lenis provider
3. Create `useMouse.ts` — Spring-based mouse tracking with velocity
4. Create `useCursorContext.ts` — Context provider for cursor state
5. Create `CustomCursor.tsx` — Luminous dot + ring + inertia + context labels
6. Create `Scene.tsx` — Master3D scene with fog, lights, camera rig
7. Create `Particles.tsx` — InstancedMesh particle system (500-2000 particles)
8. Create `Environment.tsx` — Volumetric fog, faint grid, atmospheric noise
9. Create `NavigationHUD.tsx` — Floating RY/MENU, full-screen nav overlay
10. Create `ScrollIndicator.tsx` — Vertical progress with section numbers
11. Create `BootSequence.tsx` — "INITIALIZING RY/OS..." → "SYSTEM ONLINE"
12. Create `lenis.ts` — Lenis config + GSAP ScrollTrigger integration

### Phase 2: Hero

**Files:** `HeroSection.tsx`, `NeuralCore.tsx`, `fresnel.ts`, `noise.ts`, `MagneticButton.tsx`, `SectionLabel.tsx`

1. Create shader files (fresnel, noise distortion)
2. Create `NeuralCore.tsx` — Procedural 3D object: icosahedron + wireframe + rings + particles + distortion shader
3. Create `MagneticButton.tsx` — Cursor-attracted buttons with liquid hover
4. Create `SectionLabel.tsx` — "SYSTEM / 01" style labels
5. Create `HeroSection.tsx` — Boot → core reveal → typography → scroll transition
6. Wire scroll transition: camera moves through core, particles rearrange

### Phase 3: About

**Files:** `AboutSection.tsx`

1. Particle identity structure (text forms from particles)
2. Floating technology nodes at different depths
3. Glass holographic portrait frame with mouse parallax
4. Hover: tech node comes forward, description appears

### Phase 4: Experience

**Files:** `ExperienceSection.tsx`

1. 3D time tunnel with spatial year typography
2. Scroll-driven camera movement through years
3. Experience cards emerge from environment on approach
4. Cards dissolve back into particles when camera moves away

### Phase 5: Skills

**Files:** `SkillOrbit.tsx`, `SkillsSection.tsx`

1. Create `SkillOrbit.tsx` — Orbiting technology nodes around center core
2. Create `SkillsSection.tsx` — DOM overlay for skill details
3. Hover: selected tech comes forward, others recede
4. No progress bars, no percentages — orbital position = proficiency

### Phase 6: QA Lab

**Files:** `QAPipeline.tsx`, `QALabSection.tsx`

1. Create `QAPipeline.tsx` — 3D testing pipeline (9 stages as physical objects)
2. Create `QALabSection.tsx` — DOM overlay for stage details
3. Each stage: requirement object → processing → defect → fix → verified
4. Hover: stage moves toward camera, shows detail

### Phase 7: Projects

**Files:** `ProjectArchive.tsx`, `ProjectsSection.tsx`

1. Create `ProjectArchive.tsx` — Floating digital artifacts in space
2. Create `ProjectsSection.tsx` — DOM overlay for project cards
3. Hover: magnetic attraction, shader distortion, environment darkens
4. Click: object expands, camera enters, shows detail (tech stack, role, features)

### Phase 8: Contact

**Files:** `ContactSection.tsx`, `api/contact/route.ts`

1. Install `resend`
2. Create `api/contact/route.ts` — POST handler, sends email via Resend
3. Create `ContactSection.tsx` — Transmission portal, form with validation
4. Submission animation: CONNECTING → VALIDATING → TRANSMITTING → DELIVERED
5. Portal visual: floating ring geometry with particle effects

### Phase 9: Footer

**Files:** `FooterSection.tsx`

1. Objects dissolve into particles
2. Typography remains: ROHIT YADAV / BUILD. TEST. AUTOMATE.
3. "SYSTEM SHUTDOWN" → fade to black

### Phase 10: Polish

**Files:** Various

1. Performance: adaptive pixel ratio, lazy-load heavy scenes
2. Mobile: touch interaction, reduced particles, simplified geometry
3. Reduced-motion: respect `prefers-reduced-motion`
4. Fallback: non-WebGL devices get a clean minimal experience
5. Sound architecture: optional interaction sounds (hover, click)
6. Run all tests, lint, typecheck

---

## Contact Form Spec

**API Route:** `POST /api/contact`
**Payload:** `{ name, email, subject, message }`
**Service:** Resend (API key in env var `RESEND_API_KEY`)
**Recipient:** `yadavrohit0660@gmail.com`
**Validation:** Server-side (all fields required, email format)
**Response:** `{ success: boolean, message: string }`

---

## Critical Constraints

1. **No light theme** — This is a dark-only immersive experience
2. **No page navigation** — Single scroll page, no React Router
3. **No standard cursor** — Custom cursor everywhere, `cursor: none`
4. **60fps target** — Adaptive pixel ratio, instanced meshes, lazy scenes
5. **Mobile fallback** — Reduced particles, touch events, no cursor
6. **Content accuracy** — Use existing data files, no invented content
7. **Performance-first** — Each3D scene loads only when in view

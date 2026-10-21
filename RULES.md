# RULES.md — Anti-Slop, Motion & Engineering Guardrails
> **Notice**: This file also serves as `.cursorrules` for IDE-level automated linting and agentic adherence.

---

## 1. CORE PHILOSOPHY: ANTI-SLOP MANIFESTO

We build digital instruments, not generic marketing templates. Ashmit Kathat is an **Elite Design Engineer** and **UI/UX Architect** bridging Figma system architecture, React/Tailwind code, and AI orchestration. The portfolio must radiate technical competence, architectural restraint, and physical tactile joy.

### The 7 Golden Laws
1. **Never Default to Generic AI Aesthetics**: AI-generated templates always gravitate toward dark purple mesh gradients, over-blurred floating glass cards, and meaningless 3D floating shapes. These are strictly banned.
2. **Design as an Industrial Tool**: Treat UI surfaces like machined aluminum, powder-coated steel, and high-contrast e-ink or monochrome LCD viewfinders (inspired by Braun, Teenage Engineering, and Swiss Grid graphic design).
3. **Every Pixel Has a Specification**: Spacing must adhere to an absolute 8pt grid (`4px`, `8px`, `16px`, `24px`, `32px`, `48px`, `64px`). No arbitrary `margin: 17px` or `padding: 23px`.
4. **Physical Micro-Physics Over Artificial Easing**: Digital elements have weight and resistance. Always prefer physics-based springs (`stiffness: 380, damping: 30`) over arbitrary `ease-in-out` timing curves.
5. **Radical Transparency (The UX X-Ray Rule)**: Every interface element must be explainable. If a button is 44px tall, it is because of Fitts's Law touch target minimums. The UI must feature an X-Ray mode that exposes this design intelligence live.
6. **Zero Placeholders, Zero Fake Data**: Never use `Lorem Ipsum`, `foo/bar`, `John Doe`, or mock placeholders. All copy, metrics, project notes, and coordinates must come from verified real-world records.
7. **Production-Ready Code Quality**: Clean TypeScript, strict types, zero `any`, accessible semantic HTML, keyboard navigable, and sub-100ms interaction feedback.

---

## 2. STRICT VISUAL & STYLING GUARDRAILS

### 🚫 Strictly Forbidden Patterns
| Forbidden Anti-Pattern | Why It Is Banned | Approved Replacement |
| :--- | :--- | :--- |
| **Dark Mode (`#000000`, `#0a0a0a`, `#0f172a`)** | Generic, overdone AI portfolio cliché. Hides poor spacing hierarchy. | **Swiss Industrial Daylight (`#F4F5F7` Alabaster)** |
| **Neon / Cyan / Purple Gradients** | Vapid "crypto-AI" marketing look that screams amateur template. | **Monochrome Inks with Signal Orange (`#FF4F00`) & Blueprint Blue (`#0047FF`)** |
| **Warm Cream / Beige / Coffee Tints** | Reads like a hipster café blog, not a precision Design Engineer. | **Architectural Cool Alabaster (`#F4F5F7`) and Crisp White (`#FFFFFF`)** |
| **Heavy Glassmorphism (`backdrop-blur-xl bg-white/10`)** | Legibility nightmare; obscures structural grid hierarchy. | **Opaque Elevated Modules (`#FFFFFF`) with 1px Hairline Borders (`#DDE1E7`)** |
| **Diffuse Muddy Shadows (`shadow-2xl`)** | Creates visual mush; lacks mechanical tactility. | **Hard Hairline Borders (`1px solid #DDE1E7`) or Crisp Offset Micro-Drop (`0 1px 2px rgba(0,0,0,0.05)`)** |
| **Default Inter Everywhere** | Faceless corporate generic typography. | **3-Font System: `Instrument Serif` (Italic accents) + `Geist Sans` + `JetBrains Mono`** |
| **Heavy 3D Canvas Renders (Three.js bloat)** | Kills mobile performance, drains battery, slow initial load. | **High-craft 2D SVGs, Interactive Canvas, and DOM Physics** |

### ✅ Mandatory Color Palette
```css
:root {
  /* Canvas & Structural Surfaces */
  --canvas-bg: #F4F5F7;          /* Cool Alabaster: Primary background */
  --surface-card: #FFFFFF;       /* Elevated Module: Cards, drawers, modals */
  --surface-recessed: #EAECEF;   /* Recessed Wireframe: Scrubber backs, code blocks */
  --border-hairline: #DDE1E7;    /* 1px Structural Grid Border */
  --border-strong: #111315;      /* High-contrast active outline */

  /* Inks & Contrast */
  --ink-primary: #111315;        /* Deep Carbon: Headings, primary text */
  --ink-secondary: #5A6065;      /* Muted Graphite: Body copy, captions */
  --ink-tertiary: #8C9298;       /* Technical Metadata: Monospace tags, labels */

  /* Precision Accents */
  --accent-orange: #FF4F00;      /* International Signal Orange: Primary CTA, active toggles */
  --accent-blue: #0047FF;        /* Cobalt Blueprint: X-Ray mode, wireframe nodes, technical tokens */
  --accent-emerald: #107C41;     /* Oxidized Emerald: Live availability status badge */
}
```

---

## 3. MOTION & MICRO-PHYSICS GUARDRAILS

### Framer Motion Physics Standards
Every animated surface must feel mechanical and calibrated, mirroring physical buttons on Braun or Teenage Engineering instruments.

```typescript
// Standard Spring Configurations for Framer Motion
export const TRANSITIONS = {
  // Primary interactive elements (Buttons, toggles, badges)
  tactileSpring: {
    type: "spring",
    stiffness: 380,
    damping: 30,
    mass: 0.8,
  },
  // Snappy micro-interactions (Checkboxes, tooltips, tags)
  snappyMicro: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },
  // Heavy mechanical surfaces (Drawers, modals, overlays)
  surfaceSheet: {
    type: "spring",
    stiffness: 280,
    damping: 28,
    mass: 1.2,
  },
  // Wireframe scrubber / draggable slider
  scrubberPhysics: {
    type: "spring",
    damping: 40,
    stiffness: 400,
  }
} as const;
```

### Micro-Interactions & Tap States
1. **The Tactile Compression Rule**: All interactive buttons, cards, and dock icons MUST provide compression feedback:
   ```tsx
   whileTap={{ scale: 0.97 }}
   // Or Tailwind: active:scale-[0.97] transition-transform duration-75
   ```
2. **Hover Elevation**: Never use dramatic hover lifts (`translate-y-4`). Restrict hover translation to `translate-y-[-1px]` or `border-color` shifts to `--ink-primary`.
3. **Reduced Motion Respect**: Always support `prefers-reduced-motion`:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, ::before, ::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```

---

## 4. CODE ARCHITECTURE & TYPESCRIPT STANDARDS

### Project Organization
- **Separation of Concerns**: Never embed static project copy inside React components. All case study narratives, metrics, and metadata MUST be imported from `src/data/portfolioData.ts`.
- **Zero `any` Policy**: Every API, hook, and component prop must be strictly typed.
- **Component File Anatomy**:
  ```tsx
  // 1. Imports: React, external packages, internal components, types
  // 2. Interface / Props Definition
  // 3. Component Implementation
  // 4. Export (prefer named exports)
  ```
- **X-Ray Compliance**: Every primary section and module must expose data attributes to allow the UX X-Ray engine to attach overlays:
  ```tsx
  <section 
    data-xray-target="case-study-hero"
    data-xray-spec="Fitts's Law CTA: min-h-12, 8pt Grid spacing"
    className="..."
  >
  ```

---

## 5. ACCESSIBILITY & PERFORMANCE COMPLIANCE

### Accessibility (a11y)
- **Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text. (`#111315` on `#F4F5F7` delivers 15.2:1 contrast).
- **Focus Rings**: Never remove focus rings without replacing them. Mandatory tactile outline:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4F00] focus-visible:ring-offset-2`
- **Icon Buttons**: All icon buttons must have an explicit `aria-label` or visually hidden screen reader text.
- **Keyboard Shortcuts**:
  - `X`: Toggle Global UX X-Ray Mode
  - `Cmd+K` / `Ctrl+K`: Open Command Palette / Hardware Launchpad
  - `Esc`: Dismiss open Drawers or Modals

### Performance
- **Zero Heavy Assets**: Image formats must be WebP/AVIF with explicit `width`, `height`, and `sizes`.
- **Bundle Hygiene**: No massive animation libraries when Framer Motion handles all physics.
- **Lighthouse Targets**: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO.

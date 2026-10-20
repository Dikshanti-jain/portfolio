# DESIGN_SYSTEM.md — Swiss Industrial Daylight Design System
## Architectural Tokens, Typography, Grids, and Micro-Physics Specification
### Portfolio for Ashmit Kathat — Design Engineer & UI/UX Systems Architect

---

## 1. DESIGN PHILOSOPHY: SWISS INDUSTRIAL DAYLIGHT

The **Swiss Industrial Daylight** design system is inspired by the functional minimalism of **Dieter Rams (Braun)**, the mechanical modularity of **Teenage Engineering**, the typographic precision of **Josef Müller-Brockmann (Swiss Style)**, and the engineering craft of **Linear**.

### Core Tenets
1. **Physicality Over Ephemerality**: Interfaces are treated like calibrated measuring tools and tactile instruments. Surfaces have crisp boundaries, mechanical tactile states, and tangible resistance.
2. **Daylight Clarity**: Rejects the lazy industry default of "dark mode + neon blur." Daylight exposes spatial hierarchy, typographic balance, and structural integrity.
3. **Exposed Structure**: Rather than concealing layout logic, structural 1px hairline grids and crosshair junction markers (`+`) are deliberately celebrated.
4. **Purpose-Driven Accents**: International Signal Orange (`#FF4F00`) indicates primary action and warmth; Cobalt Blueprint Blue (`#0047FF`) demystifies design architecture and systems logic; Oxidized Emerald (`#107C41`) communicates live system and availability status.

---

## 2. COLOR PALETTE & CSS TOKENS

### 2.1 Complete Token Matrix
| Token Name | HEX | HSL | RGB | Role / Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--canvas-bg` | `#F4F5F7` | `220°, 12%, 96%` | `rgb(244, 245, 247)` | Primary application canvas background (Cool Alabaster) |
| `--surface-card` | `#FFFFFF` | `0°, 0%, 100%` | `rgb(255, 255, 255)` | Elevated modules, cards, drawer containers, popovers |
| `--surface-recessed` | `#EAECEF` | `216°, 13%, 93%` | `rgb(234, 236, 239)` | Wireframe scrubber base, code snippets, sunken wells |
| `--border-hairline` | `#DDE1E7` | `216°, 16%, 89%` | `rgb(221, 225, 231)` | 1px exposed structural grid lines, dividers, card strokes |
| `--border-strong` | `#111315` | `210°, 11%, 7%` | `rgb(17, 19, 21)` | High-contrast active strokes, focus indicators, toggles |
| `--ink-primary` | `#111315` | `210°, 11%, 7%` | `rgb(17, 19, 21)` | Primary headings, high-contrast labels, active icons |
| `--ink-secondary` | `#5A6065` | `206°, 6%, 38%` | `rgb(90, 96, 101)` | Body paragraphs, secondary descriptions, passive labels |
| `--ink-tertiary` | `#8C9298` | `208°, 6%, 57%` | `rgb(140, 146, 152)` | Monospace coordinates, timestamps, token labels |
| `--accent-orange` | `#FF4F00` | `19°, 100%, 50%` | `rgb(255, 79, 0)` | Primary CTA buttons, active state indicators, scrubbers |
| `--accent-blue` | `#0047FF` | `223°, 100%, 50%` | `rgb(0, 71, 255)` | UX X-Ray blueprint annotations, specs, wireframe nodes |
| `--accent-emerald` | `#107C41` | `147°, 77%, 27%` | `rgb(16, 124, 65)` | "Available for Internships" live pulsating telemetry dot |

### 2.2 Global CSS Variables (`:root`)
```css
:root {
  /* Surfaces */
  --bg-canvas: #F4F5F7;
  --bg-surface: #FFFFFF;
  --bg-recessed: #EAECEF;
  --border-hairline: #DDE1E7;
  --border-strong: #111315;

  /* Inks */
  --text-primary: #111315;
  --text-secondary: #5A6065;
  --text-tertiary: #8C9298;

  /* Accents */
  --accent-orange: #FF4F00;
  --accent-orange-hover: #E04500;
  --accent-blue: #0047FF;
  --accent-blue-subtle: rgba(0, 71, 255, 0.06);
  --accent-emerald: #107C41;
  --accent-emerald-subtle: rgba(16, 124, 65, 0.1);

  /* Grid & Geometry */
  --grid-line-width: 1px;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-full: 9999px;

  /* Spring Physics Timers */
  --ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-micro: 120ms;
}
```

### 2.3 Tailwind CSS Configuration (`tailwind.config.ts`)
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#F4F5F7",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          recessed: "#EAECEF",
        },
        hairline: {
          DEFAULT: "#DDE1E7",
          strong: "#111315",
        },
        ink: {
          primary: "#111315",
          secondary: "#5A6065",
          tertiary: "#8C9298",
        },
        signal: {
          orange: "#FF4F00",
          "orange-hover": "#E04500",
        },
        blueprint: {
          blue: "#0047FF",
          subtle: "rgba(0, 71, 255, 0.06)",
        },
        status: {
          emerald: "#107C41",
          "emerald-subtle": "rgba(16, 124, 65, 0.12)",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Geist Mono", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
        tight: "-0.01em",
        widest: "0.12em",
      },
      boxShadow: {
        tactile: "0 1px 2px rgba(17, 19, 21, 0.04)",
        "tactile-hover": "0 2px 4px rgba(17, 19, 21, 0.06)",
        drawer: "0 -4px 24px rgba(17, 19, 21, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 3. TYPOGRAPHY SYSTEM (3-FONT HIERARCHY)

```
+-----------------------------------------------------------------------------------------+
|                                TYPOGRAPHY HIERARCHY                                     |
+-----------------------------+-----------------------------+-----------------------------+
| Instrument Serif (Italic)   | Geist Sans / Jakarta Sans   | JetBrains Mono / Geist Mono |
| Editorial Emphasis & Craft  | Crisp UI, Headings & Copy   | Metadata, Coordinates, Specs|
| "digital instruments"       | "Architecting systems..."   | [LAT: 26.9124° N · 8PT GRID]|
+-----------------------------+-----------------------------+-----------------------------+
```

### 3.1 Type Scale Specification
| Level / Role | Font Family | Size | Line Height | Tracking | Weight / Style | Example Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | `Instrument Serif` + `Geist Sans` | `56px` / `3.5rem` | `1.08` | `-0.03em` | Regular Italic + Bold | *"Architecting design systems in Figma..."* |
| **H1 Case Title** | `Geist Sans` | `32px` / `2rem` | `1.15` | `-0.025em` | SemiBold `600` | Case Study Drawer Header |
| **H2 Section Title** | `Geist Sans` | `24px` / `1.5rem` | `1.25` | `-0.02em` | Medium `500` | Section headings: *"Selected Works"* |
| **H3 Module Subhead** | `Geist Sans` | `18px` / `1.125rem`| `1.35` | `-0.015em` | Medium `500` | Feature subheads, node card titles |
| **Body Large** | `Geist Sans` | `16px` / `1rem` | `1.55` | `-0.01em` | Regular `400` | Hero intro narrative, lead paragraphs |
| **Body Regular** | `Geist Sans` | `14px` / `0.875rem`| `1.6` | `0em` | Regular `400` | Case study explanations, friction points |
| **Monospace Spec** | `JetBrains Mono` | `11px` / `0.6875rem`| `1.4` | `+0.12em` | Medium `500` All-Caps | `[01 / FLAGSHIP SYSTEM]`, `LAT: 26.9124° N` |
| **Micro Token** | `JetBrains Mono` | `10px` / `0.625rem`| `1.2` | `+0.08em` | Bold `700` All-Caps | `8PT`, `44PX`, `WCAG: AAA`, `FMR: 380/30` |

### 3.2 The Editorial Italic Rule
- Inside technical and hero headers, reserve italic `Instrument Serif` exclusively for words denoting **craft**, **human intention**, or **physicality**.
- *Example*: "Designing *instruments*, validating with *code*, engineered for *speed*."

---

## 4. 8PT BASELINE GRID & SPACING SPECIFICATION

All spacing, margins, paddings, and dimension constraints must conform strictly to the 8pt geometric progression. No off-grid values are permissible.

### 4.1 Spacing Tokens
```
Token       Value       Tailwind Class      Allowed Usage
----------------------------------------------------------------------------------
space-05    2px         gap-0.5 / p-0.5     Hairline offsets, crosshair offsets
space-1     4px         gap-1 / p-1         Tight badge padding, micro-icon spacing
space-2     8px         gap-2 / p-2         Button internal icon gaps, compact cells
space-3     12px        gap-3 / p-3         Dock item padding, badge margins
space-4     16px        gap-4 / p-4         Standard card padding, component gaps
space-6     24px        gap-6 / p-6         Section internal padding, module gutters
space-8     32px        gap-8 / p-8         Card module separations
space-12    48px        gap-12 / p-12       Major section margins, hero clearance
space-16    64px        gap-16 / p-16       Page block dividers
space-24    96px        gap-24 / p-24       Above-the-fold hero breathing room
```

---

## 5. EXPOSED 1PX HAIRLINE GRID & CROSSHAIR JUNCTIONS

### 5.1 The Crosshair Marker (`+`)
At major grid module intersections, a subtle `+` character or geometric SVG junction marker anchors the eye to the underlying structural architecture.

```
       |
       |  1px #DDE1E7
       |
-------+-------  Crosshair: 9px x 9px, color: #8C9298, weight: 1px
       |
       |
```

### 5.2 Crosshair React Component Specification
```tsx
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <span 
      aria-hidden="true" 
      className={`absolute select-none font-mono text-[10px] text-ink-tertiary leading-none pointer-events-none ${className}`}
    >
      +
    </span>
  );
}
```
**Positioning Rules**: Placed at `top-[-5px] left-[-5px]`, `top-[-5px] right-[-5px]`, `bottom-[-5px] left-[-5px]`, and `bottom-[-5px] right-[-5px]` on parent modules containing `border border-hairline`.

---

## 6. MICRO-PHYSICS & TACTILE COMPRESSION SPECIFICATIONS

### 6.1 Mechanical Spring Constants
Digital components in this system possess calibrated physical mass, spring tension, and friction damping.

```typescript
export const SPRINGS = {
  // Push buttons, toggle switches, filter tabs
  tactileButton: {
    type: "spring",
    stiffness: 380,
    damping: 30,
    mass: 0.8,
  },
  // Micro-indicators, tooltips, toast entries
  snappyMicro: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  },
  // Bottom sheet drawers, modals, full-page X-Ray overlays
  mechanicalSheet: {
    type: "spring",
    stiffness: 280,
    damping: 28,
    mass: 1.2,
  },
  // Drag slider for Before/After wireframe comparison
  wireframeScrubber: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1.0,
  },
} as const;
```

### 6.2 The Tactile Tap Compression Rule
Every button, card, and clickable element MUST compress upon interaction:
```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="relative inline-flex items-center justify-center ..."
>
```

---

## 7. CORE COMPONENT DESIGN SPECIFICATIONS

### 7.1 Primary Tactile Button (Signal Orange)
- **Geometry**: `min-h-[44px]`, `px-5`, `py-2.5`, `rounded-[6px]`.
- **Background**: `#FF4F00` (Signal Orange).
- **Ink**: `#FFFFFF` (Pure White, Bold `600`, `-0.01em` tracking).
- **Border**: `1px solid rgba(0, 0, 0, 0.15)`.
- **States**:
  - *Default*: Background `#FF4F00`, Box Shadow `0 1px 2px rgba(17, 19, 21, 0.1)`.
  - *Hover*: Background `#E04500`, translateY `[-1px]`.
  - *Active (Tap)*: Scale `0.97`, translateY `[0px]`.
  - *Focus-Visible*: Outline `2px solid #FF4F00`, offset `2px`.

### 7.2 Secondary Hairline Button
- **Geometry**: `min-h-[44px]`, `px-5`, `py-2.5`, `rounded-[6px]`.
- **Background**: `#FFFFFF` (Elevated Surface).
- **Ink**: `#111315` (Deep Carbon).
- **Border**: `1px solid #DDE1E7`.
- **States**:
  - *Default*: Background `#FFFFFF`, Border `#DDE1E7`.
  - *Hover*: Border `#111315`, Background `#F4F5F7`.
  - *Active (Tap)*: Scale `0.97`.

### 7.3 Status & Availability Pill Badge
- **Geometry**: `h-[26px]`, `px-2.5`, `rounded-full`.
- **Background**: `#FFFFFF`, `border 1px solid #DDE1E7`.
- **Dot Indicator**: `w-2 h-2`, `rounded-full`, `#107C41` (Oxidized Emerald) with CSS pulsating ring `animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite`.
- **Typography**: `font-mono text-[11px] uppercase tracking-wider text-ink-primary`.
- **Copy**: `AVAILABLE FOR INTERNSHIPS (SUMMER / FALL)`.

### 7.4 UX X-Ray Blueprint Annotation Badge
- **Geometry**: `inline-flex items-center gap-1.5`, `px-2`, `py-1`, `rounded-[4px]`.
- **Background**: `rgba(0, 71, 255, 0.06)`.
- **Border**: `1px solid #0047FF` (Cobalt Blueprint Blue).
- **Ink**: `#0047FF` (Cobalt Blueprint Blue).
- **Typography**: `font-mono text-[10px] font-semibold tracking-wider uppercase`.
- **Content Examples**:
  - `[GRID: 8PT / 24PX GAP]`
  - `[FITTS TARGET: 48PX]`
  - `[SPRING: S:380 / D:30]`
  - `[CONTRAST: 15.2:1 AAA]`

### 7.5 Hardware Launchpad Dock (Fixed Bottom)
- **Position**: `fixed bottom-6 left-1/2 -translate-x-1/2 z-50`.
- **Container**: `bg-[#FFFFFF] border border-[#DDE1E7] rounded-[12px] p-1.5 shadow-drawer backdrop-blur-none`.
- **Item Buttons**: `h-10 px-3.5 flex items-center gap-2 rounded-[8px] font-mono text-[12px] text-ink-primary hover:bg-[#F4F5F7] transition-all`.
- **Shortcut Tag**: `bg-[#EAECEF] px-1.5 py-0.5 rounded text-[10px] text-ink-tertiary font-mono`.

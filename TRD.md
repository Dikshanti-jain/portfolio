# TRD.md — Technical Requirements Document
## High-Craft Architecture, Framework Stack, Directory Schema & Deployment
### Portfolio for Ashmit Kathat — Design Engineer & UI/UX Systems Architect

---

## 1. TECH STACK SPECIFICATION

| Category | Technology | Version | Architectural Rationale |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | `15.x` | Server-side rendering, instant page transitions, shallow URL routing for drawers, dynamic OpenGraph generation. |
| **Runtime / Library** | **React** | `19.x` | Modern server components, fast concurrent hydration, optimized transitions. |
| **Language** | **TypeScript** | `5.x` (Strict) | Zero `any` policy. Enforces full end-to-end type safety across portfolio data schemas, X-Ray state, and component props. |
| **Styling** | **Tailwind CSS** | `3.4.x / 4.x` | Atomic utility classes combined with custom CSS variables for the Swiss Industrial Daylight theme. |
| **Animation Physics** | **Framer Motion** | `11.x` | Calibrated mechanical springs (`stiffness: 380, damping: 30`), layout animations (`layoutId`), tactile tap compression. |
| **Drawer Primitives** | **Vaul** | `0.9.x` | Mobile & desktop origin-aware drawers with physical drag-to-dismiss and background canvas scaling (`scale-[0.97]`). |
| **Command Palette** | **CMDK / Radix UI** | `0.1.x` | Accessible, rapid keyboard navigation (`Cmd+K` / `Ctrl+K`) for direct recruiter flow. |
| **Toasts** | **Sonner** | `1.5.x` | Clean, un-styled or high-contrast tactile notifications for 1-click email and link copying. |
| **Icons** | **Lucide React** | `0.400+` | Monoline, geometric 1.5px stroke icons matching the Swiss industrial aesthetic. |
| **Fonts** | **next/font/google** | Built-in | Zero-layout-shift local font loading for `Instrument Serif`, `Geist Sans` (or `Plus Jakarta Sans`), and `JetBrains Mono`. |

---

## 2. REPOSITORY & DIRECTORY SCHEMA

```
portfolio/
├── .cursorrules                       # IDE-level anti-slop & coding guardrails
├── RULES.md                           # Human-readable engineering & motion manifesto
├── PRD.md                             # Product requirements & user stories
├── DESIGN_SYSTEM.md                   # Visual tokens, typography scales, & 8pt grid
├── TRD.md                             # Technical architecture (this file)
├── PORTFOLIO_DATA.md                  # Canonical project data & case study content
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── public/
│   ├── favicon.ico
│   ├── og-image.png                   # Fallback social share banner
│   ├── resume/
│   │   └── ashmit_kathat_resume.pdf   # Canonical recruiter download asset
│   └── projects/
│       ├── devmate/
│       │   ├── wireframe-lofi.webp    # Low-Fi problem wireframe
│       │   └── final-ui-hifi.webp     # High-Craft production screen
│       ├── floodwatch/
│       │   ├── gis-lofi-friction.webp # High-stress field friction map
│       │   └── mission-control.webp   # Production 2D Leaflet telemetry
│       └── ultron/
│           ├── terminal-tokens.webp   # Component tokens & command palette
│           └── agent-approval.webp    # Human-in-the-loop interface
└── src/
    ├── app/
    │   ├── layout.tsx                 # Root layout, font definitions, context providers
    │   ├── page.tsx                   # Main single-page canvas with shallow drawer routing
    │   ├── globals.css                # Swiss Industrial Daylight CSS variables & base styles
    │   ├── og/
    │   │   └── route.tsx              # Dynamic OpenGraph image generator (Edge runtime)
    │   ├── sitemap.ts                 # XML sitemap generator
    │   └── robots.ts                  # Search engine crawl instructions
    ├── components/
    │   ├── ui/                        # Low-level design system primitives
    │   │   ├── Button.tsx             # Tactile button (Primary, Secondary, Ghost)
    │   │   ├── Crosshair.tsx          # 1px grid corner junction marker (+)
    │   │   ├── Badge.tsx              # Monospace spec badges & emerald status pill
    │   │   ├── HairlineBox.tsx        # 1px structural container with corner crosshairs
    │   │   └── Kbd.tsx                # Mechanical keyboard shortcut cap
    │   ├── xray/                      # UX X-Ray Blueprint Engine
    │   │   ├── XRayProvider.tsx       # Global X-Ray mode React context & keyboard listener
    │   │   ├── XRayToggle.tsx         # Sticky header toggle switch with [X] badge
    │   │   ├── XRayOverlay.tsx        # Blueprint grid & measurement box overlays
    │   │   └── XRaySpecBadge.tsx      # Cobalt blue (#0047FF) inline token annotations
    │   ├── case-studies/              # Case Study modules & drawers
    │   │   ├── CaseStudyCard.tsx      # Grid presentation card with exposed borders
    │   │   ├── CaseStudyDrawer.tsx    # Vaul-powered bottom sheet detail view
    │   │   └── WireframeScrubber.tsx  # Before/After interactive slider with physics
    │   ├── pipeline/                  # "How I Orchestrate AI" interactive proof object
    │   │   ├── AIPipelineSection.tsx  # 4-stage workbench container
    │   │   └── PipelineNodeStep.tsx   # Individual step content (Prompt vs Filter vs Token)
    │   ├── dock/                      # Hardware Launchpad Dock
    │   │   ├── HardwareDock.tsx       # Bottom fixed tactile dock container
    │   │   ├── EmailCopyButton.tsx    # 1-Click copy with Sonner toast trigger
    │   │   ├── ResumeDrawer.tsx       # Instant PDF preview drawer
    │   │   └── CommandPalette.tsx     # Cmd+K accessible command menu
    │   └── layout/
    │       ├── HeaderTelemetry.tsx    # Top sticky bar with time & coordinates
    │       └── FooterColophon.tsx     # Tech stack details, Jaipur coordinates & copyright
    ├── hooks/
    │   ├── useXRayMode.ts             # Hook to read/toggle UX X-Ray state
    │   ├── useKeyboardShortcut.ts     # Window-level shortcut listener (X, Cmd+K, Esc)
    │   └── useJaipurTime.ts           # Real-time IST clock formatter
    ├── lib/
    │   ├── transitions.ts             # Framer Motion spring constants (stiffness, damping)
    │   ├── utils.ts                   # cn() class merger (clsx + tailwind-merge)
    │   └── analytics.ts               # Privacy-friendly event dispatch (Vercel Web Analytics)
    ├── types/
    │   └── portfolio.ts               # TypeScript interfaces for projects, metrics, & nodes
    └── data/
        └── portfolioData.ts           # Canonical data source (imported by all components)
```

---

## 3. STATE MANAGEMENT ARCHITECTURE

### 3.1 Global UX X-Ray Blueprint Engine
The portfolio contains an ambient X-Ray mode that switches the visual skin from regular UI to a Cobalt Blue (`#0047FF`) architectural blueprint.

```typescript
// src/hooks/useXRayMode.ts
import { createContext, useContext, useState, useEffect } from "react";

interface XRayContextType {
  isXRayActive: boolean;
  toggleXRay: () => void;
  setXRay: (active: boolean) => void;
}

export const XRayContext = createContext<XRayContextType>({
  isXRayActive: false,
  toggleXRay: () => {},
  setXRay: () => {},
});

export function useXRayMode() {
  return useContext(XRayContext);
}
```

#### X-Ray Trigger Mechanics:
1. **Header Toggle**: Clicking the physical switch in `<HeaderTelemetry />`.
2. **Global Hotkey**: Pressing key `X` on any focused or unfocused element (excluding input fields).
3. **Storage Persistence**: Synced with `localStorage.getItem("ashmit_xray_mode")`.
4. **DOM Synchronization**: Applies class `xray-mode-active` to `document.documentElement` to effortlessly toggle CSS blueprint grids, bounding boxes, and metadata tags without React re-render cascades.

### 3.2 Case Study Drawer Deep Linking (Shallow Routing)
- Clicking a project updates the URL query string: `/?project=devmate-mentors` via Next.js `router.push('/?project=devmate-mentors', { scroll: false })`.
- When a user shares or refreshes the link, `page.tsx` checks `searchParams.project` and opens the corresponding Vaul drawer instantly.
- Background canvas scales down to `scale-[0.97]` with smooth CSS transition, preserving recruiter spatial orientation.

---

## 4. DETAILED INTERACTIVE PROOF OBJECT IMPLEMENTATION

### 4.1 Interactive Before/After Wireframe Scrubber
```tsx
// Architectural Outline: WireframeScrubber.tsx
export function WireframeScrubber({ 
  loFiImage, 
  hiFiImage, 
  loFiFrictionPoints, 
  hiFiCraftSpecs 
}: WireframeScrubberProps) {
  // Uses PointerEvent API with setPointerCapture for 60fps silky drag
  // Framer Motion spring physics handles release momentum
  // Clamped between 5% and 95% container width
  // Displays Signal Orange (#FF4F00) central tactile grip handle
  // Displays Cobalt Blue (#0047FF) friction annotations when in X-Ray mode
}
```

### 4.2 1-Click Email Copy & Sonner Toast Dispatch
```tsx
// src/components/dock/EmailCopyButton.tsx
export function EmailCopyButton({ email }: { email: string }) {
  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    toast.custom((t) => (
      <div className="bg-[#111315] text-[#FFFFFF] border border-[#DDE1E7] px-4 py-2.5 rounded-[6px] font-mono text-[12px] flex items-center gap-2 shadow-tactile">
        <span className="w-2 h-2 rounded-full bg-[#107C41]" />
        <span>COPIED TO CLIPBOARD: {email}</span>
        <span className="text-[#8C9298] text-[10px]">[Ready to paste]</span>
      </div>
    ));
  };
  // ...
}
```

---

## 5. PERFORMANCE, ASSETS & OPTIMIZATION TARGETS

### 5.1 Asset Optimization Strategy
- **Images**: All mockups, wireframes, and UI screens converted to `.webp` or `.avif` at max 2000px width.
- **Font Optimization**: Loaded via `next/font/google` with `display: 'swap'` and `subsets: ['latin']`.
  ```typescript
  // src/app/layout.tsx
  import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

  const instrumentSerif = Instrument_Serif({
    weight: "400",
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-instrument-serif",
  });
  ```
- **Bundle Hygiene**: Dynamic import (`next/dynamic`) for heavy drawer interiors to keep initial first-load JS payload strictly under **100kB**.

### 5.2 Target Lighthouse & Core Web Vitals
| Metric | Benchmark Target | Architectural Guarantee |
| :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | `< 1.2s` | Preloaded hero fonts, zero render-blocking scripts. |
| **Interaction to Next Paint (INP)** | `< 50ms` | CSS-based transforms for tap states; physics springs run on GPU compositor. |
| **Cumulative Layout Shift (CLS)** | `0.00` | Hard aspect ratios (`aspect-[16/10]`) on all project previews. |
| **Lighthouse Score** | `100 / 100 / 100 / 100` | Audited across Performance, Accessibility, Best Practices, and SEO. |

---

## 6. VERCEL DEPLOYMENT & METADATA ARCHITECTURE

### 6.1 Vercel Edge Configuration (`vercel.json`)
```json
{
  "framework": "nextjs",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 6.2 SEO & Structured JSON-LD Data
Included directly in `src/app/layout.tsx` for optimal Google search ingestion:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ashmit Kathat",
  "jobTitle": "UI/UX Designer & Design Engineer",
  "url": "https://ashmitkathat.design",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Jaipur",
    "addressRegion": "Rajasthan",
    "addressCountry": "India"
  },
  "knowsAbout": [
    "Design Systems",
    "UI/UX Design",
    "React",
    "Tailwind CSS",
    "Framer Motion",
    "AI Orchestration",
    "Figma Architecture"
  ]
}
```

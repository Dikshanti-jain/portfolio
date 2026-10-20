# Portfolio UI / UX refinement

## Baseline and branch

The supplied folder did not contain Git metadata. Its original source is preserved in the initial `main` commit. Implementation takes place on `feat/ui-ux-refinement`.

## Design direction

Preserve Swiss Industrial Daylight: cool alabaster, white modules, orange signal accents, cobalt blueprint details, serif editorial emphasis, mono labels, hairlines and crosshairs. Refine hierarchy and interaction rather than replace the identity.

## Observed problems

- The long hero headline and tall laboratory module hide the primary actions below the initial desktop viewport.
- The sticky header is constrained by an overflow ancestor; section navigation is hard to discover.
- Project cards are click-only, with uneven content and inconsistent footer padding.
- Keyboard shortcuts are registered by multiple components and can interfere with focused controls.
- The command palette lacks complete modal focus handling and semantic command controls.
- Mobile project drawers hide external project links.
- Clipboard shortcuts can announce success before copying succeeds.
- Small grey metadata and white text on bright orange have insufficient contrast.
- Reduced-motion CSS does not cover all JavaScript-driven transforms.
- Spring rotary controls do not drive the layer-stack animation.
- Resume print has no stylesheet to remove the fixed drawer's height and overflow constraints.

## Implementation sequence

1. Refine hero copy, type scale, composition, primary action and compact proof strip.
2. Add clear section navigation and active state; refine card alignment and explicit accessible open actions.
3. Add restrained section reveals, transition continuity, functional spring calibration and reduced-motion behavior.
4. Repair shortcuts, modal focus, clipboard failure, mobile actions, touch targets and resume print layout.
5. Run TypeScript, lint and production build; inspect desktop and narrow mobile layouts, keyboard paths, drawer/palette dismissal, and independent demo controls.

## Acceptance criteria

- Changes remain on the feature branch, with a recoverable original main baseline.
- The industrial identity and existing case-study content remain recognizable.
- The hero's work action is prominent without scrolling at a typical desktop viewport.
- Navigation, project actions, command search, resume and X-Ray work with the keyboard.
- Project previews retain their independent interactive controls.
- Mobile pages and drawers have no horizontal overflow or hidden essential actions.
- Motion respects user preferences and avoids layout shifts or perpetual decorative activity.
- Type check, lint and build results are reported honestly; observed checks are distinguished from unverified claims.

## Verification record

To be filled after implementation.

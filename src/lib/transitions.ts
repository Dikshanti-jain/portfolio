import type { Transition } from "framer-motion";

/**
 * Standard Framer Motion Physics Springs
 * Calibrated for tactile, mechanical Swiss Industrial interfaces.
 */
export const TRANSITIONS = {
  // Push buttons, toggle switches, filter tabs
  tactileSpring: {
    type: "spring",
    stiffness: 380,
    damping: 30,
    mass: 0.8,
  } as Transition,

  // Micro-indicators, tooltips, tags
  snappyMicro: {
    type: "spring",
    stiffness: 500,
    damping: 35,
    mass: 0.5,
  } as Transition,

  // Bottom sheet drawers, modals, heavy sheets
  surfaceSheet: {
    type: "spring",
    stiffness: 280,
    damping: 28,
    mass: 1.2,
  } as Transition,

  // Draggable slider for Before/After wireframe scrubber
  scrubberPhysics: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 1.0,
  } as Transition,
} as const;

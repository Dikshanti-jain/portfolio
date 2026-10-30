"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Layers, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { soundEngine } from "@/utils/soundEngine";

interface ExplodedLayerStackProps {
  className?: string;
  isInitiallyExploded?: boolean;
  stiffness?: number;
  damping?: number;
}

const layers = [
  { id: 1, label: "Grid", title: "Layout grid" },
  { id: 2, label: "State", title: "Interaction state" },
  { id: 3, label: "Tokens", title: "Design tokens" },
  { id: 4, label: "UI", title: "Interface surface" },
] as const;

export function ExplodedLayerStack({
  className,
  isInitiallyExploded = true,
  stiffness = 280,
  damping = 28,
}: ExplodedLayerStackProps) {
  const [isExploded, setIsExploded] = useState(isInitiallyExploded);
  const [isolatedLayer, setIsolatedLayer] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 220, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 220, damping: 30 });
  const parallaxX = useTransform(smoothMouseY, [-0.5, 0.5], [3, -3]);
  const parallaxZ = useTransform(smoothMouseX, [-0.5, 0.5], [-3, 3]);
  const spring = reducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness, damping, mass: 0.8 };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const resetParallax = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleExploded = () => {
    soundEngine.playSnap(!isExploded);
    setIsExploded(!isExploded);
  };

  const selectLayer = (id: number | null) => {
    soundEngine.playRotaryTick(id ?? 0);
    setIsolatedLayer(id);
  };

  const layerAnimation = (id: number) => ({
    z: isExploded ? (id - 1) * 36 : (id - 1) * 2,
    opacity: isolatedLayer === null || isolatedLayer === id ? 1 : 0.12,
  });

  return (
    <div
      className={cn("relative w-full rounded-lg border border-hairline bg-surface p-2 shadow-tactile", className)}
      data-xray-target="interface-layer-stack"
      data-xray-spec="DOM-based 3D layers; calibrated springs; keyboard layer controls; reduced-motion support"
    >
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-ink-secondary">
        <Layers className="h-3 w-3 text-blueprint-blue" aria-hidden="true" />
        <span>Interface anatomy</span>
      </div>
      <button
        type="button"
        onClick={toggleExploded}
        aria-pressed={isExploded}
        aria-label={isExploded ? "Assemble interface layers" : "Explode interface layers"}
        className="absolute right-2 top-2 z-10 flex min-h-11 items-center gap-1.5 rounded px-2 font-mono text-[9px] text-blueprint-blue transition-colors hover:bg-blueprint-subtle active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange focus-visible:ring-offset-2"
      >
        <RotateCcw className="h-3 w-3" aria-hidden="true" />
        {isExploded ? "Assemble" : "Explode"}
      </button>

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetParallax}
        aria-hidden="true"
        style={{
          perspective: 1000,
          backgroundImage: "radial-gradient(circle, #DDE1E7 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
        className="relative flex h-[220px] w-full items-center justify-center overflow-hidden rounded bg-canvas/50 sm:h-[224px]"
      >
        <span className="absolute bottom-2 right-2 font-mono text-[8px] tracking-[0.12em] text-ink-secondary">DOM × SPRING</span>
        <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-ink-tertiary/60" />
        <motion.div
          initial={false}
          animate={{ rotateX: isExploded ? 54 : 0, rotateZ: isExploded ? -30 : 0, y: isExploded ? 36 : 0 }}
          transition={spring}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-32 w-52"
        >
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              rotateX: reducedMotion ? 0 : parallaxX,
              rotateZ: reducedMotion ? 0 : parallaxZ,
            }}
            className="relative h-full w-full"
          >
            <motion.div
              initial={false}
              animate={layerAnimation(1)}
              transition={spring}
              className="absolute inset-0 flex flex-col rounded border border-dashed border-ink-secondary bg-surface-recessed p-2"
            >
              <div className="flex justify-between font-mono text-[8px] text-ink-secondary"><span>01 / GRID</span><span>8PT SYSTEM</span></div>
              <div className="my-2 grid flex-1 grid-cols-4 gap-1">
                {Array.from({ length: 8 }, (_, index) => <div key={index} className="rounded-sm border border-dashed border-ink-tertiary/50" />)}
              </div>
              <span className="text-right font-mono text-[7px] text-ink-secondary">STRUCTURE BEFORE SURFACE</span>
            </motion.div>

            <motion.div
              initial={false}
              animate={layerAnimation(2)}
              transition={spring}
              className="absolute inset-0 flex flex-col justify-between rounded border border-blueprint-blue bg-white p-2"
            >
              <div className="flex justify-between font-mono text-[8px] text-blueprint-blue"><span>02 / STATE</span><span>INPUT → RESPONSE</span></div>
              <div className="flex items-center justify-center gap-2 font-mono text-[8px] text-blueprint-blue">
                <span className="rounded-sm border border-blueprint-blue/40 bg-blueprint-subtle px-2 py-1">Event</span><span>→</span><span className="rounded-sm border border-blueprint-blue/40 bg-blueprint-subtle px-2 py-1">Spring</span>
              </div>
              <div className="flex gap-1">{Array.from({ length: 12 }, (_, index) => <div key={index} className="h-1 flex-1 rounded-sm bg-blueprint-blue/20" style={{ opacity: 0.3 + index / 16 }} />)}</div>
            </motion.div>

            <motion.div
              initial={false}
              animate={layerAnimation(3)}
              transition={spring}
              className="absolute inset-0 flex flex-col justify-between rounded border border-signal-orange bg-white p-2"
            >
              <div className="flex justify-between font-mono text-[8px] text-ink-primary"><span>03 / TOKENS</span><span className="text-signal-orange">DESIGN → CODE</span></div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-sm bg-ink-primary" /><span className="h-6 w-6 rounded-sm bg-blueprint-blue" /><span className="h-6 w-6 rounded-sm bg-signal-orange" />
                <div className="ml-auto space-y-1"><div className="h-1 w-12 rounded-sm bg-hairline" /><div className="h-1 w-8 rounded-sm bg-hairline" /></div>
              </div>
              <div className="font-mono text-[7px] text-ink-secondary">COLOR / TYPE / SPACE / MOTION</div>
            </motion.div>

            <motion.div
              initial={false}
              animate={layerAnimation(4)}
              transition={spring}
              className="absolute inset-0 flex flex-col justify-between rounded border border-ink-primary bg-white p-2 shadow-[0_2px_0_rgba(17,19,21,0.08)]"
            >
              <div className="flex items-center justify-between border-b border-hairline pb-2 font-mono text-[8px] text-ink-primary"><span>04 / INTERFACE</span><span className="flex gap-1">{[0, 1, 2].map(index => <span key={index} className="h-1 w-1 rounded-full bg-ink-tertiary" />)}</span></div>
              <div className="flex items-center justify-between rounded border border-hairline bg-canvas p-2">
                <div className="space-y-1"><span className="block text-[10px] font-semibold text-ink-primary">Details make the difference.</span><span className="block font-mono text-[7px] text-ink-secondary">FORM + FUNCTION</span></div>
                <span className="ml-2 flex h-3 w-6 shrink-0 items-center justify-end rounded-full bg-signal-orange px-0.5"><span className="h-2 w-2 rounded-full bg-white" /></span>
              </div>
              <div className="flex justify-between font-mono text-[7px] text-ink-secondary"><span>DESIGN SYSTEM</span><span className="text-blueprint-blue">BUILT IN LAYERS ↗</span></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 grid grid-cols-5 gap-1 border-t border-hairline pt-2" role="group" aria-label="Inspect interface layers">
        {[{ id: null, label: "All" }, ...layers].map(layer => (
          <button
            key={String(layer.id)}
            type="button"
            onClick={() => selectLayer(layer.id)}
            aria-pressed={isolatedLayer === layer.id}
            aria-label={layer.id === null ? "Show all interface layers" : `Inspect ${layers.find(item => item.id === layer.id)?.title.toLowerCase()}`}
            className={cn("min-h-11 rounded border font-mono text-[10px] transition-colors active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange focus-visible:ring-offset-2", isolatedLayer === layer.id ? "border-ink-primary bg-ink-primary font-semibold text-white" : "border-hairline bg-surface text-ink-secondary hover:border-ink-tertiary hover:text-ink-primary")}
          >
            {layer.label}
          </button>
        ))}
      </div>
    </div>
  );
}

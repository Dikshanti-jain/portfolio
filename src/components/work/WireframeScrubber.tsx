"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FrictionPoint, CraftSpec } from "@/types/portfolio";
import { useXRayMode } from "@/context/XRayContext";
import { Crosshair } from "@/components/ui/Crosshair";
import { AlertCircle, CheckCircle2, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface WireframeScrubberProps {
  loFiTitle: string;
  loFiDescription: string;
  frictionPoints: FrictionPoint[];
  hiFiTitle: string;
  hiFiDescription: string;
  craftSpecs: CraftSpec[];
  projectName: string;
  className?: string;
}

export function WireframeScrubber({
  loFiTitle,
  loFiDescription,
  frictionPoints,
  hiFiTitle,
  hiFiDescription,
  craftSpecs,
  projectName,
  className,
}: WireframeScrubberProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // Percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePin, setActivePin] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isXRayActive } = useXRayMode();

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.min(Math.max((offsetX / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  return (
    <div
      className={cn(
        "relative w-full border border-hairline bg-surface rounded-[8px] overflow-hidden shadow-tactile select-none",
        className
      )}
    >
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />

      {/* Scrubber Control Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-recessed border-b border-hairline font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-signal-orange" />
          <span className="font-semibold text-ink-primary">
            BEFORE / AFTER SCRUBBER: {projectName}
          </span>
        </div>
        <div className="flex items-center gap-3 text-ink-tertiary text-[11px]">
          <span className="hidden sm:inline">DRAG SLIDER TO COMPARE</span>
          <span className="px-1.5 py-0.5 bg-surface border border-hairline rounded font-bold text-ink-primary">
            {Math.round(sliderPosition)}% SPLIT
          </span>
        </div>
      </div>

      {/* Interactive Drag Canvas */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[400px] sm:h-[480px] bg-canvas overflow-hidden cursor-ew-resize touch-none"
      >
        {/* Layer 1: Right Side (High-Craft Final Production UI) */}
        <div className="absolute inset-0 w-full h-full bg-white flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between pb-3 border-b border-hairline">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-status-emerald" />
              <span className="font-mono text-xs font-bold text-ink-primary uppercase tracking-wider">
                {hiFiTitle}
              </span>
            </div>
            <span className="font-mono text-[10px] text-status-emerald bg-status-emerald/10 px-2 py-0.5 rounded">
              PRODUCTION STANDARD
            </span>
          </div>

          <p className="mt-2 text-xs text-ink-secondary leading-relaxed max-w-md">
            {hiFiDescription}
          </p>

          {/* Graphical UI Representation Mockup */}
          <div className="mt-4 flex-1 border border-hairline rounded-[6px] bg-[#F8F9FA] p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline pb-2 font-mono text-[11px] text-ink-secondary">
              <span className="font-semibold text-ink-primary">
                TELEMETRY COCKPIT // 60 FPS
              </span>
              <span className="text-status-emerald">STATUS: OPTIMAL</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto">
              <div className="p-3 bg-white border border-hairline rounded shadow-sm">
                <span className="text-[10px] font-mono text-ink-tertiary uppercase">
                  COGNITIVE CLARITY
                </span>
                <div className="text-xl font-bold font-sans text-ink-primary mt-1">
                  98.4%
                </div>
              </div>
              <div className="p-3 bg-white border border-hairline rounded shadow-sm">
                <span className="text-[10px] font-mono text-ink-tertiary uppercase">
                  FITTS TOUCH TARGET
                </span>
                <div className="text-xl font-bold font-sans text-signal-orange mt-1">
                  48px
                </div>
              </div>
              <div className="hidden sm:block p-3 bg-white border border-hairline rounded shadow-sm">
                <span className="text-[10px] font-mono text-ink-tertiary uppercase">
                  TOKEN PARITY
                </span>
                <div className="text-xl font-bold font-sans text-blueprint-blue mt-1">
                  100%
                </div>
              </div>
            </div>

            {/* Production Craft Pin Overlays */}
            {craftSpecs.map((spec) => (
              <div
                key={spec.id}
                style={{ top: `${spec.coordinate.y}%`, left: `${spec.coordinate.x}%` }}
                className="absolute z-20"
              >
                <div
                  onMouseEnter={() => setActivePin(spec.id)}
                  onMouseLeave={() => setActivePin(null)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-blueprint-blue text-white text-[10px] font-mono shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>{spec.title}</span>
                </div>
                {activePin === spec.id && (
                  <div className="absolute top-7 left-0 z-30 w-48 p-2.5 bg-white border border-blueprint-blue text-ink-primary text-xs rounded shadow-lg pointer-events-none">
                    <div className="font-bold text-[11px] text-blueprint-blue font-mono mb-1">
                      {spec.tokenRef}
                    </div>
                    <div className="text-ink-secondary text-[11px] leading-snug">
                      {spec.specification}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2 border-t border-hairline text-right font-mono text-[10px] text-ink-tertiary">
              SWISS INDUSTRIAL DAYLIGHT // READY FOR PRODUCTION
            </div>
          </div>
        </div>

        {/* Layer 2: Left Side (Low-Fi Wireframe / High-Friction Problem State) */}
        <div
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          className="absolute inset-0 w-full h-full bg-surface-recessed flex flex-col p-6 sm:p-8 border-r border-signal-orange z-10"
        >
          <div className="flex items-center justify-between pb-3 border-b border-hairline">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-signal-orange" />
              <span className="font-mono text-xs font-bold text-ink-primary uppercase tracking-wider">
                {loFiTitle}
              </span>
            </div>
            <span className="font-mono text-[10px] text-signal-orange bg-signal-orange/10 px-2 py-0.5 rounded">
              HIGH FRICTION
            </span>
          </div>

          <p className="mt-2 text-xs text-ink-secondary leading-relaxed max-w-md">
            {loFiDescription}
          </p>

          {/* Wireframe Mockup Area with Wireframe Lines */}
          <div className="mt-4 flex-1 border-2 border-dashed border-hairline-strong rounded-[6px] bg-[#E2E5E9] p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline-strong/40 pb-2 font-mono text-[11px] text-ink-secondary">
              <span>WIREFRAME DIAGNOSTICS</span>
              <span className="text-signal-orange">ERRORS: CRITICAL</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-auto opacity-70">
              <div className="p-3 bg-white/60 border border-dashed border-gray-400 rounded">
                <div className="h-3 w-16 bg-gray-400/50 rounded mb-2" />
                <div className="h-6 w-12 bg-gray-500/50 rounded" />
              </div>
              <div className="p-3 bg-white/60 border border-dashed border-gray-400 rounded">
                <div className="h-3 w-20 bg-gray-400/50 rounded mb-2" />
                <div className="h-6 w-10 bg-gray-500/50 rounded" />
              </div>
            </div>

            {/* Friction Point Pins on Low-Fi Layer */}
            {frictionPoints.map((point) => (
              <div
                key={point.id}
                style={{ top: `${point.coordinate.y}%`, left: `${point.coordinate.x}%` }}
                className="absolute z-20"
              >
                <div
                  onMouseEnter={() => setActivePin(point.id)}
                  onMouseLeave={() => setActivePin(null)}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-signal-orange text-white text-[10px] font-mono shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>{point.title}</span>
                </div>
                {activePin === point.id && (
                  <div className="absolute top-7 left-0 z-30 w-48 p-2.5 bg-white border border-signal-orange text-ink-primary text-xs rounded shadow-lg pointer-events-none">
                    <div className="font-bold text-[11px] text-signal-orange font-mono mb-1">
                      SEVERITY: {point.severity.toUpperCase()}
                    </div>
                    <div className="text-ink-secondary text-[11px] leading-snug">
                      {point.description}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2 border-t border-hairline-strong/40 text-left font-mono text-[10px] text-ink-secondary">
              REDUNDANT NOISE // UNRANKED ATS WARNINGS
            </div>
          </div>
        </div>

        {/* Central Draggable Mechanical Handle Divider */}
        <div
          style={{ left: `${sliderPosition}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-signal-orange z-30 pointer-events-none -translate-x-1/2"
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-signal-orange shadow-tactile flex items-center justify-center text-signal-orange cursor-grab active:cursor-grabbing pointer-events-auto hover:scale-110 active:scale-95 transition-transform">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom Telemetry Legend */}
      <div className="px-4 py-2 bg-surface-recessed/60 border-t border-hairline flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-ink-tertiary">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-signal-orange">
            <span className="w-2 h-2 rounded-full bg-signal-orange" />
            Low-Fi Friction Pin
          </span>
          <span className="flex items-center gap-1 text-blueprint-blue">
            <span className="w-2 h-2 rounded-full bg-blueprint-blue" />
            Production Craft Spec
          </span>
        </div>
        <div>
          {isXRayActive ? (
            <span className="text-blueprint-blue font-bold">
              [UX X-RAY ACTIVE: COGNITIVE ERGONOMICS REVEALED]
            </span>
          ) : (
            <span>TOGGLE X-RAY [X] FOR ARCHITECTURAL SPECS</span>
          )}
        </div>
      </div>
    </div>
  );
}

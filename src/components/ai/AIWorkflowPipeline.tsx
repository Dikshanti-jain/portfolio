"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { AI_PIPELINE_STEPS } from "@/data/portfolioData";
import { Crosshair } from "@/components/ui/Crosshair";
import { XRayAnnotation } from "@/context/XRayContext";
import { soundEngine } from "@/utils/soundEngine";
import {
  Terminal,
  Check,
  Copy,
  Cpu,
  Zap,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { TRANSITIONS } from "@/lib/transitions";

export function AIWorkflowPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const currentStep = AI_PIPELINE_STEPS[activeStepIndex];

  const handleCopyPrompt = async () => {
    soundEngine.playClick(1000);
    try {
      await navigator.clipboard.writeText(currentStep.promptExample);
      setCopiedPrompt(true);
      toast.success("Prompt copied to clipboard!");
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      toast.error("Failed to copy prompt.");
    }
  };

  const handleSelectStep = (idx: number) => {
    soundEngine.playClick(800 + idx * 100);
    setCopiedPrompt(false);
    setActiveStepIndex(idx);
  };

  return (
    <section id="process" aria-labelledby="process-heading" className="relative w-full scroll-mt-24 border-b border-hairline py-16 sm:py-24 bg-canvas overflow-hidden">
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: shouldReduceMotion ? 0 : 12 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10 pb-6 border-b border-hairline"
        >
          <div className="min-w-0 max-w-3xl">
            <XRayAnnotation
              token="SEC:CIRCUIT_BOARD"
              spec="Industrial PCB / Schematic Blueprint Bus"
              badgePlacement="top-left"
            >
              <div className="flex items-start gap-2 font-mono text-[11px] sm:text-xs leading-relaxed text-blueprint-blue uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 mt-1 shrink-0 rounded-full bg-blueprint-blue" />
                <span>[03 // HOW I DIRECT AI // INDUSTRIAL SCHEMATIC]</span>
              </div>
            </XRayAnnotation>
            <h2 id="process-heading" className="mt-3 font-sans font-bold text-2xl sm:text-3xl leading-tight text-ink-primary tracking-tight text-balance">
              AI as an amplifier. Human taste as the final authority.
            </h2>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-ink-secondary">
            <span className="flex items-center gap-1 text-signal-orange">
              <Zap className="w-3.5 h-3.5" />
              <span>ACTIVE BUS</span>
            </span>
            <span>•</span>
            <span>4 SCHEMATIC NODES</span>
          </div>
        </motion.div>

        {/* A visible bus links the desktop workflow nodes. */}
        <div className="relative mb-8">
          {/* Animated Circuit Board Bus Line */}
          <div aria-hidden="true" className="hidden md:block absolute top-1 left-0 right-0 h-px bg-hairline z-0">
            <motion.div
              animate={{
                left: `${((activeStepIndex + 0.5) / AI_PIPELINE_STEPS.length) * 100}%`,
              }}
              initial={false}
              transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-signal-orange ring-4 ring-canvas"
            />
          </div>

          {/* 4 PCB Nodes */}
          <div role="group" aria-label="AI workflow steps" className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:pt-5 z-10">
            {AI_PIPELINE_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <motion.button
                  key={step.stepNumber}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="process-details"
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  transition={TRANSITIONS.tactileSpring}
                  onClick={() => handleSelectStep(idx)}
                  className={`relative min-w-0 min-h-28 flex flex-col p-3 sm:p-4 rounded-[8px] text-left border transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange ${
                    isActive
                      ? "bg-white border-signal-orange shadow-tactile"
                      : "bg-surface border-hairline hover:border-ink-primary hover:bg-canvas"
                  }`}
                >
                  <Crosshair position="top-right" />
                  
                  {/* Solder Joint Indicator */}
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-3">
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? "bg-signal-orange motion-safe:animate-pulse" : "bg-hairline-strong/40"
                        }`}
                      />
                      <span className="font-bold text-ink-primary">
                        BUS-0{idx + 1}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-ink-tertiary">
                      [NODE {step.stepNumber}]
                    </span>
                  </div>

                  <div className="font-sans font-bold text-sm sm:text-base text-ink-primary tracking-tight">
                    {step.title}
                  </div>
                  <div className="font-mono text-[11px] leading-relaxed text-ink-secondary mt-1 break-words">
                    {step.subtitle}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Node Schematic Deep-Dive Workbench */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            id="process-details"
            key={currentStep.stepNumber}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={shouldReduceMotion ? { duration: 0 } : TRANSITIONS.snappyMicro}
            className="relative p-4 sm:p-8 bg-surface border border-hairline rounded-[8px] shadow-tactile"
          >
            <Crosshair position="top-left" />
            <Crosshair position="top-right" />
            <Crosshair position="bottom-left" />
            <Crosshair position="bottom-right" />

            {/* Workbench Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline mb-6 font-mono text-xs">
              <div className="flex min-w-0 items-start gap-2.5">
                <Cpu className="w-4 h-4 shrink-0 mt-0.5 text-signal-orange" />
                <div className="min-w-0 space-y-1 leading-relaxed">
                  <p aria-live="polite" className="font-bold text-ink-primary uppercase tracking-wider">
                    NODE {currentStep.stepNumber} {"//"} {currentStep.title}
                  </p>
                  <p className="text-ink-secondary">{currentStep.subtitle}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyPrompt}
                className="flex min-h-11 shrink-0 self-start sm:self-center items-center gap-2 px-3 py-2 bg-canvas border border-hairline rounded hover:bg-surface-recessed text-xs font-mono text-ink-secondary hover:text-ink-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange"
              >
                {copiedPrompt ? (
                  <Check className="w-3.5 h-3.5 text-status-emerald" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
              </button>
            </div>

            {/* Grid 1: The Input Prompt & Prompt Engineering Anatomy */}
            <div className="mb-6 p-4 bg-canvas border border-hairline rounded-[6px]">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono text-[11px] leading-relaxed text-ink-secondary uppercase">
                <span className="flex items-start gap-1.5 text-signal-orange font-bold">
                  <Terminal className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>Guardrailed Design Engineer Prompt</span>
                </span>
                <span>STRUCTURED INPUT</span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-ink-primary leading-relaxed break-words bg-surface p-3.5 rounded border border-hairline shadow-sm">
                &ldquo;{currentStep.promptExample}&rdquo;
              </p>
            </div>

            {/* Grid 2: Comparative Interactive Diff (Generic AI Slop vs Ashmit's Guardrailed Output) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* REJECTED: Generic AI Slop */}
              <div className="min-w-0 p-4 sm:p-5 bg-red-50/20 border border-red-200/80 rounded-[6px] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-red-200 font-mono text-[11px] leading-relaxed text-red-600 font-bold uppercase tracking-wider">
                    <span className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>Unfiltered AI Output (REJECTED AS SLOP)</span>
                    </span>
                    <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px]">
                      FAILED CRAFT
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-secondary leading-relaxed font-sans">
                    {currentStep.aiRawOutput}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-red-200/60 font-mono text-[11px] leading-relaxed text-red-600">
                  REASON: Inaccessible contrast, no component constraints, unbuildable abstractions.
                </div>
              </div>

              {/* SHIPPED: Ashmit's Human-in-the-Loop Guardrailed Output */}
              <div className="min-w-0 p-4 sm:p-5 bg-emerald-50/20 border border-emerald-200 rounded-[6px] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-emerald-200 font-mono text-[11px] leading-relaxed text-status-emerald font-bold uppercase tracking-wider">
                    <span className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>Ashmit&apos;s Guardrailed System (SHIPPED)</span>
                    </span>
                    <span className="bg-emerald-100 text-status-emerald px-1.5 py-0.5 rounded text-[10px]">
                      PRODUCTION
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-primary leading-relaxed font-sans font-medium">
                    {currentStep.humanFilter}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200/60 font-mono text-[11px] leading-relaxed text-status-emerald font-semibold break-words">
                  DELIVERABLE: {currentStep.productionArtifact}
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

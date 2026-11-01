"use client";

import React, { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { CaseStudy } from "@/types/portfolio";
import { WireframeScrubber } from "./WireframeScrubber";
import { Crosshair } from "@/components/ui/Crosshair";
import { X, Github, Check, Copy, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

interface CaseStudyDrawerProps {
  project: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyDrawer({ project, isOpen, onClose }: CaseStudyDrawerProps) {
  const [copiedTokens, setCopiedTokens] = useState<boolean>(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCopiedTokens(false);
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, [project?.id]);

  if (!project) return null;

  const handleCopyTokens = async () => {
    try {
      const code = project.systemArchitecture.tokens.join("\n");
      await navigator.clipboard.writeText(code);
      setCopiedTokens(true);
      toast.success("Tokens copied to clipboard!");
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedTokens(false), 2000);
    } catch {
      toast.error("Failed to copy tokens.");
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} autoFocus>
      <Drawer.Portal>
        {/* Backdrop Overlay */}
        <Drawer.Overlay className="fixed inset-0 bg-ink-primary/30 backdrop-blur-sm z-50" />

        {/* Origin-Aware Bottom Sheet Content */}
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] max-w-[1280px] flex-col overflow-hidden rounded-t-[16px] border border-b-0 border-hairline bg-surface shadow-drawer outline-none"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            titleRef.current?.focus({ preventScroll: true });
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => {
              if (!document.querySelector('[role="dialog"][data-state="open"]')) returnFocusRef.current?.focus({ preventScroll: true });
            });
          }}
        >
          
          {/* Tactile Drag Handle Pill */}
          <div aria-hidden="true" className="flex shrink-0 items-center justify-center pt-3 pb-2 bg-surface-recessed/60 border-b border-hairline">
            <div className="w-12 h-1.5 rounded-full bg-hairline-strong/30 hover:bg-hairline-strong/60 transition-colors" />
          </div>

          {/* Sticky Header with Project Metadata & Close Button */}
          <div className="relative shrink-0 border-b border-hairline bg-surface px-4 py-5 sm:px-6">
            <div className="flex min-w-0 items-start gap-3 pr-12">
              <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-signal-orange" />
              <div className="min-w-0">
                <Drawer.Title ref={titleRef} tabIndex={-1} className="font-sans font-bold text-xl sm:text-2xl text-ink-primary tracking-tight outline-none">
                  {project.title}
                </Drawer.Title>
                <Drawer.Description className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs leading-relaxed text-ink-secondary">
                  <span>{project.role}</span>
                  <span aria-hidden="true">/</span>
                  <span>{project.timeline}</span>
                  <span aria-hidden="true">/</span>
                  <span className="text-status-emerald font-semibold">
                    {project.status}
                  </span>
                </Drawer.Description>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {project.links.liveDemo && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-ink-primary bg-ink-primary px-4 py-2 font-mono text-xs font-semibold text-white transition-colors hover:bg-ink-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue focus-visible:ring-offset-2"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-hairline bg-surface px-4 py-2 font-mono text-xs text-ink-primary transition-colors hover:border-ink-primary hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source code</span>
                </a>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Case Study Drawer"
              className="absolute right-3 top-4 flex h-11 w-11 items-center justify-center rounded-md text-ink-secondary transition-colors hover:bg-surface-recessed hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue sm:right-5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Drawer Body */}
          <div className="mx-auto min-h-0 w-full max-w-5xl flex-1 space-y-10 overflow-y-auto overscroll-contain px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
            
            {/* Impact Metric Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="relative p-4 bg-canvas border border-hairline rounded-[6px]"
                >
                  <Crosshair position="top-right" />
                  <div className="font-mono text-[10px] text-ink-tertiary uppercase">
                    {metric.label}
                  </div>
                  <div className="text-2xl font-bold font-sans text-signal-orange mt-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-ink-secondary mt-1">
                    {metric.context}
                  </div>
                </div>
              ))}
            </div>

            {/* Section 1: Problem Space & Friction Points */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-signal-orange uppercase tracking-wider font-semibold">
                <span>[01 / THE PROBLEM SPACE]</span>
              </div>
              <p className="text-base text-ink-primary leading-relaxed font-sans">
                {project.problemStatement.overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {project.problemStatement.frictionPoints.map((fp, i) => (
                  <div
                    key={i}
                    className="p-3 bg-surface-recessed border border-hairline rounded text-xs text-ink-secondary"
                  >
                    <span className="font-mono text-signal-orange font-bold mr-1">
                      0{i + 1}.
                    </span>
                    {fp}
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: UX Hypothesis & Cognitive Architecture */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-blueprint-blue uppercase tracking-wider font-semibold">
                <span>[02 / UX HYPOTHESIS & ARCHITECTURE]</span>
              </div>
              <div className="p-4 bg-blueprint-subtle/5 border border-blueprint-blue/30 rounded-[6px]">
                <p className="text-sm text-ink-primary font-medium leading-relaxed">
                  <span className="font-bold text-blueprint-blue font-mono mr-2">
                    HYPOTHESIS:
                  </span>
                  {project.uxHypothesis.premise}
                </p>
                <p className="mt-3 text-xs text-ink-secondary leading-relaxed border-t border-blueprint-blue/20 pt-2">
                  <span className="font-bold text-ink-primary mr-1">SOLUTION:</span>
                  {project.uxHypothesis.architecturalSolution}
                </p>
              </div>
            </section>

            {/* Section 3: Interactive Before/After Wireframe Scrubber */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-ink-tertiary">
                <span className="text-signal-orange font-semibold uppercase tracking-wider">
                  [03 / INTERACTIVE PROOF: WIREFRAME VS FINAL CRAFT]
                </span>
                <span className="text-ink-secondary">DRAG TO COMPARE</span>
              </div>
              <WireframeScrubber
                projectName={project.title}
                loFiTitle={project.wireframeComparison.loFiTitle}
                loFiDescription={project.wireframeComparison.loFiDescription}
                frictionPoints={project.wireframeComparison.frictionPoints}
                hiFiTitle={project.wireframeComparison.hiFiTitle}
                hiFiDescription={project.wireframeComparison.hiFiDescription}
                craftSpecs={project.wireframeComparison.craftSpecs}
              />
            </section>

            {/* Section 4: System Tokens & Component Architecture */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <span className="text-status-emerald font-semibold uppercase tracking-wider">
                  [04 / DESIGN SYSTEM TOKENS & COMPONENTS]
                </span>
                <button
                  type="button"
                  onClick={handleCopyTokens}
                  className="flex min-h-11 items-center gap-2 rounded-md border border-hairline bg-surface px-3 py-2 text-[11px] text-ink-secondary transition-colors hover:bg-surface-recessed hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue"
                >
                  {copiedTokens ? (
                    <Check className="w-3 h-3 text-status-emerald" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  <span>{copiedTokens ? "Copied" : "Copy Tokens"}</span>
                </button>
              </div>

              <div className="p-4 bg-surface-recessed border border-hairline rounded-[6px] font-mono text-xs text-ink-primary space-y-2 overflow-x-auto">
                <div className="text-[10px] text-ink-tertiary uppercase pb-1 border-b border-hairline">
                  EXPOSED CSS VARIABLES // 8PT BASELINE TOKENS
                </div>
                {project.systemArchitecture.tokens.map((token, idx) => (
                  <div key={idx} className="text-signal-orange">
                    {token}
                  </div>
                ))}
                <div className="pt-2 text-[10px] text-ink-tertiary uppercase border-t border-hairline">
                  COMPONENT INTERFACES
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.systemArchitecture.components.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-surface border border-hairline rounded text-[11px] text-ink-secondary"
                    >
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 5: Measurable Results & Impact */}
            <section className="space-y-4 pb-8">
              <div className="flex items-center gap-2 font-mono text-xs text-ink-primary uppercase tracking-wider font-semibold">
                <span>[05 / QUANTIFIABLE OUTCOMES]</span>
              </div>
              <ul className="space-y-2">
                {project.resultsAndImpact.map((result, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-ink-secondary"
                  >
                    <span className="text-status-emerald font-bold font-mono">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

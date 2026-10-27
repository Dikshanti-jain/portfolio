"use client";

import React, { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { CANDIDATE_PROFILE } from "@/data/portfolioData";
import { soundEngine } from "@/utils/soundEngine";
import {
  X,
  FileText,
  Printer,
  Copy,
  Check,
  GraduationCap,
  Award,
  Briefcase,
  Code,
} from "lucide-react";
import { toast } from "sonner";
import "./resume-print.css";

interface ResumeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeDrawer({ isOpen, onClose }: ResumeDrawerProps) {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
  }, []);

  const handleCopyEmail = async () => {
    soundEngine.playClick(1050);
    try {
      await navigator.clipboard.writeText(CANDIDATE_PROFILE.socials.email);
      setCopiedEmail(true);
      toast.success(`Copied: ${CANDIDATE_PROFILE.socials.email}`);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      toast.error("Failed to copy email.");
    }
  };

  const handlePrint = () => {
    soundEngine.playClick(900);
    window.print();
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} autoFocus>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-ink-primary/30 backdrop-blur-sm z-50" />
        <Drawer.Content
          className="resume-print-root fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] max-w-[1120px] flex-col overflow-hidden rounded-t-[16px] border border-b-0 border-hairline bg-surface shadow-drawer outline-none"
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
          
          {/* Tactile Handle */}
          <div aria-hidden="true" className="resume-print-handle flex shrink-0 items-center justify-center pt-3 pb-2 bg-surface-recessed/60 border-b border-hairline">
            <div className="w-12 h-1.5 rounded-full bg-hairline-strong/30" />
          </div>

          {/* Sticky Header with Actions */}
          <div className="relative shrink-0 border-b border-hairline bg-surface px-4 py-5 sm:px-6">
            <div className="flex min-w-0 items-start gap-3 pr-12">
              <FileText aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-signal-orange" />
              <div className="min-w-0">
                <Drawer.Title ref={titleRef} tabIndex={-1} className="font-sans font-bold text-lg sm:text-xl text-ink-primary outline-none">
                  {CANDIDATE_PROFILE.name} {"//"} Spec Sheet &amp; Resume
                </Drawer.Title>
                <Drawer.Description className="mt-1 font-mono text-xs leading-relaxed text-ink-secondary">
                  UI/UX Designer & Design Engineer • Jaipur, India (Remote & Relocation)
                </Drawer.Description>
                <div className="resume-print-contact hidden font-mono text-xs text-ink-primary">
                  {CANDIDATE_PROFILE.socials.email} · {CANDIDATE_PROFILE.socials.github}
                </div>
              </div>
            </div>

            <div className="resume-print-actions mt-4 flex flex-wrap items-center gap-2 font-mono text-xs">
              {/* Print / Save PDF Button */}
              <button
                type="button"
                onClick={handlePrint}
                className="flex min-h-11 items-center gap-2 rounded-md border border-hairline bg-surface px-4 py-2 font-semibold text-ink-primary shadow-sm transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue"
              >
                <Printer className="w-3.5 h-3.5 text-ink-secondary" />
                <span>Print / Save PDF</span>
              </button>

              {/* Copy Contact Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex min-h-11 items-center gap-2 rounded-md border border-ink-primary bg-ink-primary px-4 py-2 font-semibold text-white shadow-sm transition-colors hover:bg-ink-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue focus-visible:ring-offset-2"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-white" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedEmail ? "Copied" : "Copy Contact"}</span>
              </button>

            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick(600);
                onClose();
              }}
              aria-label="Close Resume Drawer"
              className="resume-print-actions absolute right-3 top-4 flex h-11 w-11 items-center justify-center rounded-md text-ink-secondary transition-colors hover:bg-surface-recessed hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue sm:right-5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Resume Body */}
          <div className="resume-print-body mx-auto min-h-0 w-full max-w-4xl flex-1 space-y-8 overflow-y-auto overscroll-contain px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">
            
            {/* Executive Bio / Pitch */}
            <div className="p-4 bg-canvas border border-hairline rounded-[6px]">
              <div className="font-mono text-[10px] text-signal-orange uppercase font-bold tracking-wider mb-1">
                POSITIONING & UNFAIR ADVANTAGE
              </div>
              <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                {CANDIDATE_PROFILE.unfairAdvantage}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-signal-orange uppercase tracking-wider font-semibold">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Foundation</span>
              </div>
              <div className="p-4 bg-surface border border-hairline rounded-[6px] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-sans font-bold text-base text-ink-primary">
                    B.Tech in Artificial Intelligence & Data Science
                  </h3>
                  <span className="font-mono text-xs text-ink-tertiary">
                    Arya College of Engineering & IT, Jaipur
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-ink-secondary leading-relaxed">
                  Rigorous foundation in computer science, algorithm design, distributed telemetry, and human-computer interaction (HCI).
                </p>
              </div>
            </div>

            {/* Leadership & Production Experience */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-blueprint-blue uppercase tracking-wider font-semibold">
                <Briefcase className="w-4 h-4" />
                <span>Product Design & Leadership Track Record</span>
              </div>
              
              <div className="space-y-3">
                {/* DevMate Mentors */}
                <div className="p-4 bg-surface border border-hairline rounded-[6px] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-ink-primary">
                      DevMate Mentors — Co-Founder & Lead Product Designer
                    </h4>
                    <span className="font-mono text-xs text-signal-orange font-semibold">
                      2024 — Present
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-ink-tertiary mt-0.5">
                    Co-founded with Abhinav Pandey (Engineering Lead) • 2,400+ Candidates Trained
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-ink-secondary list-disc pl-4">
                    <li>
                      Engineered multi-variant Figma design system maintaining 100% token parity with production Tailwind CSS components.
                    </li>
                    <li>
                      Redesigned mock interview audio cockpit with progressive disclosure feedback, slashing cognitive drop-off by 44%.
                    </li>
                    <li>
                      Architected interactive ATS diagnostic scoring tree, boosting candidate clarity from 62% to 94.2%.
                    </li>
                  </ul>
                </div>

                {/* FloodWatch AI & EQUINOX */}
                <div className="p-4 bg-surface border border-hairline rounded-[6px] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-sans font-bold text-sm sm:text-base text-ink-primary">
                      FloodWatch AI & Team EQUINOX — Team Lead & Systems UX
                    </h4>
                    <span className="font-mono text-xs text-blueprint-blue font-semibold">
                      2024 (Arya Hackathon Finalist)
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-ink-tertiary mt-0.5">
                    Disaster Management Telemetry • NASA GPM + ISRO DEM Integration
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs text-ink-secondary list-disc pl-4">
                    <li>
                      Eliminated heavy 3D WebGL bloat; built high-speed 2D Leaflet GIS rendering 5,000+ village coordinates in sub-850ms on rural 3G.
                    </li>
                    <li>
                      Formulated dual-channel (geometry + color) hazard tier indicators passing WCAG AAA contrast for color-blind emergency responders.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Skills & Design System Matrix */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-status-emerald uppercase tracking-wider font-semibold">
                <Code className="w-4 h-4" />
                <span>Technical Skill Matrix</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-canvas border border-hairline rounded">
                  <div className="font-mono text-[11px] font-bold text-signal-orange">
                    01 // DESIGN SYSTEMS
                  </div>
                  <div className="mt-1 text-xs text-ink-secondary">
                    Figma Variables & Tokens, 8pt Grid Layouts, Auto-Layout, Heuristic Audits, Ergonomic Cockpits.
                  </div>
                </div>

                <div className="p-3 bg-canvas border border-hairline rounded">
                  <div className="font-mono text-[11px] font-bold text-blueprint-blue">
                    02 // DESIGN ENGINEERING
                  </div>
                  <div className="mt-1 text-xs text-ink-secondary">
                    React 19, Next.js 15 App Router, TypeScript, Tailwind CSS, Framer Motion Springs, Radix UI Primitives.
                  </div>
                </div>

                <div className="p-3 bg-canvas border border-hairline rounded">
                  <div className="font-mono text-[11px] font-bold text-status-emerald">
                    03 // AI & SYSTEMS UX
                  </div>
                  <div className="mt-1 text-xs text-ink-secondary">
                    Human-in-the-Loop Approval Gates, Cursor/Claude AI Orchestration, Python, C++, GIS Telemetry.
                  </div>
                </div>
              </div>
            </div>

            {/* Hackathon & Credential Honors */}
            <div className="space-y-3 pb-8">
              <div className="flex items-center gap-2 font-mono text-xs text-ink-primary uppercase tracking-wider font-semibold">
                <Award className="w-4 h-4 text-signal-orange" />
                <span>Verified Honors & Hackathon Record</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { name: "Adobe University Hackathon 2026", desc: "Designed generative canvas interfaces." },
                  { name: "Genisys 1.0 (MNIT Jaipur)", desc: "Autonomous agent system architecture." },
                  { name: "Arya Hackathon Finalist Recognition", desc: "Disaster GIS telemetry systems UX lead." },
                  { name: "Google Cloud Skills Boost Arcade Champion", desc: "Mastered distributed cloud architectures." },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface border border-hairline rounded shadow-sm"
                  >
                    <div className="font-bold text-ink-primary font-sans">
                      {item.name}
                    </div>
                    <div className="text-ink-secondary text-[11px] mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

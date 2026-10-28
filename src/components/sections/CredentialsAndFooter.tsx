"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Crosshair } from "@/components/ui/Crosshair";
import { XRayAnnotation } from "@/context/XRayContext";
import { soundEngine } from "@/utils/soundEngine";
import { CANDIDATE_PROFILE } from "@/data/portfolioData";
import {
  Trophy,
  Briefcase,
  Copy,
  Check,
  Send,
  Compass,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

interface RolePitch {
  title: string;
  badge: string;
  color: string;
  day1Deliverables: string[];
  ctaText: string;
  emailSubject: string;
}

export function CredentialsAndFooter({ onOpenResume }: { onOpenResume?: () => void }) {
  const [selectedRole, setSelectedRole] = useState<"uiux" | "product" | "engineer">("engineer");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  const roles: Record<"uiux" | "product" | "engineer", RolePitch> = {
    uiux: {
      title: "UI/UX Design Intern",
      badge: "FIGMA ARCHITECT",
      color: "text-signal-orange",
      day1Deliverables: [
        "Audit existing product screens and eliminate cognitive friction points with high-craft 8pt Swiss layouts.",
        "Construct multi-variant Figma component libraries with strict auto-layout and variable modes.",
        "Deliver 100% developer-ready design specs so frontend engineers never guess margins or tokens.",
      ],
      ctaText: "Inquire for UI/UX Design Role",
      emailSubject: "Ashmit Kathat — UI/UX Design Internship Opportunity",
    },
    product: {
      title: "Product Design Intern",
      badge: "SYSTEMS THINKER",
      color: "text-blueprint-blue",
      day1Deliverables: [
        "Conduct heuristic user flow analyses and translate complex business requirements into crisp wireframes.",
        "Design zero-loss progressive disclosure interfaces that reduce user anxiety during high-stress flows.",
        "Partner closely with product leads and founders to iterate from concept to interactive test prototype in days.",
      ],
      ctaText: "Inquire for Product Design Role",
      emailSubject: "Ashmit Kathat — Product Design Internship Opportunity",
    },
    engineer: {
      title: "Design Engineer Intern",
      badge: "FIGMA ⇄ REACT BRIDGE",
      color: "text-status-emerald",
      day1Deliverables: [
        "Build production-ready, accessible React 19 / Next.js components matching Figma tokens with 100% parity.",
        "Calibrate physical spring micro-interactions with Framer Motion (`stiffness: 380, damping: 30`).",
        "Orchestrate AI workflows to rapidly stress-test edge cases, state boundaries, and screen reader accessibility.",
      ],
      ctaText: "Inquire for Design Engineering Role",
      emailSubject: "Ashmit Kathat — Design Engineer Internship Opportunity",
    },
  };

  const currentPitch = roles[selectedRole];

  const handleCopyEmail = async () => {
    soundEngine.playClick(1050);
    try {
      await navigator.clipboard.writeText(CANDIDATE_PROFILE.socials.email);
      setCopiedEmail(true);
      toast.success(`Copied: ${CANDIDATE_PROFILE.socials.email}`, {
        description: "Ready to paste for interview scheduling.",
      });
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      toast.error("Failed to copy email.");
    }
  };

  const handleLaunchEmail = () => {
    soundEngine.playClick(900);
    const mailto = `mailto:${CANDIDATE_PROFILE.socials.email}?subject=${encodeURIComponent(
      currentPitch.emailSubject
    )}&body=${encodeURIComponent(
      `Hi Ashmit,\n\nWe saw your Design Engineer portfolio and were impressed by your work on DevMate Mentors and FloodWatch AI. We would love to discuss an internship opportunity with our team.\n\nBest regards,`
    )}`;
    window.location.href = mailto;
  };

  const hackathons = [
    {
      name: "Adobe University Hackathon 2026",
      role: "Participant & Interface Designer",
      detail: "Prototyped generative AI creative canvas tools.",
      tag: "ADOBE 2026",
    },
    {
      name: "Genisys 1.0 (MNIT Jaipur)",
      role: "Systems UX Lead",
      detail: "Engineered human-in-the-loop autonomous interface tokens.",
      tag: "MNIT JAIPUR",
    },
    {
      name: "Arya Hackathon",
      role: "Finalist Recognition (Team EQUINOX)",
      detail: "Led disaster telemetry systems UX for FloodWatch AI.",
      tag: "FINALIST",
    },
    {
      name: "Google Cloud Arcade Facilitator",
      role: "Arcade Champion Recognition",
      detail: "Completed multi-track distributed cloud & data pipelines.",
      tag: "GOOGLE CLOUD",
    },
    {
      name: "Tech Aarambh 2.0",
      role: "Design Systems Architect",
      detail: "Shipped accessible cross-platform mobile components.",
      tag: "HACKATHON",
    },
    {
      name: "CodeWars Regional Arena",
      role: "Frontend Sprint Finalist",
      detail: "Sub-100ms UI interaction and state optimization.",
      tag: "ALGORITHMS",
    },
  ];

  return (
    <section aria-labelledby="credentials-heading" className="relative w-full border-b border-hairline bg-surface py-16 sm:py-24">
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* =======================================================================
            MODULE 1: HACKATHON ARENA & VERIFIED CLOUD CREDENTIALS
            ======================================================================= */}
        <div>
          <motion.div
            initial={{ opacity: 1, y: shouldReduceMotion ? 0 : 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8 pb-6 border-b border-hairline"
          >
            <div className="min-w-0 max-w-3xl">
              <XRayAnnotation
                token="SEC:CREDENTIALS"
                spec="Verified Hackathon & Cloud Arena Record"
                badgePlacement="top-left"
              >
                <div className="flex items-start gap-2 font-mono text-[11px] sm:text-xs leading-relaxed text-signal-orange uppercase tracking-wider font-semibold">
                  <Trophy className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>[04 // VERIFIED CREDENTIALS & HACKATHON ARENA]</span>
                </div>
              </XRayAnnotation>
              <h2 id="credentials-heading" className="mt-3 font-sans font-bold text-2xl sm:text-3xl leading-tight text-ink-primary tracking-tight text-balance">
                Tested in high-stakes hackathons and live systems.
              </h2>
            </div>

            <div className="shrink-0 font-mono text-[11px] text-ink-secondary">
              6 HACKATHONS &amp; CREDENTIALS
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hackathons.map((item, idx) => (
              <div
                key={idx}
                className="relative min-w-0 p-5 bg-canvas border border-hairline rounded-[6px] shadow-tactile group hover:border-ink-primary transition-colors duration-150 flex flex-col justify-between"
              >
                <Crosshair position="top-right" />
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-ink-tertiary mb-2">
                    <span className="font-bold text-signal-orange">{item.tag}</span>
                    <span>0{idx + 1}</span>
                  </div>
                  <h3 className="font-sans font-bold text-base text-ink-primary group-hover:text-signal-orange transition-colors">
                    {item.name}
                  </h3>
                  <div className="font-mono text-xs text-ink-secondary mt-1">
                    {item.role}
                  </div>
                  <p className="mt-3 text-sm text-ink-secondary leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =======================================================================
            MODULE 2: THE ZERO-FRICTION HIRE & INTERNSHIP PITCH TERMINAL
            ======================================================================= */}
        <div id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 p-4 sm:p-10 bg-canvas border-2 border-hairline-strong rounded-[10px] shadow-tactile relative overflow-hidden">
          <Crosshair position="top-left" />
          <Crosshair position="top-right" />
          <Crosshair position="bottom-left" />
          <Crosshair position="bottom-right" />

          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <span className="block font-mono text-[11px] sm:text-xs leading-relaxed text-status-emerald font-bold tracking-wider uppercase">
                [ ZERO-FRICTION HIRE // SUMMER & FALL INTERNSHIP COCKPIT ]
              </span>
              <h3 id="contact-heading" className="font-sans font-bold text-2xl sm:text-4xl text-ink-primary tracking-tight text-balance">
                What role are you looking to fill?
              </h3>
              <p className="text-sm text-ink-secondary max-w-xl mx-auto">
                Select your hiring need below to review Ashmit&apos;s immediate Day-1 deliverables:
              </p>
            </div>

            {/* 3 Role Selection Tabs */}
            <div role="group" aria-label="Role you are hiring for" className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-surface border border-hairline rounded-[8px] font-mono text-xs">
              {(["engineer", "product", "uiux"] as const).map((r) => {
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls="role-deliverables"
                    onClick={() => {
                      soundEngine.playClick(900);
                      setSelectedRole(r);
                    }}
                    className={`min-h-11 py-3 px-3 rounded-[6px] text-center font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange ${
                      isSelected
                        ? "bg-ink-primary text-white shadow-sm"
                        : "text-ink-secondary hover:text-ink-primary hover:bg-canvas"
                    }`}
                  >
                    <span>{roles[r].title}</span>
                  </button>
                );
              })}
            </div>

            {/* Day-1 Deliverables Card */}
            <div id="role-deliverables" className="p-4 sm:p-6 bg-surface border border-hairline rounded-[8px] shadow-sm space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-hairline font-mono text-xs leading-relaxed">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="w-2 h-2 shrink-0 mt-1 rounded-full bg-status-emerald" />
                  <span aria-live="polite" className="font-bold text-ink-primary">
                    DAY-1 IMMEDIATE DELIVERABLES ({currentPitch.title.toUpperCase()})
                  </span>
                </div>
                <span className={`font-bold text-[11px] ${currentPitch.color}`}>
                  {currentPitch.badge}
                </span>
              </div>

              <ul className="space-y-3 font-sans text-sm text-ink-secondary">
                {currentPitch.day1Deliverables.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span aria-hidden="true" className="font-mono text-status-emerald font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {/* Launch Email CTA */}
              <button
                type="button"
                onClick={handleLaunchEmail}
                className="flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 px-5 py-3.5 bg-signal-orange text-white text-sm font-sans font-bold rounded-[6px] hover:bg-signal-orange-hover shadow-tactile transition-colors motion-safe:active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>{currentPitch.ctaText}</span>
              </button>

              {/* Copy Email CTA */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex min-h-11 min-w-0 w-full sm:w-auto items-center justify-center gap-2 px-4 py-3.5 bg-surface border border-hairline text-ink-primary text-xs sm:text-sm font-mono font-medium rounded-[6px] hover:bg-surface-recessed shadow-tactile transition-colors motion-safe:active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 shrink-0 text-status-emerald" />
                ) : (
                  <Copy className="w-4 h-4 shrink-0 text-ink-secondary" />
                )}
                <span className="break-all">{copiedEmail ? "Copied Email!" : `Copy: ${CANDIDATE_PROFILE.socials.email}`}</span>
              </button>

              {/* Resume Sheet Trigger */}
              <button
                type="button"
                disabled={!onOpenResume}
                onClick={() => {
                  soundEngine.playClick(900);
                  if (onOpenResume) onOpenResume();
                }}
                className="flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 px-4 py-3.5 bg-surface border border-hairline text-ink-primary text-xs sm:text-sm font-mono font-medium rounded-[6px] hover:bg-surface-recessed shadow-tactile transition-colors motion-safe:active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Briefcase className="w-4 h-4 shrink-0 text-blueprint-blue" />
                <span>Inspect Full Spec Sheet [R]</span>
              </button>
            </div>

          </div>
        </div>

        {/* =======================================================================
            MODULE 3: MARKET LAUNCH FOOTER & TELEMETRY COLOPHON
            ======================================================================= */}
        <div className="pt-8 border-t border-hairline space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-status-emerald motion-safe:animate-pulse" />
                <span className="font-sans font-bold text-lg text-ink-primary">
                  {CANDIDATE_PROFILE.name}
                </span>
                <span className="w-full sm:w-auto font-mono text-xs text-ink-secondary leading-relaxed">
                  {"//"} {CANDIDATE_PROFILE.role} &amp; Design Engineer
                </span>
              </div>
              <p className="mt-3 text-xs text-ink-secondary max-w-lg leading-relaxed font-sans">
                Built with Next.js 15, React 19, Tailwind CSS, Framer Motion, and the Web Audio API. A light industrial interface with semantic color tokens and tactile interactions.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] leading-relaxed text-ink-secondary">
              <div className="flex items-center gap-1.5 p-2 bg-canvas border border-hairline rounded">
                <Compass className="w-3.5 h-3.5 shrink-0 text-signal-orange" />
                <span>{CANDIDATE_PROFILE.location.coordinates}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-canvas border border-hairline rounded">
                <Layers className="w-3.5 h-3.5 shrink-0 text-status-emerald" />
                <span>SEMANTIC DESIGN TOKENS</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-x-6 gap-y-3 font-mono text-[11px] leading-relaxed text-ink-secondary pt-4 border-t border-hairline/60">
            <div className="min-w-0">
              © {new Date().getFullYear()} ASHMIT KATHAT. JAIPUR, RAJASTHAN, INDIA.
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href={CANDIDATE_PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick(800)}
                className="min-h-11 hover:text-ink-primary transition-colors flex items-center gap-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span aria-hidden="true">•</span>
              <a
                href={CANDIDATE_PROFILE.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick(850)}
                className="min-h-11 hover:text-blueprint-blue transition-colors flex items-center gap-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <span aria-hidden="true">•</span>
              <a
                href={`mailto:${CANDIDATE_PROFILE.socials.email}`}
                onClick={() => soundEngine.playClick(900)}
                className="min-h-11 min-w-0 flex items-center break-all hover:text-signal-orange transition-colors rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-orange"
              >
                {CANDIDATE_PROFILE.socials.email.toUpperCase()}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

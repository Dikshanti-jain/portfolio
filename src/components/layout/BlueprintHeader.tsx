"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Command, ScanLine } from "lucide-react";
import { CANDIDATE_PROFILE } from "@/data/portfolioData";
import { useXRayMode } from "@/context/XRayContext";
import { soundEngine } from "@/utils/soundEngine";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "case-studies", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export function BlueprintHeader({ onOpenCommandPalette }: { onOpenCommandPalette?: () => void }) {
  const { isXRayActive, toggleXRay } = useXRayMode();
  const [activeSection, setActiveSection] = useState("about");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      let active = "about";
      for (const section of SECTIONS) {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= 160) active = section.id;
      }
      setActiveSection(active);
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(updateSection); };
    updateSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hairline bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-4 px-5 sm:px-8 lg:px-12">
        <a href="#about" aria-label="Ashmit Kathat — back to introduction" className="flex min-h-[72px] items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-ink-primary bg-ink-primary font-mono text-xs text-white" aria-hidden="true">ak<span className="text-signal-orange">.</span></span>
          <span><span className="block text-sm font-bold tracking-tight">{CANDIDATE_PROFILE.name}</span><span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wider text-ink-secondary">Design &amp; engineering</span></span>
        </a>
        <nav aria-label="Main navigation" className="order-3 flex w-full justify-between border-t border-hairline md:order-none md:w-auto md:gap-6 md:border-0 lg:gap-8">
          {SECTIONS.map(section => <a key={section.id} href={`#${section.id}`} aria-current={activeSection === section.id ? "location" : undefined} className={`relative inline-flex min-h-11 items-center text-xs font-medium transition-colors md:min-h-[72px] ${activeSection === section.id ? "text-ink-primary" : "text-ink-secondary hover:text-ink-primary"}`}>
            {section.label}
            {activeSection === section.id && <motion.span layoutId="navigation-indicator" className="absolute inset-x-0 bottom-0 h-0.5 bg-signal-orange" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
          </a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onOpenCommandPalette} aria-label="Open command palette" aria-keyshortcuts="Control+k Meta+k" title="Search commands (Ctrl/⌘ K)" className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded-md border border-hairline bg-canvas px-3 text-ink-secondary hover:border-ink-secondary"><Command className="h-3.5 w-3.5" /><kbd className="hidden font-mono text-[10px] lg:block">K</kbd></button>
          <button aria-pressed={isXRayActive} aria-label="Toggle UX X-Ray" title="Inspect design decisions (X)" onClick={() => { soundEngine.playSnap(!isXRayActive); toggleXRay(); }} className={`inline-flex h-11 items-center gap-2 rounded-md border px-3 font-mono text-[10px] transition-colors ${isXRayActive ? "border-blueprint-blue bg-blueprint-blue text-white" : "border-hairline text-ink-secondary hover:border-blueprint-blue hover:text-blueprint-blue"}`}><ScanLine className="h-4 w-4" /><span className="hidden sm:inline">X-Ray</span></button>
        </div>
      </div>
      <motion.div aria-hidden="true" style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="absolute bottom-[-1px] left-0 h-px w-full bg-signal-orange/50" />
    </header>
  );
}

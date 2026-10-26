"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CANDIDATE_PROFILE } from "@/data/portfolioData";
import { useXRayMode } from "@/context/XRayContext";
import { soundEngine } from "@/utils/soundEngine";
import { Copy, Check, FileText, Github, Linkedin, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { TRANSITIONS } from "@/lib/transitions";

interface HardwareDockProps {
  onOpenResume?: () => void;
}

export function HardwareDock({ onOpenResume }: HardwareDockProps) {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const { isXRayActive, toggleXRay } = useXRayMode();

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

  const handleOpenResume = () => {
    soundEngine.playClick(900);
    if (onOpenResume) {
      onOpenResume();
    }
  };

  const handleToggleXRay = () => {
    soundEngine.playSnap(!isXRayActive);
    toggleXRay();
  };

  return (
    <>
      {/* Floating Hardware Dock Container */}
      <nav
        aria-label="Tactile Hardware Launchpad Dock"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-1.5rem)] flex items-center gap-1 sm:gap-1.5 p-1.5 bg-surface border border-hairline rounded-[12px] shadow-drawer select-none"
      >
        {/* Button 1: 1-Click Email Copy */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={TRANSITIONS.tactileSpring}
          onClick={handleCopyEmail}
          aria-label={copiedEmail ? "Email copied" : "Copy email address"}
          title="1-Click Copy Email Address"
          className="flex items-center gap-2 h-11 px-3 rounded-[8px] font-mono text-xs text-ink-primary hover:bg-canvas hover:text-signal-orange border border-transparent hover:border-hairline transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
        >
          {copiedEmail ? (
            <Check className="w-4 h-4 text-status-emerald" />
          ) : (
            <Copy className="w-4 h-4 text-ink-secondary" />
          )}
          <span className="hidden sm:inline">
            {copiedEmail ? "Copied" : "Copy Email"}
          </span>
        </motion.button>

        <div className="w-px h-6 bg-hairline" />

        {/* Button 2: Resume Drawer */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={TRANSITIONS.tactileSpring}
          onClick={handleOpenResume}
          aria-label="Open resume"
          title="Open Resume Drawer"
          className="flex items-center gap-2 h-11 px-3 rounded-[8px] font-mono text-xs text-ink-primary hover:bg-canvas hover:text-signal-orange border border-transparent hover:border-hairline transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
        >
          <FileText className="w-4 h-4 text-ink-secondary" />
          <span className="hidden sm:inline">Resume</span>
        </motion.button>

        <div className="w-px h-6 bg-hairline" />

        {/* Button 3: GitHub Link */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          transition={TRANSITIONS.tactileSpring}
          href={CANDIDATE_PROFILE.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundEngine.playClick(800)}
          title="GitHub Profile"
          aria-label="GitHub profile"
          className="flex items-center justify-center w-11 h-11 rounded-[8px] text-ink-secondary hover:text-ink-primary hover:bg-canvas border border-transparent hover:border-hairline transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
        >
          <Github className="w-4 h-4" />
        </motion.a>

        {/* Button 4: LinkedIn Link */}
        <motion.a
          whileTap={{ scale: 0.95 }}
          transition={TRANSITIONS.tactileSpring}
          href={CANDIDATE_PROFILE.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundEngine.playClick(850)}
          title="LinkedIn Profile"
          aria-label="LinkedIn profile"
          className="flex items-center justify-center w-11 h-11 rounded-[8px] text-ink-secondary hover:text-blueprint-blue hover:bg-canvas border border-transparent hover:border-hairline transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange"
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>

        <div className="w-px h-6 bg-hairline" />

        {/* Button 5: UX X-Ray Toggle */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={TRANSITIONS.tactileSpring}
          onClick={handleToggleXRay}
          aria-label="Toggle UX X-Ray"
          aria-pressed={isXRayActive}
          title="Toggle UX X-Ray Blueprint Mode (Shortcut: 'X')"
          className={`flex items-center gap-1.5 h-11 px-3 rounded-[8px] font-mono text-xs transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange ${
            isXRayActive
              ? "bg-blueprint-blue text-white border-blue-700 shadow-sm"
              : "text-ink-secondary hover:text-blueprint-blue hover:bg-canvas border-transparent hover:border-hairline"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline font-bold">X-Ray</span>
          <span className="bg-surface-recessed text-ink-tertiary px-1 py-0.5 rounded text-[10px]">
            X
          </span>
        </motion.button>
      </nav>
    </>
  );
}

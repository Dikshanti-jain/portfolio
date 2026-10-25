"use client";

import { useEffect, useState } from "react";
import { BlueprintHeader } from "@/components/layout/BlueprintHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { CaseStudyGrid } from "@/components/work/CaseStudyGrid";
import { AIWorkflowPipeline } from "@/components/ai/AIWorkflowPipeline";
import { CredentialsAndFooter } from "@/components/sections/CredentialsAndFooter";
import { HardwareDock } from "@/components/layout/HardwareDock";
import { ResumeDrawer } from "@/components/modals/ResumeDrawer";
import { CommandPalette } from "@/components/modals/CommandPalette";
import { useXRayMode } from "@/context/XRayContext";
import { soundEngine } from "@/utils/soundEngine";
import { isShortcutTarget } from "@/lib/keyboard";
import type { CaseStudy } from "@/types/portfolio";
import { CASE_STUDIES, CANDIDATE_PROFILE } from "@/data/portfolioData";
import { toast } from "sonner";

type Overlay = { type: "resume" | "palette" } | { type: "project"; project: CaseStudy } | null;

export default function Home() {
  const { toggleXRay } = useXRayMode();
  const [overlay, setOverlay] = useState<Overlay>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.isComposing) return;
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && !event.altKey && key === "k") {
        event.preventDefault();
        setOverlay(current => current?.type === "palette" ? null : { type: "palette" });
        return;
      }
      if (overlay || isShortcutTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      if (key === "x") { event.preventDefault(); toggleXRay(); }
      else if (key === "k") { event.preventDefault(); setOverlay({ type: "palette" }); }
      else if (key === "r") { event.preventDefault(); setOverlay({ type: "resume" }); }
      else if (key === "c") {
        event.preventDefault();
        navigator.clipboard.writeText(CANDIDATE_PROFILE.socials.email)
          .then(() => toast.success("Email copied", { description: CANDIDATE_PROFILE.socials.email }))
          .catch(() => toast.error("Couldn’t copy email", { description: CANDIDATE_PROFILE.socials.email }));
      } else if (["1", "2", "3"].includes(key)) {
        event.preventDefault();
        soundEngine.playClick(800);
        setOverlay({ type: "project", project: CASE_STUDIES[Number(key) - 1] });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [overlay, toggleXRay]);

  const openResume = () => setOverlay({ type: "resume" });

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <BlueprintHeader onOpenCommandPalette={() => setOverlay({ type: "palette" })} />
      <main id="main-content" tabIndex={-1} className="relative min-h-screen bg-canvas pb-28 font-sans text-ink-primary">
        <div className="relative mx-auto max-w-[1440px] border-x border-hairline bg-surface/30">
          <HeroSection onOpenResume={openResume} />
          <CaseStudyGrid activeProject={overlay?.type === "project" ? overlay.project : null} onSelectProject={project => setOverlay(project ? { type: "project", project } : null)} />
          <AIWorkflowPipeline />
          <CredentialsAndFooter onOpenResume={openResume} />
        </div>
      </main>
      <HardwareDock onOpenResume={openResume} />
      <ResumeDrawer isOpen={overlay?.type === "resume"} onClose={() => setOverlay(current => current?.type === "resume" ? null : current)} />
      <CommandPalette isOpen={overlay?.type === "palette"} onClose={() => setOverlay(current => current?.type === "palette" ? null : current)} onToggleXRay={toggleXRay} onOpenProject={project => setOverlay({ type: "project", project })} onOpenResume={openResume} />
    </>
  );
}

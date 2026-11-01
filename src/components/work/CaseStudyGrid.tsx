"use client";

import React, { useState } from "react";
import { CASE_STUDIES } from "@/data/portfolioData";
import { CaseStudy } from "@/types/portfolio";
import { CaseStudyCard } from "./CaseStudyCard";
import { CaseStudyDrawer } from "./CaseStudyDrawer";
import { Crosshair } from "@/components/ui/Crosshair";
import { XRayAnnotation } from "@/context/XRayContext";
import { soundEngine } from "@/utils/soundEngine";

interface CaseStudyGridProps {
  onSelectProject?: (project: CaseStudy | null) => void;
  activeProject?: CaseStudy | null;
}

export function CaseStudyGrid({ onSelectProject, activeProject }: CaseStudyGridProps) {
  const [internalSelectedProject, setInternalSelectedProject] = useState<CaseStudy | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const selectedProject = activeProject !== undefined ? activeProject : internalSelectedProject;

  const handleOpenProject = React.useCallback(
    (project: CaseStudy) => {
      soundEngine.playClick(900);
      if (onSelectProject) {
        onSelectProject(project);
      } else {
        setInternalSelectedProject(project);
        setIsDrawerOpen(true);
      }
    },
    [onSelectProject]
  );

  const handleCloseProject = () => {
    soundEngine.playClick(600);
    if (onSelectProject) {
      onSelectProject(null);
    }
    setInternalSelectedProject(null);
    setIsDrawerOpen(false);
  };

  return (
    <section id="case-studies" className="relative w-full border-b border-hairline py-16 sm:py-24 bg-surface">
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-6 border-b border-hairline">
          <div>
            <XRayAnnotation
              token="SEC:CASE_STUDIES"
              spec="JetBrains Mono 11px / Tracking +0.12em"
              badgePlacement="top-left"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] text-signal-orange-ink uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-signal-orange" />
                <span>02 / Selected work</span>
              </div>
            </XRayAnnotation>
            <h2 className="mt-3 font-sans font-semibold text-3xl sm:text-4xl text-ink-primary tracking-[-0.04em]">
              Different problems. Same care.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] text-ink-secondary">
            <span>03 CASE STUDIES</span>
            <span aria-hidden="true">/</span>
            <span className="hidden md:inline">SHORTCUTS <kbd className="keycap">1</kbd> <kbd className="keycap">2</kbd> <kbd className="keycap">3</kbd></span>
          </div>
        </div>

        {/* 3-Column Architectural Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((project, index) => (
            <CaseStudyCard
              key={project.id}
              project={project}
              index={index}
              onOpen={handleOpenProject}
            />
          ))}
        </div>

      </div>

      {/* Origin-Aware Case Study Drawer */}
      <CaseStudyDrawer
        project={selectedProject}
        isOpen={isDrawerOpen || !!activeProject}
        onClose={handleCloseProject}
      />
    </section>
  );
}

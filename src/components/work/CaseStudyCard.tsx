"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/types/portfolio";
import { XRayAnnotation } from "@/context/XRayContext";
import { DevMateCockpitCanvas } from "./canvases/DevMateCockpitCanvas";
import { FloodWatchRadarCanvas } from "./canvases/FloodWatchRadarCanvas";
import { UltronAgentMatrixCanvas } from "./canvases/UltronAgentMatrixCanvas";
import { TRANSITIONS } from "@/lib/transitions";

interface CaseStudyCardProps {
  project: CaseStudy;
  index: number;
  onOpen: (project: CaseStudy) => void;
}

export function CaseStudyCard({ project, index, onOpen }: CaseStudyCardProps) {
  const reducedMotion = useReducedMotion();
  return (
    <XRayAnnotation token={`CARD:STUDY_${index + 1}`} spec="Independent preview controls / semantic open button" className="h-full" badgePlacement="top-left">
      <motion.article initial={{ opacity: 0.6, y: reducedMotion ? 0 : 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.06 }} className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-hairline bg-surface shadow-tactile transition-colors hover:border-ink-tertiary focus-within:border-ink-primary">
        <div className="p-4 pb-0">
          <div className="mb-2 flex justify-between font-mono text-[9px] uppercase tracking-wider text-ink-secondary"><span>Interactive interface study</span><span>0{index + 1}</span></div>
          {project.id === "devmate-mentors" ? <DevMateCockpitCanvas /> : project.id === "floodwatch-ai" ? <FloodWatchRadarCanvas /> : <UltronAgentMatrixCanvas />}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-signal-orange-ink">{project.category}</p>
          <h3 className="mt-3 min-h-16 font-sans text-2xl font-semibold leading-8 tracking-[-0.035em]">{project.title}</h3>
          <p className="mt-2 min-h-8 font-mono text-[10px] leading-relaxed text-ink-secondary">{project.role} <span aria-hidden="true">/</span> {project.timeline}</p>
          <p className="mb-6 mt-3 line-clamp-3 text-[13px] leading-relaxed text-ink-secondary">{project.summary}</p>
          <div className="mt-auto grid grid-cols-2 gap-3 border-t border-hairline pt-4">
            {project.metrics.slice(0, 2).map(metric => <div key={metric.label}><p className="font-mono text-[9px] uppercase leading-relaxed tracking-wide text-ink-secondary">{metric.label}</p><p className="mt-1 text-xl font-semibold tracking-tight">{metric.value}</p></div>)}
          </div>
        </div>
        <motion.button aria-label={`View ${project.title} case study`} onClick={() => onOpen(project)} whileTap={{ scale: 0.99 }} transition={TRANSITIONS.tactileSpring} className="flex min-h-14 w-full items-center justify-between gap-4 border-t border-hairline bg-canvas/60 px-5 text-left text-xs font-semibold transition-colors hover:bg-ink-primary hover:text-white focus-visible:outline-offset-[-4px]">
          View case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      </motion.article>
    </XRayAnnotation>
  );
}

"use client";

import React, { useState } from "react";
import { useXRayMode } from "@/context/XRayContext";
import { Activity, Sparkles, CheckCircle2 } from "lucide-react";

export function DevMateCockpitCanvas() {
  const { isXRayActive } = useXRayMode();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[210px] bg-canvas border border-hairline rounded-[6px] p-3 overflow-hidden select-none group/canvas flex flex-col justify-between">
      {/* Top Telemetry Strip */}
      <div className="flex items-center justify-between font-mono text-[9.5px] pb-1.5 border-b border-hairline/80 z-10">
        <div className="flex items-center gap-1.5 text-signal-orange font-bold">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>COCKPIT TELEMETRY // AI MOCK</span>
        </div>
        <span className="text-status-emerald bg-status-emerald/10 px-1.5 py-0.2 rounded font-bold">
          LATENCY: 18MS
        </span>
      </div>

      {/* Center Interactive Layout: ATS Radar Score + Audio Pacing Spectrum */}
      <div className="grid grid-cols-12 gap-2 my-auto z-10">
        
        {/* Left: ATS Radial Score Module */}
        <div className="col-span-5 p-2 bg-white border border-hairline rounded flex flex-col items-center justify-center shadow-sm">
          <div className="relative w-14 h-14 flex items-center justify-center">
            {/* Circular Progress Ring */}
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#EAECEF"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                stroke="#FF4F00"
                strokeWidth="4"
                strokeDasharray="138"
                strokeDashoffset="8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-xs font-bold text-ink-primary">94%</span>
              <span className="text-[7px] text-ink-tertiary">ATS</span>
            </div>
          </div>
          <span className="text-[8px] font-mono text-ink-secondary mt-1">
            OPTIMAL MATCH
          </span>
        </div>

        {/* Right: Audio Waveform & Speech-to-Text Heartbeat */}
        <div className="col-span-7 p-2 bg-white border border-hairline rounded flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center text-[8.5px] font-mono text-ink-tertiary">
            <span>AI AUDIO PACING</span>
            <span className="text-status-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-status-emerald animate-ping" />
              LIVE
            </span>
          </div>

          {/* Dynamic Audio Bars */}
          <div className="flex items-end justify-between h-8 gap-0.5 my-1">
            {[40, 75, 55, 90, 60, 85, 30, 95, 70, 45, 80, 50, 65, 35].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`w-1 rounded-t-sm transition-all duration-150 ${
                  hoveredNode !== null ? "bg-signal-orange" : "bg-ink-primary/70"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-between text-[7.5px] font-mono text-ink-secondary">
            <span>VOICE CADENCE: 140 WPM</span>
            <span>CLARITY: HIGH</span>
          </div>
        </div>

      </div>

      {/* Bottom Cognitive Load Diagnostic Nodes */}
      <div className="grid grid-cols-3 gap-1.5 z-10 font-mono text-[8px]">
        {[
          { label: "COGNITIVE LOAD", val: "-44%", color: "text-status-emerald" },
          { label: "DIAGNOSTIC NODES", val: "3 PRIORITY", color: "text-signal-orange" },
          { label: "TOKEN COVERAGE", val: "100%", color: "text-blueprint-blue" },
        ].map((node, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredNode(i)}
            onMouseLeave={() => setHoveredNode(null)}
            className={`p-1 bg-white border rounded text-center transition-all cursor-pointer ${
              hoveredNode === i
                ? "border-signal-orange shadow-sm scale-102"
                : "border-hairline"
            }`}
          >
            <div className="text-ink-tertiary text-[7px] truncate">{node.label}</div>
            <div className={`font-bold ${node.color}`}>{node.val}</div>
          </div>
        ))}
      </div>

      {/* Hover Laser Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-signal-orange/[0.04] to-transparent -translate-y-full group-hover/canvas:translate-y-full transition-transform duration-1000 pointer-events-none" />

      {/* X-Ray CAD Overlay Mode */}
      {isXRayActive && (
        <div className="absolute inset-0 bg-blueprint-blue/[0.03] border-2 border-dashed border-blueprint-blue/60 pointer-events-none p-1 flex items-end justify-end">
          <span className="font-mono text-[8px] bg-blueprint-blue text-white px-1 rounded">
            FITTS: 48PX // 8PT GRID
          </span>
        </div>
      )}
    </div>
  );
}

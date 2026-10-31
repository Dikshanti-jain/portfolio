"use client";

import React, { useState } from "react";
import { soundEngine } from "@/utils/soundEngine";
import { useXRayMode } from "@/context/XRayContext";
import { ShieldCheck, Lock, Unlock, Cpu, Terminal } from "lucide-react";

export function UltronAgentMatrixCanvas() {
  const { isXRayActive } = useXRayMode();
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [activeNode, setActiveNode] = useState<string>("gate");

  const toggleSafetyLock = () => {
    soundEngine.playSnap(!isLocked);
    setIsLocked(!isLocked);
  };

  return (
    <div className="relative w-full h-[210px] bg-canvas border border-hairline rounded-[6px] p-3 overflow-hidden select-none group/canvas flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[9.5px] pb-1.5 border-b border-hairline/80 z-10">
        <div className="flex items-center gap-1.5 text-status-emerald font-bold">
          <Cpu className="w-3 h-3" />
          <span>HUMAN-IN-THE-LOOP SAFETY GATE</span>
        </div>
        <span className="text-ink-tertiary bg-surface border border-hairline px-1.5 py-0.2 rounded">
          KEYBOARD &lt; 140MS
        </span>
      </div>

      {/* Node Graph Schematic with SVG Connector Lines */}
      <div className="relative flex-1 flex items-center justify-between px-2 my-2 z-10">
        {/* SVG Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="#DDE1E7" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="#0047FF" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Node 1: Autonomous Agent Core */}
        <div
          onClick={() => {
            soundEngine.playClick(600);
            setActiveNode("core");
          }}
          className={`p-2 rounded bg-white border cursor-pointer transition-all ${
            activeNode === "core" ? "border-status-emerald shadow-sm scale-105" : "border-hairline"
          }`}
        >
          <div className="flex items-center gap-1 text-[8.5px] font-mono text-status-emerald font-bold">
            <Terminal className="w-2.5 h-2.5" />
            <span>AGENT</span>
          </div>
          <div className="text-[7.5px] font-mono text-ink-tertiary mt-0.5">
            REASONING
          </div>
        </div>

        {/* Node 2: Safety Intercept Gate (Click to toggle) */}
        <div
          onClick={() => {
            soundEngine.playClick(800);
            setActiveNode("gate");
          }}
          className={`p-2 rounded bg-white border cursor-pointer transition-all ${
            activeNode === "gate" ? "border-signal-orange shadow-sm scale-105" : "border-hairline"
          }`}
        >
          <div className="flex items-center gap-1 text-[8.5px] font-mono text-signal-orange font-bold">
            <ShieldCheck className="w-2.5 h-2.5" />
            <span>INTERCEPT</span>
          </div>
          <div className="text-[7.5px] font-mono text-ink-tertiary mt-0.5">
            ZERO RUNAWAYS
          </div>
        </div>

        {/* Node 3: Destructive Mutation Tool */}
        <div
          onClick={() => {
            soundEngine.playClick(1000);
            setActiveNode("tool");
          }}
          className={`p-2 rounded bg-white border cursor-pointer transition-all ${
            activeNode === "tool" ? "border-blueprint-blue shadow-sm scale-105" : "border-hairline"
          }`}
        >
          <div className="flex items-center gap-1 text-[8.5px] font-mono text-blueprint-blue font-bold">
            <Cpu className="w-2.5 h-2.5" />
            <span>EXECUTE</span>
          </div>
          <div className="text-[7.5px] font-mono text-ink-tertiary mt-0.5">
            RESTRICTED
          </div>
        </div>
      </div>

      {/* Bottom Interactive Slide-to-Approve Toggle Control */}
      <div className="z-10 p-2 bg-surface-recessed border border-hairline rounded-[6px] flex items-center justify-between font-mono text-[9px]">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <Lock className="w-3.5 h-3.5 text-signal-orange" />
          ) : (
            <Unlock className="w-3.5 h-3.5 text-status-emerald" />
          )}
          <span className="text-ink-primary font-bold">
            {isLocked ? "SAFETY LOCK ENGAGED" : "MANUAL OVERRIDE APPROVED"}
          </span>
        </div>

        <button
          onClick={toggleSafetyLock}
          className={`px-2 py-1 rounded text-[8.5px] font-bold transition-all ${
            isLocked
              ? "bg-signal-orange text-white hover:bg-signal-orange-hover"
              : "bg-status-emerald text-white hover:bg-emerald-700"
          }`}
        >
          {isLocked ? "SLIDE TO UNLOCK" : "RESET LOCK"}
        </button>
      </div>

      {isXRayActive && (
        <div className="absolute inset-0 bg-blueprint-blue/[0.04] border-2 border-dashed border-blueprint-blue pointer-events-none p-1 flex items-end justify-end">
          <span className="font-mono text-[8px] bg-blueprint-blue text-white px-1 rounded">
            CONFIDENCE SCORE: 99.4% // 1-CLICK REVERT
          </span>
        </div>
      )}
    </div>
  );
}

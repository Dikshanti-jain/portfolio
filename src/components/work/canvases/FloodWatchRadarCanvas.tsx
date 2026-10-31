"use client";

import React, { useState } from "react";
import { useXRayMode } from "@/context/XRayContext";
import { Compass, Radio } from "lucide-react";

export function FloodWatchRadarCanvas() {
  const { isXRayActive } = useXRayMode();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 120, y: 90 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-full h-[210px] bg-canvas border border-hairline rounded-[6px] p-3 overflow-hidden select-none group/canvas flex flex-col justify-between shadow-tactile"
    >
      {/* Top GIS Status Header */}
      <div className="flex items-center justify-between font-mono text-[9.5px] pb-1.5 border-b border-hairline/80 z-10 text-ink-primary">
        <div className="flex items-center gap-1.5 text-blueprint-blue font-bold">
          <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: "12s" }} />
          <span>ISRO DEM // 2D TOPOGRAPHY</span>
        </div>
        <div className="flex items-center gap-1 text-status-emerald bg-status-emerald/10 px-1.5 py-0.2 rounded font-bold">
          <Radio className="w-2.5 h-2.5 animate-pulse" />
          <span>0.82S LATENCY</span>
        </div>
      </div>

      {/* SVG Topographical Contour Map & Radar Sweep */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-90">
        {/* Radar Circles */}
        <circle cx="50%" cy="50%" r="40" stroke="#0047FF" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.3" />
        <circle cx="50%" cy="50%" r="75" stroke="#0047FF" strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.2" />
        <circle cx="50%" cy="50%" r="110" stroke="#0047FF" strokeWidth="0.8" fill="none" opacity="0.15" />

        {/* Dynamic Contour Ripples following cursor */}
        <ellipse
          cx={mousePos.x}
          cy={mousePos.y}
          rx="50"
          ry="32"
          stroke="#FF4F00"
          strokeWidth="1.2"
          fill="none"
          opacity="0.5"
          className="transition-all duration-75"
        />
        <ellipse
          cx={mousePos.x}
          cy={mousePos.y}
          rx="85"
          ry="54"
          stroke="#0047FF"
          strokeWidth="1"
          fill="none"
          opacity="0.35"
          className="transition-all duration-100"
        />

        {/* Village Geo-Points with Dual Shape Warning Icons */}
        <g transform="translate(60, 80)">
          <polygon points="0,-6 6,4 -6,4" fill="#FF4F00" />
          <text x="10" y="2" fill="#111315" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            VILLAGE A-12 [EVACUATE]
          </text>
        </g>

        <g transform="translate(190, 130)">
          <rect x="-4" y="-4" width="8" height="8" fill="#107C41" />
          <text x="8" y="2" fill="#111315" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            SECTOR 4 [SAFE]
          </text>
        </g>

        {/* Simulated Sweep Line */}
        <line
          x1="50%"
          y1="50%"
          x2="90%"
          y2="20%"
          stroke="#0047FF"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="origin-center animate-spin"
          style={{ animationDuration: "6s" }}
        />
      </svg>

      {/* Bottom Telemetry HUD */}
      <div className="z-10 flex items-center justify-between font-mono text-[8px] text-ink-secondary bg-white/95 backdrop-blur-sm p-1.5 rounded border border-hairline shadow-sm">
        <div>
          COORDS: <span className="text-ink-primary font-bold">{mousePos.x}°E, {mousePos.y}°N</span>
        </div>
        <div className="text-signal-orange font-semibold">
          ELEVATION: {380 + (mousePos.x % 140)}M
        </div>
        <div className="text-status-emerald font-bold">
          ZERO 3D OVERHEAD
        </div>
      </div>

      {isXRayActive && (
        <div className="absolute inset-0 bg-blueprint-blue/[0.04] border-2 border-dashed border-blueprint-blue pointer-events-none p-1 flex items-end justify-end">
          <span className="font-mono text-[8px] bg-blueprint-blue text-white px-1 rounded">
            2D RASTER // ZERO WEBGPU OVERHEAD
          </span>
        </div>
      )}
    </div>
  );
}

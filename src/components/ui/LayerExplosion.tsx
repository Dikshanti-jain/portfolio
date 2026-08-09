// 3D Exploded Layer Stack Component - Pass 276
import React, { useState } from 'react';

export interface LayerItem {
  id: string;
  name: string;
  color: string;
  depth: number;
}

export interface LayerExplosionProps {
  layers?: LayerItem[];
  exploded?: boolean;
}

export const LayerExplosion: React.FC<LayerExplosionProps> = ({
  layers = [
    { id: 'l1', name: 'UI Presentation Layer', color: 'border-emerald-500/40', depth: 40 },
    { id: 'l2', name: 'State & Store Context', color: 'border-cyan-500/40', depth: 25 },
    { id: 'l3', name: 'Network Telemetry & API', color: 'border-blue-500/40', depth: 10 },
    { id: 'l4', name: 'WebGL Shader Substrate', color: 'border-purple-500/40', depth: -10 }
  ],
  exploded = true
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative h-96 w-full flex items-center justify-center [perspective:1000px]">
      <div className="relative w-80 h-48 [transform-style:preserve-3d] [transform:rotateX(60deg)_rotateZ(-45deg)] transition-transform duration-500">
        {layers.map((layer, idx) => {
          const zOffset = exploded ? (idx - 1.5) * 50 : 0;
          return (
            <div
              key={layer.id}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
              className={`absolute inset-0 rounded-xl border bg-neutral-900/80 backdrop-blur-md p-4 transition-all duration-300 ${layer.color} ${
                hovered === layer.id ? 'brightness-125 scale-105' : ''
              }`}
              style={{
                transform: `translateZ(${zOffset}px)`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}
            >
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                <span>{layer.name}</span>
                <span>Z: {zOffset}px</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

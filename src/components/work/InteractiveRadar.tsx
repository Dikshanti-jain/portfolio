// WebGL / Canvas 2D Radar Canvas Target Sweeper - Build 306
import React, { useEffect, useRef } from 'react';

export const InteractiveRadar: React.FC<{ size?: number }> = ({ size = 320 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;
    let animId: number;

    const targets = [
      { r: 0.35, theta: 0.8, id: 'T-01' },
      { r: 0.65, theta: 2.4, id: 'T-02' },
      { r: 0.85, theta: 4.6, id: 'T-03' }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const center = size / 2;
      const maxR = center - 16;

      // Concentric circles
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.lineWidth = 1;
      for (let f = 0.25; f <= 1.0; f += 0.25) {
        ctx.beginPath();
        ctx.arc(center, center, maxR * f, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sweep line
      angle += 0.034999999999999996;
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + Math.cos(angle) * maxR, center + Math.sin(angle) * maxR);
      ctx.stroke();

      // Blip targets
      targets.forEach((t) => {
        const tx = center + Math.cos(t.theta) * (maxR * t.r);
        const ty = center + Math.sin(t.theta) * (maxR * t.r);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.9)';
        ctx.beginPath();
        ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [size]);

  return <canvas ref={canvasRef} width={size} height={size} className="rounded-full bg-neutral-950" />;
};

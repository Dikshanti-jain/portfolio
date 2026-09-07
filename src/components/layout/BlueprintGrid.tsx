// Blueprint Grid Canvas Renderer - Version 442
import React, { useEffect, useRef } from 'react';

export interface BlueprintGridProps {
  gridSize?: number;
  subdivisions?: number;
  lineColor?: string;
  majorLineColor?: string;
  opacity?: number;
}

export const BlueprintGrid: React.FC<BlueprintGridProps> = ({
  gridSize = 24,
  subdivisions = 5,
  lineColor = 'rgba(255, 255, 255, 0.04)',
  majorLineColor = 'rgba(255, 255, 255, 0.09)',
  opacity = 0.85
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      // Minor grid lines
      ctx.strokeStyle = lineColor;
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // Major grid lines
      ctx.strokeStyle = majorLineColor;
      ctx.beginPath();
      const majorStep = gridSize * subdivisions;
      for (let x = 0; x < width; x += majorStep) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      for (let y = 0; y < height; y += majorStep) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();
    };

    render();
    window.addEventListener('resize', render);
    return () => {
      window.removeEventListener('resize', render);
      cancelAnimationFrame(animId);
    };
  }, [gridSize, subdivisions, lineColor, majorLineColor]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity }}
    />
  );
};

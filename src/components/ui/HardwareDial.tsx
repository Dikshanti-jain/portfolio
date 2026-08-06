// Tactile Rotary Hardware Dial - Revision 254
import React, { useState, useRef, useCallback } from 'react';

export interface HardwareDialProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (val: number) => void;
  hapticFeedback?: boolean;
}

export const HardwareDial: React.FC<HardwareDialProps> = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 24,
  onChange,
  hapticFeedback = true
}) => {
  const [value, setValue] = useState(defaultValue);
  const [angle, setAngle] = useState(((defaultValue - min) / (max - min)) * 270 - 135);
  const isDragging = useRef(false);
  const lastY = useRef(0);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaY = lastY.current - e.clientY;
    lastY.current = e.clientY;

    const angleDelta = deltaY * 1.5;
    setAngle((prev) => {
      const next = Math.min(135, Math.max(-135, prev + angleDelta));
      const normalized = (next + 135) / 270;
      const nextVal = Math.round((min + normalized * (max - min)) / step) * step;
      if (nextVal !== value) {
        setValue(nextVal);
        onChange?.(nextVal);
      }
      return next;
    });
  }, [min, max, step, value, onChange]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center select-none cursor-ns-resize"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <div
        className="w-16 h-16 rounded-full border-2 border-neutral-700 bg-neutral-900 shadow-inner flex items-center justify-center transition-transform duration-75"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <div className="w-1.5 h-4 bg-emerald-400 rounded-full -translate-y-4" />
      </div>
      <span className="mt-2 text-xs font-mono text-neutral-400">{value}</span>
    </div>
  );
};

"use client";

import React, { useId, useRef, useState } from "react";
import { soundEngine } from "@/utils/soundEngine";
import { cn } from "@/lib/utils";

interface RotaryDialProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  color?: string;
  onChange: (val: number) => void;
  className?: string;
}

export function RotaryDial({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  color = "#FF4F00",
  onChange,
  className,
}: RotaryDialProps) {
  const inputId = useId();
  const dialRef = useRef<HTMLDivElement>(null);
  const activePointer = useRef<number | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const fraction = Math.min(1, Math.max(0, (value - min) / Math.max(1, max - min)));
  const currentAngle = -135 + fraction * 270;

  const updateValue = (nextValue: number) => {
    const clampedValue = Math.min(max, Math.max(min, nextValue));
    if (clampedValue !== value) {
      soundEngine.playRotaryTick(Math.round(clampedValue));
      onChange(clampedValue);
    }
  };

  const updateFromPointer = (event: React.PointerEvent<HTMLInputElement>) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    let degrees = Math.atan2(y, x) * 180 / Math.PI + 90;
    if (degrees > 180) degrees -= 360;
    const angle = Math.min(135, Math.max(-135, degrees));
    const rawValue = min + ((angle + 135) / 270) * (max - min);
    const steppedValue = min + Math.round((rawValue - min) / step) * step;
    updateValue(Number(steppedValue.toFixed(6)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLInputElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointer.current = event.pointerId;
    setIsInteracting(true);
    updateFromPointer(event);
  };

  const finishInteraction = (event: React.PointerEvent<HTMLInputElement>) => {
    if (activePointer.current !== event.pointerId) return;
    activePointer.current = null;
    setIsInteracting(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className={cn("flex select-none flex-col items-center", className)}>
      <div ref={dialRef} className="group relative flex h-12 w-12 items-center justify-center">
        <svg viewBox="0 0 64 64" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
          {Array.from({ length: 15 }, (_, index) => {
            const tickAngle = -135 + index / 14 * 270;
            const radians = (tickAngle - 90) * Math.PI / 180;
            return <line key={index} x1={32 + 28 * Math.cos(radians)} y1={32 + 28 * Math.sin(radians)} x2={32 + 31 * Math.cos(radians)} y2={32 + 31 * Math.sin(radians)} stroke={tickAngle <= currentAngle ? color : "#DDE1E7"} strokeWidth={index % 3 === 0 ? 1.5 : 1} />;
          })}
        </svg>
        <div
          style={{ transform: `rotate(${currentAngle}deg)` }}
          className={cn("relative flex h-9 w-9 items-center justify-center rounded-full border-2 border-hairline-strong bg-white shadow-tactile transition-[border-color,box-shadow] group-hover:border-signal-orange group-focus-within:ring-2 group-focus-within:ring-signal-orange group-focus-within:ring-offset-4", isInteracting && "border-signal-orange shadow-none")}
          aria-hidden="true"
        >
          <span style={{ backgroundColor: color }} className="absolute top-1 h-1.5 w-1 rounded-full" />
          <span className="h-3 w-3 rounded-full border border-hairline bg-canvas" />
        </div>
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-valuetext={`${value}${unit ? ` ${unit}` : ""}`}
          aria-describedby={`${inputId}-help`}
          onChange={event => updateValue(event.currentTarget.valueAsNumber)}
          onPointerDown={handlePointerDown}
          onPointerMove={event => { if (activePointer.current === event.pointerId) updateFromPointer(event); }}
          onPointerUp={finishInteraction}
          onPointerCancel={finishInteraction}
          onLostPointerCapture={() => { activePointer.current = null; setIsInteracting(false); }}
          className="absolute inset-0 m-0 h-full w-full cursor-ns-resize touch-none opacity-0"
        />
      </div>
      <div className="mt-1 text-center font-mono">
        <label htmlFor={inputId} className="block text-[10px] uppercase leading-3 tracking-wider text-ink-secondary">{label}</label>
        <output htmlFor={inputId} className="block text-xs font-semibold leading-4 tabular-nums text-ink-primary">{value}{unit && <span className="ml-0.5 font-normal text-ink-secondary">{unit}</span>}</output>
      </div>
      <span id={`${inputId}-help`} className="sr-only">Drag the dial to adjust. Use arrow keys for precise changes, or Home and End for the minimum and maximum.</span>
    </div>
  );
}

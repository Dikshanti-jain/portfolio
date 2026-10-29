"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CrosshairProps {
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * Crosshair (+) junction marker
 * Placed at the intersections of exposed 1px hairline grid modules.
 */
export function Crosshair({ className, position = "top-left" }: CrosshairProps) {
  const positionClasses = {
    "top-left": "-top-[5px] -left-[5px]",
    "top-right": "-top-[5px] -right-[5px]",
    "bottom-left": "-bottom-[5px] -left-[5px]",
    "bottom-right": "-bottom-[5px] -right-[5px]",
  };

  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute select-none font-mono text-[10px] text-ink-tertiary leading-none pointer-events-none z-10 transition-colors duration-150",
        positionClasses[position],
        className
      )}
    >
      +
    </span>
  );
}

/**
 * HairlineBox
 * Structural 1px hairline border container with 4 corner crosshairs.
 */
export function HairlineBox({
  children,
  className,
  as: Component = "div",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative border border-hairline bg-surface transition-all duration-150",
        className
      )}
      {...props}
    >
      <Crosshair position="top-left" />
      <Crosshair position="top-right" />
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />
      {children}
    </Component>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "status-emerald" | "blueprint" | "signal" | "subtle";
  className?: string;
  pulse?: boolean;
}

export function Badge({
  children,
  variant = "default",
  className,
  pulse = false,
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] font-mono text-[11px] font-medium uppercase tracking-wider select-none";

  const variantStyles = {
    default: "bg-surface border border-hairline text-ink-primary shadow-tactile",
    "status-emerald":
      "bg-surface border border-hairline text-ink-primary shadow-tactile",
    blueprint:
      "bg-blueprint-subtle border border-blueprint-blue text-blueprint-blue",
    signal:
      "bg-signal-orange/10 border border-signal-orange text-signal-orange",
    subtle:
      "bg-surface-recessed text-ink-secondary border border-hairline/60",
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], className)}>
      {variant === "status-emerald" && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-emerald opacity-75" />
          )}
          <span className="relative inline-flex rounded-full h-2 w-2 bg-status-emerald" />
        </span>
      )}
      {children}
    </span>
  );
}

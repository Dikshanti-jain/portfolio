"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { TRANSITIONS } from "@/lib/transitions";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "blueprint";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      icon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center gap-2 font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-orange focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[6px]";

    const sizeStyles = {
      sm: "min-h-[36px] px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase",
      md: "min-h-[44px] px-5 py-2.5 text-sm tracking-tight",
      lg: "min-h-[50px] px-6 py-3 text-base tracking-tight",
    };

    const variantStyles = {
      primary:
        "bg-signal-orange text-ink-primary shadow-tactile hover:bg-signal-orange-hover border border-black/10 active:shadow-none",
      secondary:
        "bg-surface text-ink-primary border border-hairline shadow-tactile hover:border-ink-primary hover:bg-canvas active:shadow-none",
      outline:
        "bg-transparent text-ink-primary border border-hairline hover:bg-surface hover:border-ink-primary",
      ghost:
        "bg-transparent text-ink-secondary hover:text-ink-primary hover:bg-surface-recessed",
      blueprint:
        "bg-blueprint-blue text-white shadow-tactile hover:bg-blue-700 border border-blue-900 active:shadow-none",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={TRANSITIONS.tactileSpring}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled}
        {...props}
      >
        {icon && <span className="shrink-0 flex items-center">{icon}</span>}
        <span>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

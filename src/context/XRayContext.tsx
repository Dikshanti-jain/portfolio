"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface XRayContextType {
  isXRayActive: boolean;
  toggleXRay: () => void;
  setXRay: (active: boolean) => void;
}

export const XRayContext = createContext<XRayContextType>({
  isXRayActive: false,
  toggleXRay: () => {},
  setXRay: () => {},
});

export function useXRayMode() {
  const context = useContext(XRayContext);
  if (!context) {
    throw new Error("useXRayMode must be used within an XRayProvider");
  }
  return context;
}

interface XRayProviderProps {
  children: ReactNode;
}

export function XRayProvider({ children }: XRayProviderProps) {
  const [isXRayActive, setIsXRayActive] = useState<boolean>(false);
  const [isMouseInWindow, setIsMouseInWindow] = useState<boolean>(false);

  // 60FPS GPU Motion Values (Eliminates full React component re-rendering on mousemove)
  const cursorX = useMotionValue<number>(-100);
  const cursorY = useMotionValue<number>(-100);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem("ashmit_xray_mode");
      if (stored === "true") {
        setIsXRayActive(true);
        document.documentElement.classList.add("xray-active");
      }
    } catch {
      // Ignore
    }
  }, []);

  const setXRay = (active: boolean) => {
    setIsXRayActive(active);
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("ashmit_xray_mode", active ? "true" : "false");
    } catch {
      // Ignore
    }
    if (active) {
      document.documentElement.classList.add("xray-active");
    } else {
      document.documentElement.classList.remove("xray-active");
    }
  };

  const toggleXRay = React.useCallback(() => {
    setIsXRayActive((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("ashmit_xray_mode", next ? "true" : "false");
        } catch {
          // Ignore
        }
        if (next) {
          document.documentElement.classList.add("xray-active");
        } else {
          document.documentElement.classList.remove("xray-active");
        }
      }
      return next;
    });
  }, []);

  // 60FPS Cursor Telemetry tracking via useMotionValue (Zero state re-renders)
  useEffect(() => {
    if (typeof window === "undefined" || !isXRayActive) return;

    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isMouseInWindow) setIsMouseInWindow(true);
      });
    };

    const handleMouseLeave = () => {
      setIsMouseInWindow(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isXRayActive, isMouseInWindow, cursorX, cursorY]);

  return (
    <XRayContext.Provider value={{ isXRayActive, toggleXRay, setXRay }}>
      {children}

      {/* CAD Laser Telemetry Crosshairs overlay across full screen */}
      {isXRayActive && isMouseInWindow && (
        <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden select-none">
          {/* Vertical Laser Guideline (Driven via GPU transform) */}
          <motion.div
            style={{ x: cursorX }}
            className="absolute top-0 bottom-0 left-0 w-px border-l border-dashed border-blueprint-blue/30 will-change-transform"
          />

          {/* Horizontal Laser Guideline (Driven via GPU transform) */}
          <motion.div
            style={{ y: cursorY }}
            className="absolute top-0 left-0 right-0 h-px border-t border-dashed border-blueprint-blue/30 will-change-transform"
          />

          {/* Floating Coordinate HUD Badge */}
          <motion.div
            style={{
              x: cursorX,
              y: cursorY,
            }}
            className="absolute top-0 left-0 ml-3.5 mt-3.5 flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] bg-[#0047FF] text-white font-mono text-[9px] tracking-wider shadow-sm uppercase whitespace-nowrap will-change-transform"
          >
            <span className="w-1 h-1 rounded-full bg-white animate-ping" />
            <span>CAD LASER ACTIVE</span>
            <span>{"//"}</span>
            <span>60 FPS</span>
          </motion.div>
        </div>
      )}
    </XRayContext.Provider>
  );
}

interface XRayAnnotationProps {
  children: ReactNode;
  token?: string;
  spec?: string;
  fittsTarget?: string;
  className?: string;
  badgePlacement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

/**
 * XRayAnnotation — CAD Architectural Blueprint Wrapper
 * Renders a crisp 1px dashed Cobalt Blue (#0047FF) outline and tiny non-colliding
 * micro-pills docked on the border.
 */
export function XRayAnnotation({
  children,
  token,
  spec,
  fittsTarget,
  className,
  badgePlacement = "top-right",
}: XRayAnnotationProps) {
  const { isXRayActive } = useXRayMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (isXRayActive && containerRef.current && typeof window !== "undefined") {
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      });
    }
  }, [isXRayActive]);

  const placementClasses = {
    "top-left": "-top-2.5 left-1",
    "top-right": "-top-2.5 right-1",
    "bottom-left": "-bottom-2.5 left-1",
    "bottom-right": "-bottom-2.5 right-1",
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative transition-all duration-150",
        isXRayActive &&
          "outline-1 outline-dashed outline-blueprint-blue/50 bg-blueprint-blue/[0.02] rounded-[inherit]",
        className
      )}
    >
      {/* Non-Colliding Micro-Pill Tag */}
      {isXRayActive && (token || spec || fittsTarget) && (
        <div
          className={cn(
            "absolute z-30 pointer-events-none select-none flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider bg-blueprint-blue text-white px-1.5 py-0.5 rounded-[2px] shadow-sm whitespace-nowrap leading-none",
            placementClasses[badgePlacement]
          )}
        >
          {token && <span className="font-bold">{token}</span>}
          {fittsTarget && (
            <span className="bg-white/20 px-1 py-0.2 rounded-[1px] text-[7.5px]">
              FITTS: {fittsTarget}
            </span>
          )}
          {spec && (
            <span className="hidden sm:inline text-white/80 font-normal">
              [{spec}]
            </span>
          )}
          {dimensions.height > 0 && (
            <span className="hidden md:inline bg-white text-blueprint-blue font-bold px-1 rounded-[1px] text-[7.5px]">
              H:{dimensions.height}px
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

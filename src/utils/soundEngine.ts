"use client";

/**
 * Web Audio API Mechanical Sound Engine (Production Hardened)
 * Synthesizes pure tactile clicks, rotary dial ticks, and hardware switch snaps.
 * Zero external asset dependencies.
 * 
 * Hardening Guarantees:
 * - Lazy-initialized global AudioContext singleton (never instantiates multiple contexts)
 * - Automatic oscillator & gain node disconnection on 'ended' to prevent memory leaks
 * - Safe SSR guard (typeof window !== "undefined")
 * - Graceful handling of browser auto-play audio policy
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public isEnabled: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx();
        } catch {
          return null;
        }
      }
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Tactile Button Press Click (Teenage Engineering hardware button feel)
   */
  public playClick(pitch: number = 850, duration: number = 0.02) {
    if (!this.isEnabled || typeof window === "undefined") return;

    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state === "closed") return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Memory leak guard: Clean up audio nodes immediately upon completion
      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // Ignore
        }
      };

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio policy safe fallback
    }
  }

  /**
   * Mechanical Rotary Dial Tick (Precision notched encoder tick)
   */
  public playRotaryTick(index: number = 0) {
    if (!this.isEnabled || typeof window === "undefined") return;

    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state === "closed") return;

      const basePitch = 1200 + (index % 12) * 40;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(basePitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.012);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // Ignore
        }
      };

      osc.start();
      osc.stop(ctx.currentTime + 0.012);
    } catch {
      // Audio safe fallback
    }
  }

  /**
   * Hardware Toggle Snap (Heavy relay switch sound)
   */
  public playSnap(isOn: boolean = true) {
    if (!this.isEnabled || typeof window === "undefined") return;

    try {
      const ctx = this.getContext();
      if (!ctx || ctx.state === "closed") return;

      const pitch = isOn ? 1400 : 900;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.onended = () => {
        try {
          osc.disconnect();
          gain.disconnect();
        } catch {
          // Ignore
        }
      };

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio safe fallback
    }
  }
}

export const soundEngine = new SoundEngine();

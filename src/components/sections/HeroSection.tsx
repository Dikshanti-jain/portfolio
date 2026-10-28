"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, Copy, FileText, Layers, SlidersHorizontal, Volume2, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { CANDIDATE_PROFILE } from "@/data/portfolioData";
import { XRayAnnotation } from "@/context/XRayContext";
import { Crosshair } from "@/components/ui/Crosshair";
import { ExplodedLayerStack } from "@/components/ui/ExplodedLayerStack";
import { RotaryDial } from "@/components/ui/RotaryDial";
import { soundEngine } from "@/utils/soundEngine";
import { TRANSITIONS } from "@/lib/transitions";

const MODES = [
  { id: "spatial", label: "01 / Spatial" },
  { id: "tokens", label: "02 / Tokens" },
  { id: "heuristics", label: "03 / Usability" },
] as const;
type Mode = (typeof MODES)[number]["id"];

const PRINCIPLES = [
  { title: "A clear next step", label: "01 / Hierarchy", description: "One primary action. Supporting actions stay quieter, so the next step is easy to find." },
  { title: "Comfortable to use", label: "02 / Interaction", description: "Generous targets, visible keyboard focus, and feedback that confirms what just happened." },
  { title: "Motion with purpose", label: "03 / Continuity", description: "Movement explains a change of state. Reduced-motion preferences keep the experience calm." },
] as const;

export function HeroSection({ onOpenResume }: { onOpenResume?: () => void }) {
  const [activeTab, setActiveTab] = useState<Mode>("spatial");
  const [stiffness, setStiffness] = useState(380);
  const [damping, setDamping] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [tokenRadius, setTokenRadius] = useState("8px");
  const [tokenColor, setTokenColor] = useState("#FF4F00");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = async () => {
    soundEngine.playClick(1050);
    try {
      await navigator.clipboard.writeText(CANDIDATE_PROFILE.socials.email);
      setCopied(true);
      toast.success("Email copied", { description: CANDIDATE_PROFILE.socials.email });
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn’t copy email", { description: CANDIDATE_PROFILE.socials.email });
    }
  };

  return (
    <section id="about" aria-labelledby="hero-heading" className="relative border-b border-hairline bg-canvas">
      <Crosshair position="bottom-left" />
      <Crosshair position="bottom-right" />
      <div className="grid lg:grid-cols-12">
        <div className="relative flex flex-col justify-center border-b border-hairline px-6 py-10 sm:px-10 sm:py-12 lg:col-span-7 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
          <motion.div initial={{ opacity: 0.7, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={TRANSITIONS.surfaceSheet}>
            <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-ink-secondary">
              <span className="h-2 w-2 bg-signal-orange" aria-hidden="true" />
              <span>Independent designer &amp; builder</span>
              <span className="text-ink-tertiary">Jaipur, India</span>
            </div>
            <XRayAnnotation token="TYPO:EDITORIAL" spec="Editorial hierarchy / readable measure" badgePlacement="top-left">
              <h1 id="hero-heading" className="max-w-[660px] font-sans text-[clamp(2.5rem,4.4vw,4rem)] font-semibold leading-[1.06] tracking-[-0.055em] text-ink-primary">
                {CANDIDATE_PROFILE.heroHeadline.lead}
                <span className="mt-2 block font-serif text-[1.13em] font-normal italic tracking-[-0.035em] text-signal-orange-ink">{CANDIDATE_PROFILE.heroHeadline.craftItalic}</span>
                <span className="block">{CANDIDATE_PROFILE.heroHeadline.codeLead} {CANDIDATE_PROFILE.heroHeadline.codeItalic}</span>
              </h1>
            </XRayAnnotation>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-[1.8] text-ink-secondary">{CANDIDATE_PROFILE.heroBio}</p>
            <XRayAnnotation token="CTRL:PRIMARY_ACTION" spec="Primary first / 48px targets" className="mt-8" badgePlacement="bottom-left">
              <div className="flex flex-wrap items-center gap-3">
                <motion.a href="#case-studies" whileTap={{ scale: 0.97 }} transition={TRANSITIONS.tactileSpring} className="inline-flex min-h-12 items-center gap-4 rounded-md border border-ink-primary bg-ink-primary px-5 text-sm font-semibold text-white hover:bg-[#303438]">
                  Explore work <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </motion.a>
                <motion.button onClick={onOpenResume} whileTap={{ scale: 0.97 }} className="inline-flex min-h-12 items-center gap-2 rounded-md border border-hairline bg-surface px-4 text-sm font-medium transition-colors hover:border-ink-primary">
                  <FileText className="h-4 w-4 text-ink-secondary" aria-hidden="true" /> Résumé <kbd className="hidden sm:block keycap">R</kbd>
                </motion.button>
                <button onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"} className="flex min-h-12 min-w-12 items-center justify-center gap-2 rounded-md px-3 text-sm text-ink-secondary hover:bg-surface">
                  {copied ? <Check className="h-4 w-4 text-status-emerald" /> : <Copy className="h-4 w-4" />}<span className="sr-only">{copied ? "Copied" : "Copy email"}</span>
                </button>
              </div>
            </XRayAnnotation>
            <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-ink-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-status-emerald" aria-hidden="true" />
              Available for internships <span className="mx-1 text-hairline" aria-hidden="true">/</span> Remote &amp; relocation
            </div>
          </motion.div>
        </div>
        <div className="relative min-w-0 bg-[#EEF0F3] p-5 sm:p-6 lg:col-span-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider"><SlidersHorizontal className="h-3.5 w-3.5 text-signal-orange" /> The interaction lab</div>
            <button aria-label={soundEnabled ? "Mute interaction sounds" : "Enable interaction sounds"} aria-pressed={soundEnabled} onClick={() => { const next = !soundEnabled; setSoundEnabled(next); soundEngine.isEnabled = next; if (next) soundEngine.playClick(1000); }} className="-my-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded text-ink-secondary hover:bg-white" title={soundEnabled ? "Sound on" : "Sound off"}>
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
          </div>
          <div role="group" aria-label="Interaction lab mode" className="mb-4 grid grid-cols-3 gap-1 rounded-md border border-hairline bg-surface p-1">
            {MODES.map(mode => <button key={mode.id} aria-pressed={activeTab === mode.id} aria-controls="lab-panel" onClick={() => { setActiveTab(mode.id); soundEngine.playSnap(true); }} className={`relative min-h-10 rounded px-1 font-mono text-[10px] transition-colors ${activeTab === mode.id ? "bg-ink-primary font-semibold text-white" : "text-ink-secondary hover:bg-canvas"}`}>{mode.label}</button>)}
          </div>
          <div id="lab-panel" className="min-h-[400px]" aria-label={`${MODES.find(mode => mode.id === activeTab)?.label} demo`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeTab} initial={{ opacity: 0.5, y: reduceMotion ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0.5 }} transition={{ duration: reduceMotion ? 0 : 0.15 }}>
                {activeTab === "spatial" && <>
                  <ExplodedLayerStack stiffness={stiffness} damping={damping} />
                  <div className="mt-3 flex items-center justify-around rounded-md border border-hairline bg-surface px-3 py-2">
                    <RotaryDial label="Spring stiffness" value={stiffness} min={100} max={600} step={10} color="#FF4F00" onChange={setStiffness} />
                    <div className="h-12 w-px bg-hairline" />
                    <RotaryDial label="Damping" value={damping} min={10} max={50} step={2} color="#0047FF" onChange={setDamping} />
                  </div>
                </>}
                {activeTab === "tokens" && <div className="flex min-h-[400px] flex-col justify-between rounded-lg border border-hairline bg-surface p-5 sm:p-6">
                  <div><p className="eyebrow">One source of truth</p><h2 className="mt-2 text-xl font-semibold tracking-tight">Small tokens. System-wide change.</h2><p className="mt-2 text-sm leading-relaxed text-ink-secondary">Adjust a variable and watch the component respond.</p></div>
                  <motion.div animate={{ borderRadius: tokenRadius, borderColor: tokenColor }} transition={TRANSITIONS.tactileSpring} className="my-6 flex items-center justify-between gap-3 border-2 bg-canvas p-5"><div><p className="text-sm font-semibold">A considered component</p><p className="mt-1 font-mono text-[10px] text-ink-secondary">radius: {tokenRadius}</p></div><ArrowUpRight className="h-5 w-5" style={{ color: tokenColor }} /></motion.div>
                  <div className="space-y-3 border-t border-hairline pt-4">
                    <div className="flex flex-wrap items-center justify-between gap-2"><span className="eyebrow">Corner radius</span><div className="flex gap-1">{["0px", "8px", "16px"].map(radius => <button key={radius} aria-pressed={tokenRadius === radius} onClick={() => setTokenRadius(radius)} className={`min-h-11 min-w-11 rounded border px-2 font-mono text-xs ${tokenRadius === radius ? "border-ink-primary bg-ink-primary text-white" : "border-hairline"}`}>{radius}</button>)}</div></div>
                    <div className="flex items-center justify-between gap-2"><span className="eyebrow">Accent color</span><div className="flex gap-1">{[{ hex: "#FF4F00", label: "Signal orange" }, { hex: "#0047FF", label: "Blueprint blue" }, { hex: "#107C41", label: "Emerald" }].map(color => <button key={color.hex} aria-label={color.label} aria-pressed={tokenColor === color.hex} onClick={() => setTokenColor(color.hex)} className={`flex h-11 w-11 items-center justify-center rounded border ${tokenColor === color.hex ? "border-ink-primary" : "border-transparent"}`}><span className="h-5 w-5 rounded-full" style={{ background: color.hex }} /></button>)}</div></div>
                  </div>
                </div>}
                {activeTab === "heuristics" && <div className="min-h-[400px] rounded-lg border border-hairline bg-surface p-5 sm:p-6"><p className="eyebrow">Less friction, more clarity</p><h2 className="mt-2 text-xl font-semibold tracking-tight">Details that make a difference.</h2><div className="mt-4 divide-y divide-hairline">{PRINCIPLES.map(principle => <div key={principle.label} className="py-4"><p className="font-mono text-[10px] uppercase tracking-wider text-signal-orange-ink">{principle.label}</p><h3 className="mt-1 text-sm font-semibold">{principle.title}</h3><p className="mt-1 text-xs leading-relaxed text-ink-secondary">{principle.description}</p></div>)}</div></div>}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-3 font-mono text-[10px] text-ink-secondary">
            <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-status-emerald" /> Interactive by design</span>
            <code>{activeTab === "spatial" ? `spring: ${stiffness} / ${damping}` : activeTab === "tokens" ? `${tokenRadius} / ${tokenColor}` : "clarity → confidence"}</code>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 border-t border-hairline bg-surface sm:grid-cols-3">
        {[
          { label: "01 / Design", title: "Systems before screens", detail: "Figma variables · Component architecture", icon: Layers },
          { label: "02 / Build", title: "From canvas to code", detail: "React · TypeScript · Tactile motion", icon: SlidersHorizontal },
          { label: "03 / Refine", title: "Care in the last mile", detail: "Accessibility · Edge cases · Interaction", icon: Check },
        ].map((item, index) => <div key={item.label} className={`flex gap-4 px-6 py-6 sm:px-8 ${index < 2 ? "border-b border-hairline sm:border-b-0 sm:border-r" : ""}`}><item.icon className="mt-1 h-4 w-4 shrink-0 text-signal-orange-ink" aria-hidden="true" /><div><p className="eyebrow">{item.label}</p><p className="mt-1 text-sm font-semibold tracking-tight">{item.title}</p><p className="mt-1 text-xs leading-relaxed text-ink-secondary">{item.detail}</p></div></div>)}
      </div>
    </section>
  );
}

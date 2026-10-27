"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { Drawer } from "vaul";
import { Search, Sparkles, Layers, Copy, FileText, Github, Linkedin, X, Compass, Cpu, CornerDownLeft } from "lucide-react";
import { toast } from "sonner";
import { CaseStudy } from "@/types/portfolio";
import { CASE_STUDIES, CANDIDATE_PROFILE } from "@/data/portfolioData";
import { soundEngine } from "@/utils/soundEngine";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleXRay: () => void;
  onOpenProject: (project: CaseStudy) => void;
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Case Study" | "Tool" | "External";
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void | Promise<void>;
}

export function CommandPalette({ isOpen, onClose, onToggleXRay, onOpenProject, onOpenResume }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLUListElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const listId = useId();

  const openFromPalette = (open: () => void) => {
    onClose();
    // Give the departing dialog time to release its focus trap before the
    // destination captures its opener for keyboard focus restoration.
    requestAnimationFrame(() => {
      returnFocusRef.current?.focus({ preventScroll: true });
      open();
    });
  };

  const openProject = (id: string) => {
    const project = CASE_STUDIES.find((item) => item.id === id);
    if (project) openFromPalette(() => onOpenProject(project));
  };

  const commands: CommandItem[] = [
    {
      id: "resume", title: "Open resume & credentials", category: "Navigation", shortcut: "R",
      icon: <FileText className="h-4 w-4 text-signal-orange" />,
      action: () => openFromPalette(onOpenResume),
    },
    {
      id: "devmate", title: "DevMate Mentors", category: "Case Study", shortcut: "1",
      icon: <Layers className="h-4 w-4 text-signal-orange" />,
      action: () => openProject("devmate-mentors"),
    },
    {
      id: "floodwatch", title: "FloodWatch AI & EQUINOX", category: "Case Study", shortcut: "2",
      icon: <Compass className="h-4 w-4 text-blueprint-blue" />,
      action: () => openProject("floodwatch-ai"),
    },
    {
      id: "ultron", title: "Ultron Agent UX", category: "Case Study", shortcut: "3",
      icon: <Cpu className="h-4 w-4 text-status-emerald" />,
      action: () => openProject("ultron-agent-ux"),
    },
    {
      id: "xray", title: "Toggle UX X-Ray mode", category: "Tool", shortcut: "X",
      icon: <Sparkles className="h-4 w-4 text-blueprint-blue" />,
      action: () => { onToggleXRay(); onClose(); },
    },
    {
      id: "copy-email", title: "Copy contact email", category: "Tool", shortcut: "C",
      icon: <Copy className="h-4 w-4" />,
      action: async () => {
        try {
          await navigator.clipboard.writeText(CANDIDATE_PROFILE.socials.email);
          toast.success(`Copied: ${CANDIDATE_PROFILE.socials.email}`);
          onClose();
        } catch {
          toast.error("Could not copy email. Please use the email link in the contact section.");
        }
      },
    },
    {
      id: "github", title: "Visit GitHub profile", category: "External",
      icon: <Github className="h-4 w-4" />,
      action: () => { window.open(CANDIDATE_PROFILE.socials.github, "_blank", "noopener,noreferrer"); onClose(); },
    },
    {
      id: "linkedin", title: "Visit LinkedIn profile", category: "External",
      icon: <Linkedin className="h-4 w-4 text-blueprint-blue" />,
      action: () => { window.open(CANDIDATE_PROFILE.socials.linkedin, "_blank", "noopener,noreferrer"); onClose(); },
    },
  ];

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = commands.filter((command) => `${command.title} ${command.category}`.toLowerCase().includes(normalizedQuery));
  const selectedCommand = filtered[selectedIndex];

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    resultsRef.current?.querySelector<HTMLElement>(`[data-command-index="${selectedIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, query, isOpen]);

  const runCommand = (command: CommandItem) => {
    soundEngine.playClick(900);
    void command.action();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      soundEngine.playRotaryTick();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setSelectedIndex((current) => (current + direction + filtered.length) % (filtered.length || 1));
    } else if (event.key === "Enter" && selectedCommand) {
      event.preventDefault();
      runCommand(selectedCommand);
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} direction="top" handleOnly autoFocus repositionInputs={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-ink-primary/25 backdrop-blur-sm" />
        <Drawer.Content
          className="fixed inset-x-4 top-4 z-[60] mx-auto flex max-h-[calc(100dvh-2rem)] w-auto max-w-xl flex-col overflow-hidden rounded-[12px] border border-hairline-strong bg-surface font-sans shadow-drawer outline-none sm:top-24 sm:max-h-[calc(100dvh-8rem)]"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            inputRef.current?.focus({ preventScroll: true });
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => {
              if (!document.querySelector('[role="dialog"][data-state="open"]')) returnFocusRef.current?.focus({ preventScroll: true });
            });
          }}
        >
          <Drawer.Title className="sr-only">Quick navigation</Drawer.Title>
          <Drawer.Description className="sr-only">Search projects, view the resume, or find a contact action. Use arrow keys to choose and Enter to open.</Drawer.Description>
          <div className="flex shrink-0 items-center gap-3 border-b border-hairline bg-canvas/60 pl-4 pr-2">
            <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-ink-secondary" />
            <input
              ref={inputRef}
              role="combobox"
              aria-label="Search portfolio commands"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-activedescendant={selectedCommand ? `${listId}-${selectedCommand.id}` : undefined}
              type="text"
              value={query}
              onChange={(event) => { setQuery(event.target.value); setSelectedIndex(0); }}
              maxLength={80}
              onKeyDown={handleKeyDown}
              placeholder="Search projects, resume, contact…"
              className="h-16 min-w-0 flex-1 bg-transparent text-sm text-ink-primary outline-none placeholder:text-ink-secondary"
            />
            <Drawer.Close asChild>
              <button type="button" aria-label="Close command palette" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-ink-secondary transition-colors hover:bg-surface-recessed hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-blue">
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </Drawer.Close>
          </div>

          <div className="flex min-h-0 flex-col">
            <div aria-live="polite" aria-atomic="true" className="px-5 pb-2 pt-4 font-mono text-[10px] uppercase tracking-wider text-ink-secondary">
              {filtered.length} {filtered.length === 1 ? "action" : "actions"} available
            </div>
            <ul ref={resultsRef} id={listId} role="listbox" aria-label="Portfolio commands" className="min-h-0 max-h-80 overflow-y-auto overscroll-contain px-2 pb-2">
              {filtered.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    id={`${listId}-${item.id}`}
                    role="option"
                    aria-selected={isSelected}
                    data-command-index={index}
                    onClick={() => runCommand(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-md border px-3 py-3 transition-colors ${isSelected ? "border-hairline bg-canvas text-ink-primary" : "border-transparent text-ink-secondary hover:bg-canvas"}`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-hairline bg-surface">{item.icon}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{item.title}</span>
                        <span className="mt-0.5 block font-mono text-[10px] text-ink-secondary">{item.category}</span>
                      </span>
                    </div>
                    <span aria-hidden="true" className="flex shrink-0 items-center gap-2">
                      {isSelected && <CornerDownLeft className="h-3.5 w-3.5 text-signal-orange" />}
                      {item.shortcut && <kbd className="hidden min-w-6 rounded border border-hairline bg-surface px-1.5 py-1 text-center font-mono text-[10px] text-ink-secondary sm:inline-block">{item.shortcut}</kbd>}
                    </span>
                  </li>
                );
              })}
            </ul>
            {filtered.length === 0 && <p className="px-6 pb-8 pt-4 text-center text-sm text-ink-secondary">No matching actions. Try “resume” or a project name.</p>}
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-hairline bg-canvas/60 px-5 py-3 font-mono text-[10px] text-ink-secondary">
            <span>↑↓ Navigate <span aria-hidden="true" className="px-1">/</span> ↵ Open</span>
            <span>ESC to close</span>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

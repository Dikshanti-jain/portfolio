/** Single-letter shortcuts must never hijack text entry or focused controls. */
export function isShortcutTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && !!target.closest(
    'input, textarea, select, button, a, [contenteditable="true"], [role="slider"], [role="combobox"], [role="dialog"]'
  );
}

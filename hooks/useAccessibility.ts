"use client";

import { useEffect, useCallback } from "react";

interface ShortcutConfig {
  shortcuts: Record<string, () => void>;
}

export function useKeyboardShortcuts({ shortcuts }: ShortcutConfig) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = [
      e.ctrlKey || e.metaKey ? 'ctrl' : '',
      e.shiftKey ? 'shift' : '',
      e.altKey ? 'alt' : '',
      e.key.toLowerCase(),
    ].filter(Boolean).join('+');

    const handler = shortcuts[key];
    if (handler) {
      e.preventDefault();
      handler();
    }
  }, [shortcuts]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

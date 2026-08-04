import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(containerRef, active) {
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!active) return;

    previouslyFocused.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );

    const focusable = getFocusable();
    (focusable[0] || container).focus();

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
  }, [active, containerRef]);
}
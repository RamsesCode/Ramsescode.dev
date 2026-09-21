"use client";

import { useEffect, type RefObject } from "react";

/** Direction-based navigation visibility without rendering on every scroll event. */
export function useAutoHideHeader(
  headerRef: RefObject<HTMLElement | null>,
  menuOpen: boolean,
) {
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let previousY = Math.max(0, window.scrollY);
    let frame: number | null = null;

    const reveal = () => {
      header.dataset.hidden = "false";
    };

    const update = () => {
      frame = null;
      // Clamp elastic scrolling so reaching either page edge cannot invert direction.
      const maximumY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const currentY = Math.min(maximumY, Math.max(0, window.scrollY));
      const keepVisible =
        menuOpen ||
        currentY <= header.offsetHeight ||
        header.contains(document.activeElement);

      if (keepVisible || currentY < previousY) reveal();
      else if (currentY > previousY) header.dataset.hidden = "true";

      previousY = currentY;
    };

    const handleScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    reveal();
    window.addEventListener("scroll", handleScroll, { passive: true });
    header.addEventListener("focusin", reveal);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      header.removeEventListener("focusin", reveal);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [headerRef, menuOpen]);
}

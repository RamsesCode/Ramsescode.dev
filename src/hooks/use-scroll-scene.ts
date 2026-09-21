"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/animation/gsap";

export interface ScrollSceneContext<T extends HTMLElement> {
  root: T;
  isDesktop: boolean;
}

export type ScrollSceneBuilder<T extends HTMLElement> = (
  context: ScrollSceneContext<T>,
) => void | (() => void);

/** Keep build stable (module-level function or useCallback) to avoid timeline restarts. */
export function useScrollScene<T extends HTMLElement>(
  scope: RefObject<T | null>,
  build: ScrollSceneBuilder<T>,
) {
  useGSAP(
    () => {
      if (!scope.current) return;
      const root = scope.current;
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 960px)",
          mobile: "(max-width: 959px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reducedMotion) return;
          return build({ root, isDesktop: Boolean(context.conditions?.desktop) });
        },
      );
      // Reverts only this scene, including its timelines, triggers, styles, and pins.
      return () => media.revert();
    },
    { scope, dependencies: [build], revertOnUpdate: true },
  );
}

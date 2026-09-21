"use client";

import { gsap } from "./gsap";

interface ScrollTimelineOptions {
  root: HTMLElement;
  start?: string;
  end?: string | (() => string);
  scrub?: boolean | number;
  pin?: boolean | HTMLElement;
}

/** Animate descendants; keep the optionally pinned root free of transforms. */
export function createScrollTimeline({
  root,
  start = "top 75%",
  end = "bottom 45%",
  scrub = 0.5,
  pin = false,
}: ScrollTimelineOptions) {
  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: root, start, end, scrub, pin, invalidateOnRefresh: true },
  });
}

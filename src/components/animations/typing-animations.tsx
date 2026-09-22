"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/animation/gsap";
import { createScrollTimeline } from "@/lib/animation/scroll-timeline";
import { createTypingTrack, type TypingTrack } from "@/lib/animation/typing";

/** One scoped controller; the text and section components remain server rendered. */
export function TypingAnimations({ scopeId }: { scopeId: string }) {
  useGSAP(
    () => {
      const root = document.getElementById(scopeId);
      if (!root) return;
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const tracks: TypingTrack[] = [];
        const timelines: gsap.core.Timeline[] = [];

        for (const group of root.querySelectorAll<HTMLElement>("[data-typing-group]")) {
          const elements = Array.from(
            group.querySelectorAll<HTMLElement>("[data-typing-text]"),
          ).filter((element) => element.closest("[data-typing-group]") === group);
          if (!elements.length) continue;

          const hero = group.dataset.typingGroup === "hero";
          const timeline = hero
            ? gsap.timeline()
            : createScrollTimeline({
                root: group,
                start: "top 90%",
                end: () => `+=${Math.min(160, window.innerHeight * 0.18)}`,
                scrub: 0.15,
              });
          timelines.push(timeline);

          elements.forEach((element, index) => {
            const track = createTypingTrack(element);
            tracks.push(track);
            timeline.fromTo(
              track.state,
              { count: 0 },
              {
                count: track.length,
                duration: hero ? 1.7 : Math.min(1, Math.max(0.55, track.length / 70)),
                ease: "none",
                onUpdate: () => track.render(),
              },
              hero ? 0 : Math.min(index * 0.05, 0.15),
            );
          });
        }

        const measure = () => tracks.forEach((track) => track.measure());
        ScrollTrigger.addEventListener("refreshInit", measure);
        ScrollTrigger.refresh();

        return () => {
          ScrollTrigger.removeEventListener("refreshInit", measure);
          for (const timeline of timelines) {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          }
          // Direct mask writes need their own cleanup in addition to GSAP's context.
          tracks.forEach((track) => track.restore());
        };
      });

      return () => media.revert();
    },
    { dependencies: [scopeId], revertOnUpdate: true },
  );

  return null;
}

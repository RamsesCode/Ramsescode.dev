"use client";

import { useRef } from "react";
import { CornerDownRight } from "lucide-react";
import { useScrollScene, type ScrollSceneBuilder } from "@/hooks/use-scroll-scene";
import { gsap } from "@/lib/animation/gsap";
import { createScrollTimeline } from "@/lib/animation/scroll-timeline";

const buildScene: ScrollSceneBuilder<HTMLElement> = ({ root, isDesktop }) => {
  const code = root.querySelector<HTMLElement>("[data-scene-code]");
  const copy = root.querySelector<HTMLElement>("[data-scene-copy]");
  const progress = root.querySelector<HTMLElement>("[data-scene-progress]");
  if (!code || !copy || !progress) return;

  // Base HTML remains readable with reduced motion or without JavaScript.
  gsap.set(code, { autoAlpha: 0, y: 14 });
  gsap.set(copy, { opacity: 0, y: 14 });
  gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
  const timeline = createScrollTimeline({
    root,
    start: "top 80%",
    end: isDesktop ? "bottom 48%" : "bottom 55%",
  });
  timeline
    .to(code, { autoAlpha: 1, y: 0, duration: 0.2 })
    .to(code, { autoAlpha: 0, y: -12, duration: 0.25 }, 0.45)
    .to(copy, { opacity: 1, y: 0, duration: 0.3 }, 0.6)
    .to(progress, { scaleX: 1, duration: 1 }, 0);
};

export function CodeToCopyScene() {
  const root = useRef<HTMLElement>(null);
  useScrollScene(root, buildScene);

  return (
    <section
      ref={root}
      id="build-scene"
      className="code-scene"
      aria-labelledby="scene-heading"
    >
      <div className="container scene-inner">
        <div className="scene-meta">
          <span className="eyebrow">
            <CornerDownRight size={15} aria-hidden="true" /> From an idea to an interface
          </span>
          <span className="scene-file" aria-hidden="true">
            intent.ts
          </span>
        </div>
        <div className="scene-stage">
          <code data-scene-code className="scene-code" aria-hidden="true">
            <span>build</span>({"{ "}for: <span className="code-string">"people"</span>
            {" }"});
          </code>
          <h2 id="scene-heading" data-scene-copy className="scene-copy">
            I build software
            <br className="mobile-break" /> <span>people can actually use.</span>
          </h2>
        </div>
        <div className="scene-bottom">
          <span className="mono-label">Good code. Real purpose.</span>
          <span className="scene-progress" aria-hidden="true">
            <span data-scene-progress />
          </span>
          <span className="mono-label" aria-hidden="true">
            01 — 02
          </span>
        </div>
      </div>
    </section>
  );
}

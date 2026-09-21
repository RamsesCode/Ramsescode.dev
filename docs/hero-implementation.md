# Coding hero implementation

The current hero follows the provided coding-workspace reference. The original image was used to create a separate clean background plate; all website UI is rendered in React/HTML above it. The rest of the portfolio remains the foundation from the first pass.

## Created files

- `src/components/hero/hero-overlay.tsx` — exact requested copy, comments, and composition.
- `src/components/hero/hero-code-panel.tsx` — editable JavaScript profile, six line numbers, CSS syntax colors.
- `src/components/hero/hero-meta.tsx` — LinkedIn/GitHub icons and New York location.
- `src/components/hero/scroll-indicator.tsx` — static mouse/line indicator and projects link.
- `src/components/hero/hero.module.css` — full-viewport composition and responsive hero styling.
- `src/components/navigation/navigation.module.css` — wordmark, navigation, resume pill, menu, visibility transition.
- `src/hooks/use-auto-hide-header.ts` — passive scroll/rAF direction handling with cleanup.
- `public/images/backgrounds/coding-workspace.webp` — 1672 × 941 optimized background; 89,486 bytes.
- `docs/hero-implementation.md` — these notes and the background prompt.

## Modified files

- `src/components/hero/hero.tsx` — media/overlay composition.
- `src/components/hero/hero-media.tsx` — optimized photographic plate and independent gradients.
- `src/components/navigation/site-header.tsx` — exact wordmark, labels, and visibility hook.
- `src/components/navigation/mobile-navigation.tsx` — shared menu state and the same five labels.
- `src/components/navigation/resume-link.tsx` — lowercase resume() treatment; existing PDF placeholder behavior.
- `src/app/page.tsx` — unmount the earlier GSAP proof scene; retain its source for future use.
- `src/styles/globals.css` — remove retired hero/navigation rules now owned by CSS modules.
- `src/styles/tokens.css` — improve the system monospace fallback stack for code and navigation.
- `README.md` — current hero, media, and navigation architecture.

## Navigation behavior

The small client navigation component uses a passive scroll listener and one pending requestAnimationFrame. Moving down beyond the header height marks it hidden; moving up by any amount reveals it. The top of the document, focus within navigation, and an open menu keep it visible. The transform transition is smooth, but disabled for reduced motion. Scroll listeners, focus listeners, and pending animation frames are cleaned up. Mobile closes on Escape, outside pointer interaction, focus leaving, link selection, and switching to the desktop breakpoint.

The hero and its content remain Server Components. Text stays available without JavaScript. The background has reserved layout space; it is preloaded and served using Next.js image optimization. Neither GSAP nor another animation package is needed for this scene.

## Background artwork

Method: **built-in image generation/editing**, using the supplied concept as the edit target. This is an edited photographic plate, not a cropped screenshot of the completed UI. Generated master: `/Users/ramses/.codex/generated_images/01a0b76b-cf03-7152-8691-34f88e9bca30/exec-010f92e7-d455-4dd9-b11a-ddc8ed9cdcee.png`. The project asset is `public/images/backgrounds/coding-workspace.webp`; it does not depend on the master path at runtime. WebP compression uses the already-installed Sharp dependency. No new npm dependencies were added.

Exact final prompt:

```text
Use case: precise-object-edit
Asset type: clean full-bleed photographic background plate for a website hero, landscape 16:9.
Input image: the attached portfolio concept is the EDIT TARGET. Preserve its exact photographic composition, the same person seen from behind at the workstation, hair, glasses, pose, chair, monitors, desk objects, window mullions, New York skyline at night, blue night lighting and warm desk lamp. Do not reimagine or move the person or workstation.
Primary request: remove EVERY website/UI overlay from this image and realistically reconstruct the unobstructed photo behind those elements. Remove the entire top navigation/wordmark/menu bar, the top-left "// ideas // code // build // repeat" comments, the giant RAMSES SANCHEZ name, the FULL STACK SOFTWARE ENGINEER subtitle, the supporting sentence, the outlined floating code box and all its text/line numbers, the SCROLL TO EXPLORE mouse/line, bottom-left comments, bottom-center chevron, and bottom-right social icons/location text/divider. All this website text will be recreated as HTML later, so absolutely none of it should remain.
Keep a clean dark left third for independent HTML overlays; continue the dim window/interior naturally there, no rectangular blank UI panels. Preserve the full original framing and city-night photographic scene edge to edge. The subject stays centered-right at the coding desk. Screens may show subtle non-legible editor code texture as part of the physical scene. Remove readable slogans from the laptop screen, mug, book spines and wall poster as well; leave realistic plain objects and a dark editor screen. No floating text, no graphic UI layers, no logo, no watermarks. Do not crop, add people, change clothes, add scenes, or add gaming/neon decoration. Photorealistic, polished, cinematic but faithful to the supplied image. Output only the background artwork.
```

## Local preview

```bash
npm run dev
```

Open http://localhost:3000. Use `npm run check` for lint, TypeScript, and formatting; `npm run build` for production validation.

## Continuous video background update

The media layer now uses the supplied `public/videos/hero_loop_1.mp4` without modifying the source file. `src/components/hero/hero-video.tsx` adds native muted autoplay, inline playback, and continuous looping. `hero-media.tsx` supplies the existing optimized image as the loading/error/reduced-motion fallback, and `hero.module.css` keeps video/image crops aligned and adds accessible pause/play and sound controls outside the decorative layer. The sound button sits to the right of pause and toggles mute only, preserving playback position and the visitor’s pause state. Audio starts muted and the visitor’s sound choice survives pause/resume and tab changes.

Motion preference is read before attaching the MP4 source, so visitors using reduced motion do not download or autoplay the video. The video reveals only after playback begins. Manual pause keeps the current frame and is respected when returning to the tab. Browser autoplay denial keeps the image and a Play button. Native looping reuses the same loaded video; no timed source reload or artificial stop is inserted between loops.

The visual continuity at the cut depends on the supplied clip’s first and last frames; this implementation replays the actual file without re-editing its content.

# RamsesCode.dev

A personal portfolio foundation for **Ramses Sanchez, Full Stack Software Engineer**. Built with the stable Next.js App Router, React, and strict TypeScript. The current hero recreates the supplied city-night coding concept with a separate optimized background image and editable HTML overlays. The remaining portfolio sections retain the initial dark prototype styling.

## Run locally

Use Node.js **22.13 or newer** (Node 22 LTS recommended) and npm 10 or newer. Dependencies have been installed; on a fresh checkout run `npm ci`.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command                | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Development server with Next.js / Turbopack                   |
| `npm run lint`         | Next.js ESLint checks; warnings fail                          |
| `npm run lint:fix`     | Apply available lint fixes                                    |
| `npm run typecheck`    | Generate Next.js route types, then strict TypeScript checking |
| `npm run format`       | Format source, config, and documentation with Prettier        |
| `npm run format:check` | Check formatting without changing files                       |
| `npm run check`        | Lint, type-check, and formatting checks                       |
| `npm run build`        | Production build                                              |
| `npm start`            | Serve the production build locally                            |

## Architecture

```text
src/
  app/                       # App Router page, root layout, metadata, robots, sitemap
  components/
    navigation/              # Direction-aware fixed header, mobile menu, resume action
    hero/                    # Independent hero media and HTML content layers
    animations/              # Server-rendered typing text and scoped client controllers
    sections/                # Server-rendered homepage composition
    projects/                # Featured projects, cards, concept media
    experience/              # Data-driven experience timeline
    about/                   # Introduction and guiding principles
    skills/                  # Technologies section
    contact/                 # Contact actions; future form integration point
    footer/                  # Footer and build-time current year
    social/                  # GitHub and LinkedIn links/placeholders
    ui/
      typography/            # Consistent section headings
      button-link.tsx        # Shared link/button styling
    layout/                  # Shared content container
  hooks/                     # Typed, scoped useScrollScene hook
  lib/animation/             # GSAP registration, scroll timelines, glyph-mask helper
  data/                      # Site settings, projects, experience, technologies
  types/                     # Shared portfolio data contracts
  styles/                    # Design tokens, layout, responsive and motion rules
public/
  images/
    portraits/               # Future portrait photos
    projects/                # Real project screenshots and artwork
    backgrounds/             # Future supporting backgrounds / OG artwork
  icons/                     # Future icon assets
  videos/                    # Future optimized video files and posters
  sequences/                 # Future frame sequences, one subfolder per scene
  documents/                 # Resume PDF and supporting documents
  media/                     # Other future media assets
```

The page, layout, hero, and content sections are Server Components. The navigation, background video controller, and scoped typing controller use small client boundaries. `TypingText` itself is server rendered. The earlier code-to-copy GSAP scene remains in the source, unmounted until storytelling work resumes. There is no database, authentication, application API, contact backend, or Three.js. Data is local and the homepage is prerendered.

The runtime dependencies are Next.js, React / React DOM, GSAP, the official `@gsap/react` integration, and tree-shaken Lucide icons. Development dependencies provide TypeScript, React / Node types, ESLint with Next.js rules, and Prettier. The lockfile records exact installed versions. System fonts avoid network font requests; replace the font tokens or use `next/font/local` when typography is selected.

TypeScript is pinned to 6.0.3, which is supported by the current TypeScript ESLint parser. ESLint 10 uses the official Next.js plugin directly alongside TypeScript and React Hooks rules: the bundled `eslint-config-next` currently includes older React plugins incompatible with ESLint 10. This keeps the lint command functional with a maintained ESLint version.

## Edit content

- **Identity, URLs, contact, resume, SEO image:** `src/data/site.ts`
- **Projects:** `src/data/projects.ts`
- **Employment history:** `src/data/experience.ts`
- **Technologies:** `src/data/technologies.ts`
- **Shared content types:** `src/types/portfolio.ts`
- **Color, typography, spacing tokens:** `src/styles/tokens.css`
- **Homepage section order:** `src/components/sections/home-sections.tsx`

Local Beats is identified as a location-based music discovery application; InstaPoll is a ranked-choice polling application. Their visuals are labeled **concept placeholders**, not real screenshots. Technology arrays and URLs are intentionally empty until verified. The third card and employment history are explicit placeholders. The technologies section currently describes this website’s actual stack rather than claiming unverified personal experience.

Projects support title, description, technologies, GitHub/live URLs, optimized images, featured status, and an optional case-study link. Add real content and set `status: "published"` to remove the pending label. Case-study routes are not generated automatically: create the route before supplying its link. Images use `next/image`, responsive `sizes`, and lazy loading outside the hero.

Experience supports company, role, ISO month dates, description, technologies, and highlights. A known `startDate` with `endDate: null` displays “Present”; both null means unpublished. Replace the placeholder record with verified history.

## Contact, profiles, and resume

`socialProfiles` in `src/data/site.ts` is the single source of truth for the official GitHub and LinkedIn URLs. The hero, footer, and contact section all use the shared `SocialLinks` component, with accessible owner labels and new-tab links using `rel="noopener noreferrer"`. Email remains unavailable until `site.email` is set, which automatically enables the `mailto:` action.

The current resume is served from:

```text
public/documents/Ramses_Sanchez_Resume.pdf
```

`site.resume.path` points to `/documents/Ramses_Sanchez_Resume.pdf`, and `site.resume.available` is `true`. The navbar and contact resume links open the PDF directly in a new tab using the browser's PDF viewer; they do not force a download or scroll to a page section. Replace the file at the same path to update the resume. A future contact form can be introduced inside the contact component without changing the rest of the page; submissions and a backend are deliberately not implemented.

## Hero media and editable overlays

The current hero plays `public/videos/hero_loop_1.mp4` as a muted, inline, continuously looping background. It keeps `public/images/backgrounds/coding-workspace.webp` (1672 × 941, about 89 KB), a clean background plate edited from the supplied concept using the built-in image-generation tool. All original website overlays were removed before optimization. The photograph and the interface remain independent.

- `Hero` composes `HeroMedia` and `HeroOverlay` as separate layers.
- `HeroMedia` passes a preloaded Next.js Image fallback to the small `HeroVideo` client component. The native video uses `autoPlay`, `muted`, `loop`, and `playsInline`, with the same responsive cover/crop as the image. The image stays behind the video until playback begins, and remains the fallback on load or playback failure.
- `HeroVideo` defers the MP4 source until the browser’s motion preference is known. Reduced motion uses the static image and skips the video download. Accessible pause/play and sound controls let visitors stop the background or enable audio. Playback starts muted; the sound button to the right of pause toggles audio without changing playback. The sound choice is preserved across pause/resume and tab changes. Returning to a visible tab resumes playback unless the visitor paused it. Event listeners and media resources are cleaned up on unmount.
- `HeroOverlay` owns the exact name, title, sentence, opening/closing comments, code panel, scroll links, and metadata.
- `HeroCodePanel` uses semantic `pre`/`code`, CSS syntax colors, and six decorative line numbers. There is no syntax-highlighting dependency.
- `HeroMeta` reuses professional social icons and adds the New York location. Official profile URLs are centralized in `src/data/site.ts`.
- `hero.module.css` controls composition, image position, typography, and responsive layout; the media never contains website interface text.

The hero has at least viewport height. Short viewports may scroll naturally so content remains readable. Mobile uses a tighter background crop and a stacked metadata row. The background loops natively and the hero copy types in together over 1.7 seconds. No parallax, pinning, or scroll-story animation is added. The existing proof scene is no longer mounted on the homepage; the scroll indicator leads directly to projects.

`useAutoHideHeader` listens to scroll events passively and updates direction at most once per animation frame. The header stays visible near the top, hides on downward scrolling, and returns on even a small upward movement. Focus inside the header or an open mobile menu keeps it visible. Listeners and pending frames are cleaned up on unmount. CSS disables the slide transition for reduced motion.

See [hero implementation notes](docs/hero-implementation.md) for the exact file list, image provenance, and full background-edit prompt.

Future photographs go in `public/images/portraits/`; replace the hero source in `hero-media.tsx` when ready. Store compressed videos in `public/videos/` and frame sequences in `public/sequences/<scene>/`. Keep original media masters outside `public/`; everything in that directory is publicly addressable. Future playback renderers should preserve the existing independent media/content layers and provide a static reduced-motion fallback.

## Animation architecture

`TypingText` (`src/components/animations/typing-text.tsx`) wraps plain text in words that reserve their full width from the first render. `src/lib/animation/typing.ts` measures grapheme boundaries with DOM Ranges and changes only each word's clipping mask. Letters appear and disappear in order; text content, surrounding geometry, and React state stay stable. Completed words remove their clipping so shadows and italic overhang remain intact. The complete semantic text remains available to assistive technology throughout, without live-region announcements.

One `TypingAnimations` controller is mounted inside `main`. Existing containers opt in with `data-typing-group="hero"` or `data-typing-group="scroll"`; nested groups own their own text. All ten hero phrases start together and finish in 1.7 seconds. Shared section headings and the main project, experience, about, technology, and contact copy use the same masks with ScrollTrigger. The reveal starts at `top 90%` and completes over 18% of the viewport height, capped at 160 pixels, with a 0.15-second scrub. Scrolling upward reverses the same timeline, so text deletes and can type again. Navbar, footer, buttons, social links, and the developer code panel are excluded.

Reduced motion skips the typing timelines and immediately exposes all text. A `noscript` override also exposes everything without JavaScript. Resize/ScrollTrigger refresh remeasures glyph boundaries. Cleanup removes each controller's timelines, triggers, refresh listener, data markers, and manually written masks. No per-character React updates, timers, or additional dependencies are used.

`src/lib/animation/gsap.ts` explicitly registers both ScrollTrigger and `useGSAP`, keeping plugin registration present in the production bundle. `useScrollScene` wraps the [official GSAP React lifecycle](https://gsap.com/resources/React/) and [GSAP matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>):

1. Each scene owns an element ref and a stable, typed builder.
2. All element queries stay inside that scene’s root.
3. Desktop/mobile queries rebuild the local animation on breakpoint changes.
4. Reduced motion skips the animation entirely and shows the semantic content.
5. `useGSAP` and `matchMedia.revert()` clean up timelines, inline styles, ScrollTriggers, and optional pins on unmount, preference changes, and hot reloads.

`createScrollTimeline` exposes start/end, scrub, and optional pin settings. Pinning is opt-in; the proof scene is deliberately unpinned so the prototype keeps normal scrolling. For a future pinned scene, pin its wrapper and animate children. Define builders at module scope or memoize them with `useCallback` so renders do not restart a timeline. For async callbacks or interactive animations, use `contextSafe` and explicitly clean up events, animation frames, and media resources. Never call global `ScrollTrigger.killAll()` from an individual scene.

The reusable proof scene (currently not mounted) transitions `build({ for: "people" });` into “I build software people can actually use.” Only transforms and opacity animate. The decorative code is hidden from assistive technology; the final sentence is semantic HTML and remains visible without JavaScript or with reduced motion. No scroll hijacking or extra scrolling library is used.

## Accessibility, performance, and metadata

- Semantic sections, one primary heading, visible focus states, and a skip link.
- Mobile navigation supports keyboard operation, Escape, focus leaving the menu, and outside-click dismissal.
- Native document scrolling and a comprehensive reduced-motion fallback.
- Static/server-rendered content; no client wrapper around the full application.
- Responsive project images are supported but no large placeholder assets ship.
- Next.js [metadata APIs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) define title, description, author, canonical URL, Open Graph, and social card fields.
- No final Open Graph image is invented. Set `site.openGraphImage` to a real local asset when artwork is ready.
- `robots.ts` and `sitemap.ts` use the configured production domain. Review indexing settings before deploying an unfinished preview.
- The footer year is generated during prerender/build. Rebuild at the year boundary to refresh a static deployment.

## Validation and next steps

Run `npm run check` and `npm run build` before shipping. For manual QA, check narrow mobile and desktop widths, keyboard navigation, social links and resume() opening in new tabs, and the navbar hiding downward/reappearing upward. Confirm that the resume PDF loads without scrolling the portfolio. Check the hero types in under two seconds, section copy types/deletes/types on down/up/down scrolling, and wrapping stays stable. Toggle the OS reduced-motion preference and confirm all text appears immediately and the navbar slide transition is disabled.

This is a local foundation for later deployment to **RamsesCode.dev**. No hosting account, domain, or public deployment has been configured. The next design pass can settle photography, storyboard, palette, and typography without restructuring the content or animation layers.

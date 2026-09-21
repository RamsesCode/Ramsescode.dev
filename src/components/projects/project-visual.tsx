import Image from "next/image";
import { AudioLines, Braces, ListOrdered, MapPin } from "lucide-react";
import type { Project } from "@/types/portfolio";

/** Abstract concept placeholders; these are not screenshots of the real products. */
export function ProjectVisual({ project }: { project: Project }) {
  if (project.image)
    return (
      <div className="project-visual">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="project-image"
        />
      </div>
    );

  return (
    <div
      className={`project-visual project-visual--${project.visual}`}
      aria-hidden="true"
    >
      {project.visual === "music" && (
        <>
          <div className="music-rings">
            <span />
            <span />
            <span />
          </div>
          <div className="project-concept-label">
            <MapPin size={11} /> Discover what’s around you
          </div>
          <div className="music-mark">
            <AudioLines size={34} strokeWidth={1.2} />
            <span>
              local beats<span className="concept-period">.</span>
            </span>
          </div>
          <div className="music-wave">
            {[
              12, 22, 36, 18, 42, 30, 54, 36, 22, 46, 32, 18, 28, 42, 24, 14, 32, 20, 12,
            ].map((height, index) => (
              <span key={index} style={{ height }} />
            ))}
          </div>
        </>
      )}
      {project.visual === "poll" && (
        <>
          <div className="poll-concept">
            <div className="poll-concept-header">
              <ListOrdered size={16} />
              <span>Make every preference count.</span>
            </div>
            <div className="poll-option">
              <span>01</span>
              <span className="poll-bar poll-bar--first" />
              <span className="poll-check">✓</span>
            </div>
            <div className="poll-option">
              <span>02</span>
              <span className="poll-bar poll-bar--second" />
            </div>
            <div className="poll-option">
              <span>03</span>
              <span className="poll-bar poll-bar--third" />
            </div>
          </div>
          <span className="poll-wordmark">
            InstaPoll<span>↗</span>
          </span>
        </>
      )}
      {project.visual === "future" && (
        <div className="future-concept">
          <Braces size={44} strokeWidth={1} />
          <span>something.next()</span>
          <span className="future-cursor" />
        </div>
      )}
      <span className="visual-placeholder-label">
        {project.visual === "future" ? "PROJECT PLACEHOLDER" : "CONCEPT PLACEHOLDER"}
      </span>
    </div>
  );
}

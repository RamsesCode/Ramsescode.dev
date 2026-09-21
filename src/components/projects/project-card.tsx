import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/social/brand-icons";
import type { Project } from "@/types/portfolio";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="project-card" aria-labelledby={`${project.id}-title`}>
      <ProjectVisual project={project} />
      <div className="project-card-content">
        <p className="project-category">
          <span>{String(index + 1).padStart(2, "0")}</span>
          {project.category}
        </p>
        <h3 id={`${project.id}-title`}>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.technologies.length > 0 && (
          <ul className="tag-list" aria-label="Technologies">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        )}
        <div className="project-links">
          {project.caseStudy && (
            <a href={project.caseStudy.href}>
              {project.caseStudy.label}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={14} aria-hidden="true" />
              Source
              <span className="visually-hidden">
                {" "}
                for {project.title} (opens in a new tab)
              </span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live project
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          )}
          {project.status === "content-pending" && (
            <span className="project-pending">
              <span className="tiny-dot" />
              {project.visual === "future"
                ? "In the works"
                : "Project details coming soon"}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="section projects-section"
      aria-labelledby="projects-heading"
    >
      <Container>
        <SectionHeading
          id="projects-heading"
          number="02"
          label="Selected work"
          title="Built with intention."
          description="Ideas turned into interfaces. A few things I’ve been building."
        />
        <div className="project-grid">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </Container>
    </section>
  );
}

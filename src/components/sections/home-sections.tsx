import { FeaturedProjects } from "@/components/projects/featured-projects";
import { ExperienceSection } from "@/components/experience/experience-section";
import { AboutSection } from "@/components/about/about-section";
import { TechnologiesSection } from "@/components/skills/technologies-section";
import { ContactSection } from "@/components/contact/contact-section";

/** Server-rendered section composition; animation boundaries remain local. */
export function HomeSections() {
  return (
    <>
      <FeaturedProjects />
      <ExperienceSection />
      <AboutSection />
      <TechnologiesSection />
      <ContactSection />
    </>
  );
}

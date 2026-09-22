import { ArrowUpRight } from "lucide-react";
import { TypingText } from "@/components/animations/typing-text";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import { experience } from "@/data/experience";

function formatMonth(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T00:00:00Z`));
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section experience-section"
      aria-labelledby="experience-heading"
    >
      <Container>
        <SectionHeading
          id="experience-heading"
          number="03"
          label="Experience"
          title="The work behind the work."
        />
        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-item" key={item.id}>
              <div className="experience-dates">
                <span className="tiny-dot" />
                {item.startDate
                  ? `${formatMonth(item.startDate)} — ${item.endDate ? formatMonth(item.endDate) : "Present"}`
                  : "DETAILS FORTHCOMING"}
              </div>
              <div data-typing-group="scroll">
                <h3>
                  <TypingText>{item.role}</TypingText>
                </h3>
                <p className="experience-company">
                  <TypingText>{item.company}</TypingText>
                </p>
                <p className="experience-description">
                  <TypingText>{item.description}</TypingText>
                </p>
                {item.highlights.length > 0 && (
                  <ul className="experience-highlights">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                )}
                {item.technologies.length > 0 && (
                  <ul className="tag-list">
                    {item.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                )}
              </div>
              <ArrowUpRight
                className="experience-arrow"
                size={21}
                strokeWidth={1}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

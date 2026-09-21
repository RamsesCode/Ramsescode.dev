import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/typography/section-heading";
import { technologies } from "@/data/technologies";

export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      className="section technologies-section"
      aria-labelledby="technologies-heading"
    >
      <Container>
        <SectionHeading
          id="technologies-heading"
          number="05"
          label="Tools & technologies"
          title="The right tools. Thoughtfully used."
          description="The stack behind this portfolio. A broader picture of my toolkit is coming soon."
        />
        <ul className="technology-grid">
          {technologies.map((technology) => (
            <li key={technology.name}>
              <span className="technology-symbol" aria-hidden="true">
                {technology.symbol}
              </span>
              <div>
                <h3>{technology.name}</h3>
                <p>{technology.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

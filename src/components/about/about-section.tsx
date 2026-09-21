import { ArrowUpRight, Code2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button-link";

export function AboutSection() {
  return (
    <section id="about" className="section about-section" aria-labelledby="about-heading">
      <Container className="about-grid">
        <div>
          <p className="eyebrow">
            <span className="section-number">04</span> The person behind the code
          </p>
          <h2 id="about-heading">
            Curious by nature.
            <br />
            <span className="text-muted">Engineer by craft.</span>
          </h2>
          <p className="about-copy">
            I’m Ramses, a Full Stack Software Engineer. I care about the connection
            between how software works and how it feels to use.
          </p>
          <p className="about-copy">
            This is a space for the things I build, the details I care about, and the
            ideas I’m still exploring.
          </p>
          <ButtonLink href="#contact" variant="text">
            Let’s build something useful <ArrowUpRight size={16} aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="about-note">
          <div className="about-note-top">
            <Code2 size={20} strokeWidth={1.5} aria-hidden="true" />
            <span className="mono-label">A FEW GUIDING PRINCIPLES</span>
          </div>
          <ol className="principle-list">
            <li>
              <span>01</span>Make it useful.
            </li>
            <li>
              <span>02</span>Make it thoughtful.
            </li>
            <li>
              <span>03</span>Make it feel effortless.
            </li>
          </ol>
          <div className="about-note-bottom">
            <span className="status-dot" />
            <span>Always a work in progress.</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

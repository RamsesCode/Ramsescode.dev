import { ArrowUpRight, Mail } from "lucide-react";
import { TypingText } from "@/components/animations/typing-text";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/social/social-links";
import { ButtonLink } from "@/components/ui/button-link";
import { site } from "@/data/site";

/** Contact content is independent of any future form or submission service. */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="section contact-section"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="contact-panel">
          <div className="contact-content" data-typing-group="scroll">
            <p className="eyebrow">
              <span className="section-number">06</span>{" "}
              <TypingText>Start a conversation</TypingText>
            </p>
            <h2 id="contact-heading">
              <TypingText>Good things start</TypingText>
              <br />
              <TypingText>with a</TypingText>{" "}
              <span className="contact-heading-accent">
                <TypingText>hello.</TypingText>
              </span>
            </h2>
            <p data-typing-group="scroll">
              <TypingText>
                Have a software engineering opportunity or something worth building? I’d
                love to hear about it.
              </TypingText>
            </p>
            <div className="contact-actions">
              {site.email ? (
                <ButtonLink href={`mailto:${site.email}`}>
                  <Mail size={17} aria-hidden="true" />
                  Say hello
                  <ArrowUpRight size={16} aria-hidden="true" />
                </ButtonLink>
              ) : (
                <span
                  className="button button--secondary contact-placeholder"
                  role="link"
                  aria-disabled="true"
                >
                  <Mail size={17} aria-hidden="true" />
                  Email coming soon
                </span>
              )}
              <SocialLinks />
            </div>
            {!site.email && (
              <p className="contact-status">Email contact details will be added soon.</p>
            )}
          </div>
          <div className="contact-mark" aria-hidden="true">
            hello<span>()</span>
            <span className="contact-mark-dot">.</span>
          </div>
        </div>
        <p className="resume-status">
          {site.resume.available ? (
            <a href={site.resume.path} target="_blank" rel="noopener noreferrer">
              View Ramses’s resume (PDF)
              <span className="visually-hidden"> (opens in a new tab)</span>{" "}
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : (
            "Resume coming soon. A downloadable PDF will be available here."
          )}
        </p>
      </Container>
    </section>
  );
}

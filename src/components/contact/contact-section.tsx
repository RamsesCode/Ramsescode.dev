import { ArrowUpRight, Mail } from "lucide-react";
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
          <div className="contact-content">
            <p className="eyebrow">
              <span className="section-number">06</span> Start a conversation
            </p>
            <h2 id="contact-heading">
              Good things start
              <br />
              with a <span>hello.</span>
            </h2>
            <p>
              Have a software engineering opportunity or something worth building? I’d
              love to hear about it.
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
              <p className="contact-status">
                Contact details and professional profiles will be added soon.
              </p>
            )}
          </div>
          <div className="contact-mark" aria-hidden="true">
            hello<span>()</span>
            <span className="contact-mark-dot">.</span>
          </div>
        </div>
        <p id="resume-status" className="resume-status" tabIndex={-1}>
          {site.resume.available ? (
            <a href={site.resume.path}>
              View Ramses’s resume (PDF) <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : (
            "Resume coming soon. A downloadable PDF will be available here."
          )}
        </p>
      </Container>
    </section>
  );
}

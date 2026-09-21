import { ArrowUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SocialLinks } from "@/components/social/social-links";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="footer-main">
        <a className="footer-name" href="#top">
          Ramses Sanchez<span>Full Stack Software Engineer</span>
        </a>
        <SocialLinks />
        <a href="#top" className="back-to-top">
          Back to top <ArrowUp size={14} aria-hidden="true" />
        </a>
      </Container>
      <Container className="footer-bottom">
        <span>© {new Date().getFullYear()} Ramses Sanchez</span>
        <span>Built with care. One commit at a time.</span>
        <span className="footer-domain">ramsescode.dev</span>
      </Container>
    </footer>
  );
}

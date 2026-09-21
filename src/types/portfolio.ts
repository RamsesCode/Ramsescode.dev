export type ExternalUrl = `https://${string}`;

export interface PortfolioImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: readonly string[];
  githubUrl?: ExternalUrl;
  liveUrl?: ExternalUrl;
  image?: PortfolioImage;
  featured: boolean;
  status: "content-pending" | "published";
  visual: "music" | "poll" | "future";
  caseStudy?: { href: string; label: string };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  /** ISO month (YYYY-MM) when known; null means unpublished. */
  startDate: string | null;
  /** null with a known startDate means present. */
  endDate: string | null;
  description: string;
  technologies: readonly string[];
  highlights: readonly string[];
  status: "placeholder" | "published";
}

export interface SocialProfile {
  id: "github" | "linkedin";
  label: string;
  url: ExternalUrl | null;
}

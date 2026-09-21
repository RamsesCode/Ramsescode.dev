import type { SocialProfile } from "@/types/portfolio";

export const site = {
  name: "Ramses Sanchez",
  title: "Full Stack Software Engineer",
  description:
    "Ramses Sanchez — Full Stack Software Engineer. Building useful, polished software experiences.",
  url: "https://ramsescode.dev",
  email: null as string | null,
  resume: {
    path: "/documents/ramses-sanchez-resume.pdf",
    available: false,
  },
  /** Set a local path after the final social-preview artwork is supplied. */
  openGraphImage: null as string | null,
};

export const socialProfiles: readonly SocialProfile[] = [
  { id: "github", label: "GitHub", url: null },
  { id: "linkedin", label: "LinkedIn", url: null },
];

export const navigation = [
  { href: "#about", label: "about()" },
  { href: "#projects", label: "projects()" },
  { href: "#experience", label: "experience()" },
  { href: "#contact", label: "contact()" },
] as const;

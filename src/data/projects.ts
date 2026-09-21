import type { Project } from "@/types/portfolio";

export const projects: readonly Project[] = [
  {
    id: "local-beats",
    title: "Local Beats",
    category: "Music & discovery",
    description:
      "A location-based music discovery application. Find the sound around you.",
    technologies: [],
    featured: true,
    status: "content-pending",
    visual: "music",
  },
  {
    id: "instapoll",
    title: "InstaPoll",
    category: "Decisions & participation",
    description:
      "A ranked-choice polling application. A more thoughtful way to make a choice.",
    technologies: [],
    featured: true,
    status: "content-pending",
    visual: "poll",
  },
  {
    id: "next-project",
    title: "The next build",
    category: "Room for what’s next",
    description:
      "A space for a future project. More ideas, experiments, and considered software to come.",
    technologies: [],
    featured: true,
    status: "content-pending",
    visual: "future",
  },
];

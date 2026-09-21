import { ArrowUpRight } from "lucide-react";
import { Github, Linkedin } from "./brand-icons";
import { socialProfiles } from "@/data/site";

export function SocialLinks({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <ul
      className={`social-links ${iconOnly ? "social-links--icons" : ""}`}
      aria-label="Professional profiles"
    >
      {socialProfiles.map(({ id, label, url }) => {
        const Icon = id === "github" ? Github : Linkedin;
        const contents = (
          <>
            <Icon size={17} aria-hidden="true" />
            {!iconOnly && <span>{label}</span>}
            {!iconOnly && url && <ArrowUpRight size={14} aria-hidden="true" />}
          </>
        );
        return (
          <li key={id}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
              >
                {contents}
              </a>
            ) : (
              <span
                className="social-placeholder"
                role="link"
                aria-disabled="true"
                aria-label={`${label} — profile coming soon`}
                title={`${label} profile coming soon`}
              >
                {contents}
                {!iconOnly && (
                  <span className="visually-hidden"> — profile coming soon</span>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

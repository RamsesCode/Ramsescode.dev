import { site } from "@/data/site";
import styles from "./navigation.module.css";

export function ResumeLink() {
  return site.resume.available ? (
    <a
      className={styles.resumeLink}
      href={site.resume.path}
      target="_blank"
      rel="noopener noreferrer"
    >
      resume()
      <span className="visually-hidden"> (PDF, opens in a new tab)</span>
    </a>
  ) : (
    <a
      className={styles.resumeLink}
      href="#resume-status"
      aria-label="resume() — coming soon"
    >
      resume()
    </a>
  );
}

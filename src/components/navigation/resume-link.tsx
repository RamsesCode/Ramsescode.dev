import { site } from "@/data/site";
import styles from "./navigation.module.css";

export function ResumeLink() {
  return (
    <a
      className={styles.resumeLink}
      href={site.resume.path}
      target="_blank"
      rel="noopener noreferrer"
    >
      resume()
      <span className="visually-hidden"> (PDF, opens in a new tab)</span>
    </a>
  );
}

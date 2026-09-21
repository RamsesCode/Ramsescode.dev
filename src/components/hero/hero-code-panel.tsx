import type { ReactNode } from "react";
import styles from "./hero.module.css";

const lines: readonly ReactNode[] = [
  <>
    <span className={styles.keyword}>const</span>{" "}
    <span className={styles.property}>developer</span> = {"{"}
  </>,
  <>
    {"  "}
    <span className={styles.property}>name</span>:{" "}
    <span className={styles.nameString}>"Ramses Sanchez"</span>,
  </>,
  <>
    {"  "}
    <span className={styles.property}>role</span>:{" "}
    <span className={styles.string}>"Full Stack Software Engineer"</span>,
  </>,
  <>
    {"  "}
    <span className={styles.property}>location</span>:{" "}
    <span className={styles.string}>"New York, NY"</span>,
  </>,
  <>
    {"  "}
    <span className={styles.property}>passion</span>:{" "}
    <span className={styles.string}>"Building useful software"</span>
  </>,
  <>{"};"}</>,
];

export function HeroCodePanel() {
  return (
    <div className={styles.codePanel}>
      <pre aria-label="Developer profile in JavaScript">
        <code>
          {lines.map((line, index) => (
            <span className={styles.codeLine} key={index}>
              <span className={styles.lineNumber} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles.lineContent}>{line}</span>
              {index < lines.length - 1 ? "\n" : ""}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

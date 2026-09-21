import { ChevronDown } from "lucide-react";
import { HeroCodePanel } from "./hero-code-panel";
import { HeroMeta } from "./hero-meta";
import { ScrollIndicator } from "./scroll-indicator";
import styles from "./hero.module.css";

export function HeroOverlay() {
  return (
    <div className={styles.overlay}>
      <p className={styles.openingComments}>
        <span>// ideas</span>
        <span>// code</span>
        <span>// build</span>
        <span>// repeat</span>
      </p>
      <div className={styles.introduction}>
        <h1 id="hero-heading" className={styles.name}>
          RAMSES SANCHEZ
        </h1>
        <p className={styles.role}>FULL STACK SOFTWARE ENGINEER</p>
        <p className={styles.statement}>
          Turning ideas into real-world software experiences.
        </p>
        <HeroCodePanel />
        <ScrollIndicator />
      </div>
      <div className={styles.bottomRow}>
        <p className={styles.closingComments}>
          <span>// Better Software</span>
          <span>// A Brighter Tomorrow</span>
        </p>
        <a
          className={styles.nextSection}
          href="#projects"
          aria-label="Explore featured projects"
        >
          <ChevronDown size={28} strokeWidth={1.2} aria-hidden="true" />
        </a>
        <HeroMeta />
      </div>
    </div>
  );
}

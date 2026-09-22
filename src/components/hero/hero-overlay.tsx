import { ChevronDown } from "lucide-react";
import { TypingText } from "@/components/animations/typing-text";
import { HeroCodePanel } from "./hero-code-panel";
import { HeroMeta } from "./hero-meta";
import { ScrollIndicator } from "./scroll-indicator";
import styles from "./hero.module.css";

export function HeroOverlay() {
  return (
    <div className={styles.overlay} data-typing-group="hero">
      <p className={styles.openingComments}>
        <span>
          <TypingText>// ideas</TypingText>
        </span>
        <span>
          <TypingText>// code</TypingText>
        </span>
        <span>
          <TypingText>// build</TypingText>
        </span>
        <span>
          <TypingText>// repeat</TypingText>
        </span>
      </p>
      <div className={styles.introduction}>
        <div className={styles.identity}>
          <h1 id="hero-heading" className={styles.name}>
            <TypingText>RAMSES SANCHEZ</TypingText>
          </h1>
          <p className={styles.role}>
            <TypingText>SOFTWARE ENGINEER</TypingText>
          </p>
          <p className={styles.statement}>
            <TypingText>Turning ideas into real-world software experiences.</TypingText>
          </p>
        </div>
        <HeroCodePanel />
        <ScrollIndicator />
      </div>
      <div className={styles.bottomRow}>
        <p className={styles.closingComments}>
          <span>
            <TypingText>// Better Software</TypingText>
          </span>
          <span>
            <TypingText>// A Brighter Tomorrow</TypingText>
          </span>
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

import styles from "./hero.module.css";
import { TypingText } from "@/components/animations/typing-text";

export function ScrollIndicator() {
  return (
    <a className={styles.scrollIndicator} href="#projects">
      <span className={styles.mouseTrack} aria-hidden="true">
        <span className={styles.mouse}>
          <span />
        </span>
      </span>
      <span>
        <TypingText>SCROLL TO EXPLORE</TypingText>
      </span>
    </a>
  );
}

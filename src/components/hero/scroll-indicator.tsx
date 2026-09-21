import styles from "./hero.module.css";

export function ScrollIndicator() {
  return (
    <a className={styles.scrollIndicator} href="#projects">
      <span className={styles.mouseTrack} aria-hidden="true">
        <span className={styles.mouse}>
          <span />
        </span>
      </span>
      <span>SCROLL TO EXPLORE</span>
    </a>
  );
}

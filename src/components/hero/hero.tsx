import { HeroMedia } from "./hero-media";
import { HeroOverlay } from "./hero-overlay";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <HeroMedia />
      <HeroOverlay />
    </section>
  );
}

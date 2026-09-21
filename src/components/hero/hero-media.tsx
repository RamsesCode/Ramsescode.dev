import Image from "next/image";
import { HeroVideo } from "./hero-video";
import styles from "./hero.module.css";

/** Background media stays independent of the editable HeroOverlay. */
export function HeroMedia() {
  return (
    <HeroVideo>
      <Image
        src="/images/backgrounds/coding-workspace.webp"
        alt=""
        fill
        sizes="(max-width: 700px) 1200px, 100vw"
        preload
        className={styles.image}
      />
    </HeroVideo>
  );
}

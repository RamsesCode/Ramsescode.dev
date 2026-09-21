import { MapPin } from "lucide-react";
import { SocialLinks } from "@/components/social/social-links";
import styles from "./hero.module.css";

export function HeroMeta() {
  return (
    <div className={styles.meta}>
      <SocialLinks iconOnly />
      <span className={styles.metaDivider} aria-hidden="true" />
      <span className={styles.location}>
        <MapPin size={19} strokeWidth={1.2} aria-hidden="true" />
        New York, NY
      </span>
    </div>
  );
}

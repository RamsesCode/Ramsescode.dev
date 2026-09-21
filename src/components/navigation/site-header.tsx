"use client";

import { useRef, useState } from "react";
import { navigation } from "@/data/site";
import { useAutoHideHeader } from "@/hooks/use-auto-hide-header";
import { MobileNavigation } from "./mobile-navigation";
import { ResumeLink } from "./resume-link";
import styles from "./navigation.module.css";

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useAutoHideHeader(header, menuOpen);

  return (
    <header className={styles.header} ref={header} data-menu-open={menuOpen}>
      <div className={styles.inner}>
        <a
          href="#top"
          className={styles.wordmark}
          aria-label="RamsesCode.dev — back to top"
        >
          <span className={styles.prefix} aria-hidden="true">
            &gt;&gt;
          </span>
          <span>RamsesCode.dev</span>
        </a>
        <nav className={styles.desktopNavigation} aria-label="Main navigation">
          {navigation.map(({ href, label }) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
          <ResumeLink />
        </nav>
        <MobileNavigation open={menuOpen} onOpenChange={setMenuOpen} />
      </div>
    </header>
  );
}

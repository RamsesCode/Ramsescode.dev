"use client";

import { useEffect, useId, useRef } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/site";
import { ResumeLink } from "./resume-link";
import styles from "./navigation.module.css";

type MobileNavigationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNavigation({ open, onOpenChange }: MobileNavigationProps) {
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
        button.current?.focus();
      }
    }
    function handlePointer(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        onOpenChange(false);
    }
    const desktop = window.matchMedia("(min-width: 960px)");
    const closeOnDesktop = () => {
      if (desktop.matches) onOpenChange(false);
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open, onOpenChange]);

  return (
    <div
      className={styles.mobileNavigation}
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onOpenChange(false);
      }}
    >
      <button
        ref={button}
        className={styles.menuButton}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => onOpenChange(!open)}
      >
        {open ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Menu size={22} aria-hidden="true" />
        )}
      </button>
      <nav
        id={menuId}
        className={styles.mobileMenu}
        aria-label="Mobile navigation"
        hidden={!open}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a")) {
            onOpenChange(false);
          }
        }}
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <ResumeLink />
      </nav>
    </div>
  );
}

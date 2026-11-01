"use client";

import { m } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Render as a list item so it can sit directly inside <ul>/<ol> */
  as?: "div" | "li";
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fades content in as it scrolls into view. For above-the-fold content use the CSS
 * `animate-rise` class instead, so it shows on first paint rather than after hydration.
 */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Tag = as === "li" ? m.li : m.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </Tag>
  );
}

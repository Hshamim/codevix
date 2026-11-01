"use client";

import { useEffect, useRef } from "react";

const DURATION = 1800;
// Close to the cubic-bezier(0.22, 1, 0.36, 1) used elsewhere
const easeOut = (t: number) => 1 - (1 - t) ** 4;

/** Counts up to `value` once scrolled into view. Plain rAF so it doesn't pull in the animation library. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          el.textContent = `${Math.round(easeOut(t) * value)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-60px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, suffix]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/**
 * Respects the visitor's "reduce motion" setting for every animation, and loads the
 * animation engine after first paint. `strict` makes any stray `motion.*` (instead of `m.*`) throw.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

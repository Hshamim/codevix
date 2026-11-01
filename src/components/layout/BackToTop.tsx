"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-3 font-semibold text-fg"
    >
      Back to top
      <span className="grid size-10 place-items-center rounded-full bg-accent text-white transition-transform group-hover:-translate-y-1">
        <ArrowUp className="size-4" />
      </span>
    </button>
  );
}

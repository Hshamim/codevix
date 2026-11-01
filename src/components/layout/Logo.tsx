import Link from "next/link";
import { site } from "@/data/site";

/**
 * "Stack C" mark: a bold C sliced into three layers (front end, API, data), for building the whole stack.
 * The C sits 1.4 units right of centre so its open side doesn't look lopsided; the slices are tile-coloured cuts.
 * Same drawing as the favicon (src/app/icon.svg), the social image and brand/generate.mjs.
 */
export function LogoMark({ className = "size-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <rect width="40" height="40" rx="9" fill="var(--color-accent)" />
      <path d="M29.3 12.9A10.6 10.6 0 1 0 29.3 27.1" fill="none" stroke="#fff" strokeWidth="6.2" strokeLinecap="round" />
      <path d="M0 16.5h40v2H0zM0 21.5h40v2H0z" fill="var(--color-accent)" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.brand} — home`}>
      <LogoMark className="size-11 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="text-[1.75rem] leading-none font-extrabold tracking-[-0.04em]">
        {site.brand}
        <span className="text-accent">.</span>
      </span>
    </Link>
  );
}

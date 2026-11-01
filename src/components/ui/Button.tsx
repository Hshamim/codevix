import Link from "next/link";
import { ArrowRight } from "lucide-react";

const block: Record<"accent" | "light" | "dark", string> = {
  accent: "bg-accent text-white",
  light: "bg-white text-ink-soft",
  dark: "bg-ink-soft text-white",
};

/** Secondary action next to a BlockButton: bold text with a red arrow. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 text-[15px] font-bold underline-offset-8 hover:underline ${className}`}>
      {children}
      <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/** Rectangular button with a strip that fills on hover. */
export function BlockButton({
  href,
  children,
  variant = "accent",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof block;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex overflow-hidden rounded-md px-10 py-4 text-[15px] font-bold transition-colors ${block[variant]} ${className}`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-5 transition-all duration-300 group-hover:w-full ${
          variant === "accent" ? "bg-black/20" : "bg-accent/15"
        }`}
      />
      <span className="relative">{children}</span>
    </Link>
  );
}

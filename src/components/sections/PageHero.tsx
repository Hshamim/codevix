import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { photos } from "@/data/site";
import { HeroDecor } from "./HeroDecor";

type PageHeroProps = {
  crumb: string;
  title: React.ReactNode;
  description?: string;
  /** Background photo; defaults to the generic banner photo */
  image?: string;
  /** Extra breadcrumb level between Home and the current page */
  parent?: { label: string; href: string };
};

/** Inner-page banner: same photo treatment and decoration as the home hero, with a title and breadcrumb. */
export function PageHero({ crumb, title, description, image = photos.banner, parent }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-44 pb-24 text-center md:pt-56 md:pb-32">
      <Image src={image} alt="" fill fetchPriority="high" loading="eager" sizes="100vw" quality={50} className="-z-20 object-cover" />
      <HeroDecor />

      <div className="container-x">
        {/* CSS entrances: visible on first paint, not after JavaScript loads */}
        <h1 className="mx-auto max-w-4xl animate-rise text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] font-extrabold tracking-[-0.04em] text-balance">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-fg/75" style={{ animationDelay: "0.1s" }}>
            {description}
          </p>
        )}
        <div className="animate-rise" style={{ animationDelay: "0.2s" }}>
          <nav aria-label="Breadcrumb" className="mt-10 inline-flex">
            <ol className="flex flex-wrap items-center justify-center gap-2 rounded-md bg-fg/10 px-6 py-3 text-sm font-semibold backdrop-blur-sm">
              <li>
                <Link href="/" className="text-fg/80 transition-colors hover:text-accent">
                  Home
                </Link>
              </li>
              {parent && (
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4 text-accent" />
                  <Link href={parent.href} className="text-fg/80 transition-colors hover:text-accent">
                    {parent.label}
                  </Link>
                </li>
              )}
              <li className="flex items-center gap-2" aria-current="page">
                <ChevronRight className="size-4 text-accent" />
                <span className="text-accent">{crumb}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}

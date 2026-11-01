import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";
import { ProjectCover } from "@/components/projects/ProjectCover";

export function Showcase() {
  return (
    <section className="bg-ink pt-20 lg:pt-24">
      <Reveal className="container-x text-center">
        <Kicker tone="dark">Recent work</Kicker>
        <h2 className={`mt-4 ${headingCls}`}>Work showcase</h2>
      </Reveal>

      {/* Edge-to-edge strip, scrolls sideways on small screens. Titles hide until hover only where hover exists */}
      <ul className="mt-14 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:overflow-visible">
        {projects.filter((p) => p.featured).map((p) => (
          <li key={p.slug} className="w-[75vw] shrink-0 snap-start sm:w-[45vw] lg:w-auto lg:flex-1">
            <Link href={`/projects/${p.slug}`} className="group relative block aspect-[4/5] overflow-hidden">
              <div className="size-full transition-transform duration-700 group-hover:scale-105">
                <ProjectCover project={p} sizes="(min-width: 1024px) 25vw, 75vw" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 opacity-100 transition-opacity duration-500 lg:pointer-fine:opacity-0 lg:pointer-fine:group-hover:opacity-100 lg:pointer-fine:group-focus-visible:opacity-100">
                <p className="text-xs font-semibold tracking-widest text-fg/75 uppercase">{p.category}</p>
                <p className="mt-1 flex items-center justify-between text-xl font-extrabold">
                  {p.title}
                  <span className="grid size-10 place-items-center rounded-full bg-accent text-white">
                    <ArrowUpRight className="size-4" />
                  </span>
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

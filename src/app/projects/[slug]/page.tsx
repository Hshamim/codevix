import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Layers, User, Wrench } from "lucide-react";
import { hero, photos, projects, type CoverVariant } from "@/data/site";
import { BlockButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata({ title: project.title, description: project.summary, path: `/projects/${project.slug}` });
}

const galleryVariants: Record<CoverVariant, CoverVariant[]> = {
  dashboard: ["landing", "mobile"],
  landing: ["dashboard", "mobile"],
  commerce: ["landing", "mobile"],
  mobile: ["landing", "dashboard"],
};

// Every project page is prerendered (generateStaticParams), so reading `params` up front costs
// nothing. Opting out of instant-navigation validation avoids a Suspense placeholder, which made
// the footer jump on load (CLS) and stopped unknown slugs from returning a real 404 status.
export const instant = false;

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { icon: User, label: "Client", value: project.client },
    { icon: Calendar, label: "Year", value: project.year },
    { icon: Wrench, label: "Role", value: project.role },
    { icon: Layers, label: "Stack", value: project.tags.join(", ") },
  ];

  return (
    <>
      <PageHero
        crumb={project.title}
        parent={{ label: "Work", href: "/projects" }}
        title={project.title}
        description={project.summary}
        image={photos.bannerWork}
      />

      <section className="section-y bg-paper text-ink-soft">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* Case study */}
          <div className="lg:col-span-8">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden rounded-md shadow-xl">
                <ProjectCover project={project} priority sizes="(min-width: 1024px) 800px, 100vw" />
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <Kicker>The challenge</Kicker>
              <h2 className={`mt-4 ${headingCls}`}>What needed solving</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-dark">{project.challenge}</p>
            </Reveal>

            <Reveal className="mt-12">
              <Kicker>The solution</Kicker>
              <h2 className={`mt-4 ${headingCls}`}>How we built it</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-dark">{project.solution}</p>
            </Reveal>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {project.gallery
                ? project.gallery.map((src, i) => (
                    <Reveal key={src} delay={i * 0.1}>
                      <div className="relative aspect-square overflow-hidden rounded-md shadow-lg">
                        <Image src={src} alt={`${project.title} — image ${i + 1}`} fill sizes="(min-width: 1024px) 400px, 50vw" className="object-cover" />
                      </div>
                    </Reveal>
                  ))
                : galleryVariants[project.variant].map((variant, i) => (
                    <Reveal key={variant} delay={i * 0.1}>
                      <div className="relative aspect-square overflow-hidden rounded-md shadow-lg">
                        <ProjectCover project={project} variant={variant} />
                      </div>
                    </Reveal>
                  ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-8 lg:sticky lg:top-32">
              <Reveal>
                <div className="rounded-md border-t-4 border-accent bg-cream p-8">
                  <h2 className="text-xl font-extrabold">Project info</h2>
                  <ul className="mt-6 divide-y divide-cream-line">
                    {meta.map((m) => (
                      <li key={m.label} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-white" aria-hidden>
                          <m.icon className="size-4" />
                        </span>
                        <p>
                          <span className="block text-sm text-muted-dark">{m.label}</span>
                          <span className="block font-bold">{m.value}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="rounded-md bg-ink p-8 text-fg">
                  <h2 className="text-xl font-extrabold">Need something similar?</h2>
                  <p className="mt-3 leading-relaxed text-muted">
                    Tell us about your project and we’ll reply with ideas, a timeline and a quote.
                  </p>
                  <BlockButton href={hero.primary.href} className="mt-6">
                    {hero.primary.label}
                  </BlockButton>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* Results */}
      <section className="bg-ink py-20 lg:py-24">
        <div className="container-x">
          <Reveal className="text-center">
            <Kicker tone="dark">Results</Kicker>
            <h2 className={`mt-4 ${headingCls}`}>The impact</h2>
          </Reveal>
          <dl className="mt-12 grid gap-px overflow-hidden rounded-md bg-line sm:grid-cols-3">
            {project.results.map((r) => (
              <div key={r.label} className="flex flex-col bg-ink p-8 text-center">
                <dt className="mt-2 text-muted">{r.label}</dt>
                <dd className="order-first text-[clamp(3rem,6vw,4.5rem)] leading-none font-extrabold tracking-tight text-accent">
                  {r.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Previous / next */}
      <nav aria-label="More projects" className="bg-cream text-ink-soft">
        <div className="container-x grid sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-5 border-cream-line py-10 sm:border-r sm:pr-8">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-paper shadow-sm transition-colors group-hover:bg-accent group-hover:text-white">
              <ArrowLeft className="size-5" />
            </span>
            <span>
              <span className="block text-sm text-muted-dark">Previous project</span>
              <span className="block text-xl font-extrabold transition-colors group-hover:text-accent">{prev.title}</span>
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex items-center justify-end gap-5 border-t border-cream-line py-10 text-right sm:border-t-0 sm:pl-8"
          >
            <span>
              <span className="block text-sm text-muted-dark">Next project</span>
              <span className="block text-xl font-extrabold transition-colors group-hover:text-accent">{next.title}</span>
            </span>
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-paper shadow-sm transition-colors group-hover:bg-accent group-hover:text-white">
              <ArrowRight className="size-5" />
            </span>
          </Link>
        </div>
      </nav>

      <CtaBand />
    </>
  );
}

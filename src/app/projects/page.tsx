import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { photos } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectFilter } from "@/components/projects/ProjectFilter";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description: "Case studies of web apps, SaaS products, online stores and AI tools built with Laravel, Next.js and Vue.js.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumb="Work"
        title="Projects that speak for themselves"
        description="Web apps, Laravel backends and AI features, each built around a real business goal."
        image={photos.bannerWork}
      />
      <section className="section-y bg-cream text-ink-soft">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker>Recent work</Kicker>
            <h2 className={`mt-4 ${headingCls}`}>Selected projects</h2>
          </Reveal>
          <ProjectFilter />
        </div>
      </section>
      <CtaBand />
    </>
  );
}

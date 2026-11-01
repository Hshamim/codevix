import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import { Check, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { aboutPoints, hero, photos, site, stats } from "@/data/site";
import { ArrowLink, BlockButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";
import { CounterBand } from "@/components/home/CounterBand";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `Meet ${site.name}, a ${site.role.toLowerCase()} in ${site.location} building web apps, SaaS products and AI tools with Laravel, Next.js and Vue.js.`,
  path: "/about",
});

const values = [
  {
    icon: ShieldCheck,
    title: "Clean, reliable code",
    description: "Well-structured Laravel and TypeScript code that is tested, secure and easy to maintain.",
  },
  {
    icon: Gauge,
    title: "Fast by default",
    description: "Speed is a feature. Quick APIs, lean front ends and pages that score high and rank well.",
  },
  {
    icon: Sparkles,
    title: "AI where it helps",
    description: "AI speeds up our work and powers real features, but every line is reviewed by our developers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        title="We build web apps that grow businesses"
        description={`We partner with startups and growing businesses to plan, build and scale reliable web applications, backed by ${stats[0].value}+ years of full-stack expertise in Laravel, Next.js and Vue.js.`}
      />

      {/* Who we are */}
      <section className="section-y bg-paper text-ink-soft">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative pr-10 pb-16 sm:pr-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-xl">
              {/* Replace photos.team with a photo of your team or office */}
              <Image src={photos.team} alt="Codevix workspace" fill loading="eager" sizes="(min-width: 1024px) 34vw, 75vw" className="object-cover" />
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 overflow-hidden rounded-md border-8 border-paper shadow-2xl">
              <div className="relative aspect-square">
                <Image src={photos.teamSmall} alt="Team reviewing code together" fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover" />
              </div>
            </div>
            <div className="absolute top-8 -left-3 rounded-md bg-accent px-5 py-4 text-white shadow-lg">
              <p className="text-sm font-semibold">{site.brand}</p>
              <p className="text-xs text-white">{site.role}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Kicker>Who we are</Kicker>
            <h2 className={`mt-4 ${headingCls}`}>
              A team that works across the <span className="text-accent">whole stack</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-dark">
              <p>
                Codevix is a {site.role.toLowerCase()} based in {site.location}, with {stats[0].value} years of experience
                building websites, web apps and SaaS products for startups and small businesses.
              </p>
              <p>
                We work across the whole stack. On the front end we build fast, responsive interfaces in Next.js and Vue.js.
                On the back end we build Laravel APIs, databases, logins, payments and admin dashboards.
              </p>
              <p>
                We work AI-driven: our team uses AI tools to plan, write and test code faster, and we build AI features like
                chatbots, smart search and automation into our clients’ products.
              </p>
            </div>
            <ul className="mt-8 space-y-3.5">
              {aboutPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 font-semibold">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <BlockButton href={hero.primary.href}>{hero.primary.label}</BlockButton>
              <ArrowLink href={hero.secondary.href}>{hero.secondary.label}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <CounterBand />

      {/* Values */}
      <section className="section-y bg-cream text-ink-soft">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Kicker>Our values</Kicker>
            <h2 className={`mt-4 ${headingCls}`}>What we believe in</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-md bg-paper p-8 text-center shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)] transition-transform duration-500 hover:-translate-y-1.5 md:p-10">
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-white ring-8 ring-accent/12">
                    <v.icon className="size-7" />
                  </span>
                  <h3 className="mt-8 text-xl font-extrabold">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-dark">{v.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TechStack />
      <Testimonials />
      <CtaBand />
    </>
  );
}

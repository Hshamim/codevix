import Image from "next/image";
import { Check } from "lucide-react";
import { aboutPoints, photos, site, stats, whatsappHref } from "@/data/site";
import { BlockButton } from "@/components/ui/Button";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="section-y scroll-mt-24 bg-paper text-ink-soft">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Photo collage */}
        <Reveal className="relative pr-10 pb-16 sm:pr-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-xl">
            <Image src={photos.about} alt="Developer working at a desk" fill sizes="(min-width: 1024px) 34vw, 75vw" className="object-cover" />
          </div>
          <div className="absolute right-0 bottom-0 w-1/2 overflow-hidden rounded-md border-8 border-paper shadow-2xl">
            <div className="relative aspect-[4/3]">
              <Image src={photos.aboutSmall} alt="Code on a laptop screen" fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute bottom-10 -left-3 flex items-center gap-3 rounded-md bg-accent px-5 py-4 text-white shadow-lg">
            <span className="text-4xl font-extrabold">{stats[0].value}+</span>
            <span className="text-sm leading-tight font-semibold">
              Years of
              <br />
              experience
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Kicker>About Codeshikor</Kicker>
          <h2 className={`mt-4 ${headingCls}`}>
            A development team building <span className="text-accent">modern web apps</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-dark">
            Codeshikor is a web development agency with {stats[0].value}+ years of experience. We build front
            ends in Next.js and Vue.js, backends in Laravel, and use AI to plan, code and test faster.
          </p>
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
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-cream-line pt-8">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3.5">
              <span className="grid size-12 place-items-center rounded-full bg-cream text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <SocialIcon label="WhatsApp" className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-muted-dark">WhatsApp us</span>
                <span className="block font-bold">{site.phone}</span>
              </span>
            </a>
            <BlockButton href="/about">More about us</BlockButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import Image from "next/image";
import { hero, photos, process } from "@/data/site";
import { ArrowLink, BlockButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";

export function HowWeWork() {
  return (
    <section className="section-y overflow-hidden bg-paper text-ink-soft">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* Three-photo collage with an accent curve behind it */}
        <Reveal className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-4">
          <svg aria-hidden viewBox="0 0 200 200" className="absolute top-1/2 left-1/2 size-[80%] -translate-x-1/2 -translate-y-1/2">
            <circle cx="100" cy="100" r="88" fill="none" stroke="var(--color-accent)" strokeWidth="14" opacity="0.9" />
          </svg>
          <div className="relative row-span-2 aspect-[3/5] overflow-hidden rounded-md shadow-xl">
            <Image src={photos.workA} alt="Developer desk with code on two monitors" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
          </div>
          <div className="relative mt-10 aspect-square overflow-hidden rounded-md shadow-xl">
            <Image src={photos.workB} alt="Code on a laptop" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-md shadow-xl">
            <Image src={photos.workC} alt="Server room" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Kicker>How we work</Kicker>
          <h2 className={`mt-4 ${headingCls}`}>More than just writing code</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-dark">
            Every project follows a clear process, so you always know what is happening and what comes next.
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2">
            {process.map((step, i) => (
              <li key={step.title} className="rounded-md border-l-4 border-accent bg-cream p-5">
                <p className="text-sm font-extrabold">
                  <span className="mr-2 text-accent">0{i + 1}</span>
                  {step.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-dark">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            <BlockButton href={hero.primary.href}>{hero.primary.label}</BlockButton>
            <ArrowLink href={hero.secondary.href}>{hero.secondary.label}</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

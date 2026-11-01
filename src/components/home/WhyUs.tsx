import Image from "next/image";
import { Check } from "lucide-react";
import { highlights, photos } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";

export function WhyUs() {
  return (
    <section className="relative bg-cream text-ink-soft">
      <div className="container-x grid lg:grid-cols-2">
        <div className="py-20 lg:py-28 lg:pr-16">
          <Reveal>
            <Kicker>Why choose Codevix</Kicker>
            <h2 className={`mt-4 ${headingCls}`}>An experienced team you can rely on</h2>
          </Reveal>

          <ul className="mt-10 divide-y divide-cream-line">
            {highlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.1} className="flex gap-6 py-7 first:pt-0">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-white ring-6 ring-accent/12">
                  <Check className="size-5" strokeWidth={3} />
                </span>
                <div>
                  <h3 className="text-lg font-extrabold">{h.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-dark">{h.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* Photo bleeds to the right edge on large screens */}
      <div className="relative h-80 sm:h-[28rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
        <Image src={photos.why} alt="Developers reviewing code together" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
    </section>
  );
}

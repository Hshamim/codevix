"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  return (
    <section className="section-y overflow-hidden bg-ink">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-4">
          <Kicker tone="dark">Testimonials</Kicker>
          <h2 className={`mt-4 ${headingCls}`}>What clients say about our work</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Founders, CTOs and marketing teams we’ve built web apps and websites for.
          </p>
          <div className="mt-8 flex gap-3">
            <SliderButton label="Previous testimonial" onClick={() => go(-1)}>
              <ArrowLeft className="size-5" />
            </SliderButton>
            <SliderButton label="Next testimonial" onClick={() => go(1)}>
              <ArrowRight className="size-5" />
            </SliderButton>
          </div>
        </Reveal>

        {/* Cards slide left; the next card peeks in from the right */}
        <Reveal delay={0.1} className="min-w-0 lg:col-span-8">
          <div className="-mr-6 overflow-hidden lg:-mr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
            <ul
              className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(calc(${-index} * (min(85vw, 30rem) + 1.5rem)))` }}
              aria-live="polite"
            >
              {testimonials.map((t, i) => (
                <li
                  key={t.name}
                  aria-hidden={i !== index}
                  className={`w-[min(85vw,30rem)] shrink-0 rounded-md bg-paper p-8 text-ink-soft transition-opacity duration-500 md:p-10 ${
                    i === index ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="grid size-16 shrink-0 place-items-center rounded-full bg-accent text-lg font-bold text-white ring-4 ring-accent/20">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-lg font-extrabold">{t.name}</p>
                      <p className="text-sm text-muted-dark">{t.title}</p>
                      <div className="mt-1.5 flex gap-0.5 text-amber-400" role="img" aria-label="Rated 5 out of 5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star key={s} className="size-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="relative mt-6 border-t border-cream-line pt-6 leading-relaxed text-muted-dark">
                    <Quote className="absolute -top-4 right-0 size-8 fill-accent bg-paper pl-2 text-accent" aria-hidden />
                    “{t.quote}”
                  </blockquote>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SliderButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-12 place-items-center rounded-full border border-line transition-colors hover:border-accent hover:bg-accent hover:text-white"
    >
      {children}
    </button>
  );
}

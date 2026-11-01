"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { faqs, hero, photos, scores } from "@/data/site";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";

/**
 * Two-column FAQ: a sticky intro (heading, photo, stats) on the left and the questions on the right.
 * Sticky keeps the columns visually aligned however many answers are open.
 */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-y bg-cream text-ink-soft">
      <div className="container-x grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:sticky lg:top-32 lg:col-span-5">
          <Reveal>
            <Kicker>Have any questions?</Kicker>
            <h2 className={`mt-4 ${headingCls}`}>Frequently asked questions</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-dark">
              Straight answers about how we work, timelines, AI and who owns what.
            </p>
          </Reveal>

          {/* Photo with the stats anchored on it (large screens only, so phones don't get a giant image) */}
          <Reveal delay={0.1} className="relative mt-10 hidden pb-12 lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-xl">
              <Image src={photos.faq} alt="Happy client celebrating a launch" fill sizes="40vw" className="object-cover" />
            </div>
            <Stats className="absolute right-6 bottom-0 left-6 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.35)]" />
          </Reveal>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <Reveal className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-md border bg-paper transition-shadow ${
                    isOpen ? "border-accent/40 shadow-[0_14px_40px_-20px_rgb(0_0_0/0.3)]" : "border-cream-line"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold transition-colors ${
                        isOpen ? "text-accent" : "hover:text-accent"
                      }`}
                    >
                      {f.q}
                      <ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-cream-line px-6 py-5">
                          {/* ~65 characters per line keeps answers easy to read */}
                          <p className="max-w-[65ch] leading-relaxed text-muted-dark">{f.a}</p>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>

          {/* Stats as a row on smaller screens, where the photo is hidden */}
          <Stats className="mt-8 lg:hidden" />

          <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-md bg-ink px-6 py-5 text-fg">
            <p className="flex items-center gap-3 font-bold">
              <MessageCircle className="size-5 text-accent" />
              Still have a question? We reply within 24 hours.
            </p>
            <ArrowLink href={hero.primary.href}>Ask us directly</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stats({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-around gap-6 rounded-md bg-paper px-6 py-5 ${className}`}>
      {scores.map((s) => (
        <Ring key={s.label} {...s} />
      ))}
    </div>
  );
}

function Ring({ value, label }: { value: number; label: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    // Stacked again at lg, where the stats sit in the narrow sticky column; side by side once xl gives room
    <figure className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left lg:flex-col lg:gap-2 lg:text-center xl:flex-row xl:gap-4 xl:text-left">
      <div className="relative size-20 shrink-0">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-cream-line)" strokeWidth="7" />
          <m.circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg font-extrabold">{value}%</span>
      </div>
      <figcaption className="text-sm leading-tight font-bold">{label}</figcaption>
    </figure>
  );
}

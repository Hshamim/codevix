"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { Check, Star } from "lucide-react";
import { hero, services, stats } from "@/data/site";
import { ArrowLink, BlockButton } from "@/components/ui/Button";
import { HeroDecor } from "./HeroDecor";

const INTERVAL = 7000;

/**
 * Delay for the CSS entrance (`animate-rise`, see globals.css). CSS plays on first paint,
 * so the hero text is visible before JavaScript loads (this text is the page's LCP element).
 */
const rise = (delay: number) => ({ style: { animationDelay: `${delay}s` } });

export function Hero() {
  const [index, setIndex] = useState(0);

  // Only the background photos rotate; the message stays put so nobody misses it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % hero.images.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  const clients = stats[2];
  const projects = stats[1];

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink">
      {/* Background photos: slow crossfade with a gentle zoom */}
      <AnimatePresence initial={false}>
        <m.div
          key={index}
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <m.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: INTERVAL / 1000 + 1.6, ease: "linear" }}
          >
            <Image src={hero.images[index]} alt="" fill sizes="100vw" fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} quality={50} className="object-cover" />
          </m.div>
        </m.div>
      </AnimatePresence>
      <HeroDecor />

      <div className="container-x relative pt-28 pb-12 text-center md:pt-40 md:pb-14">
        {/* What we provide, first: the solutions clients actually hire for */}
        <ul {...rise(0)} aria-label="What we build" className="animate-rise mx-auto flex max-w-6xl flex-wrap justify-center gap-2">
          {services.map((s) => (
            <li key={s.title}>
              <Link
                href="/#services"
                className="inline-flex items-center gap-2 rounded-md bg-fg/10 px-3.5 py-2 text-xs font-semibold text-fg/90 backdrop-blur-sm transition-colors hover:bg-accent hover:text-white sm:text-sm"
              >
                <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                {s.short}
              </Link>
            </li>
          ))}
        </ul>

        {/* What they get */}
        <h1 className="mt-7 text-[clamp(2.25rem,5.6vw,4.75rem)] leading-[1.05] font-extrabold tracking-[-0.04em] text-balance">
          {hero.title.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="block animate-line-up" style={{ animationDelay: `${0.05 + i * 0.08}s` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* How working with us works, and the promises that answer the usual worries */}
        <p {...rise(0.15)} className="animate-rise mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-balance text-fg/80">
          {hero.text}
        </p>

        {/* One clear next step, plus a lower-commitment option */}
        <div {...rise(0.25)} className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <BlockButton href={hero.primary.href}>{hero.primary.label}</BlockButton>
          <ArrowLink href={hero.secondary.href}>{hero.secondary.label}</ArrowLink>
        </div>

        {/* Trust row: proof and promises that answer the usual worries about hiring remotely */}
        <ul
          {...rise(0.35)}
          className="animate-rise mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-fg/15 pt-6 text-sm text-fg/80"
        >
          <li className="flex items-center gap-2">
            <span className="flex text-amber-400" role="img" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="size-4 fill-current" />
              ))}
            </span>
            <span>
              <strong className="text-fg">{clients.value}+</strong> happy clients
            </span>
          </li>
          <li>
            <strong className="text-fg">{projects.value}+</strong> projects delivered
          </li>
          {hero.promises.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <Check className="size-4 text-accent" strokeWidth={3} />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

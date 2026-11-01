import type { Metadata } from "next";
import Image from "next/image";
import { photos } from "@/data/site";
import { ArrowLink, BlockButton } from "@/components/ui/Button";
import { Kicker } from "@/components/ui/SectionHeading";
import { HeroDecor } from "@/components/sections/HeroDecor";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-svh place-items-center overflow-hidden bg-ink pt-44 pb-24 text-center">
      <Image src={photos.banner} alt="" fill fetchPriority="high" loading="eager" sizes="100vw" quality={50} className="-z-20 object-cover" />
      <HeroDecor />

      <div className="container-x">
        <Kicker tone="dark">Error 404</Kicker>
        <p aria-hidden className="mt-4 text-[clamp(6rem,20vw,12rem)] leading-none font-extrabold tracking-[-0.06em] text-accent">
          404
        </p>
        <h1 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-tight font-extrabold tracking-[-0.03em]">
          This page doesn’t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          The link may be broken or the page may have moved. Let’s get you back on track.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
          <BlockButton href="/">Back to home</BlockButton>
          <ArrowLink href="/projects">See our work</ArrowLink>
        </div>
      </div>
    </section>
  );
}

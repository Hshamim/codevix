import { hero } from "@/data/site";
import { BlockButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-accent py-16 text-white md:py-20">
      <span aria-hidden className="absolute -top-24 -left-24 size-72 rounded-full border-[40px] border-white/10" />
      <span aria-hidden className="absolute -right-20 -bottom-32 size-96 rounded-full border-[56px] border-black/10" />
      <Reveal className="relative container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="max-w-2xl text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.1] font-extrabold tracking-[-0.03em]">
          Looking for a reliable development partner?
        </h2>
        <BlockButton href={hero.primary.href} variant="light" className="shrink-0">
          {hero.primary.label}
        </BlockButton>
      </Reveal>
    </section>
  );
}

import { stats } from "@/data/site";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/SectionHeading";

export function CounterBand() {
  const projects = stats[1];
  return (
    <section className="border-b border-line bg-ink py-20 lg:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <Kicker tone="dark">Projects completed</Kicker>
          <p className="mt-3 text-[clamp(4.5rem,12vw,9rem)] leading-none font-extrabold tracking-[-0.05em] text-accent">
            <CountUp value={projects.value} suffix={projects.suffix} />
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:border-l lg:border-line lg:pl-12">
          <p className="text-lg leading-relaxed text-muted md:text-xl">
            Web apps, APIs and websites delivered for startups and businesses, built with Next.js, Vue.js and Laravel.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-6">
            {[stats[0], stats[2], stats[3]].map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="order-first text-3xl font-extrabold text-fg">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

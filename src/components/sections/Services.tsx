import Link from "next/link";
import {
  Check,
  Globe,
  LayoutDashboard,
  Rocket,
  ShoppingCart,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";

const icons: Record<string, LucideIcon> = {
  rocket: Rocket,
  dashboard: LayoutDashboard,
  cart: ShoppingCart,
  sparkles: Sparkles,
  globe: Globe,
  wrench: Wrench,
};

export function Services() {
  return (
    <section id="services" className="section-y scroll-mt-24 bg-paper pt-0 text-ink-soft lg:pt-0">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>What we build</Kicker>
          <h2 className={`mt-4 ${headingCls}`}>Solutions for real business problems</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-dark">
            Whether you’re launching something new or fixing what you already have, here’s how we can help.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.08} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-md border border-cream-line bg-paper p-8 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgb(0_0_0/0.3)]">
                  <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="grid size-14 place-items-center rounded-md bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="size-7" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-xl font-extrabold tracking-tight">{service.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-dark">{service.description}</p>
                  <ul className="mt-6 space-y-2 text-sm font-semibold">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5">
                        <Check className="size-4 text-accent" strokeWidth={3} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-cream-line pt-4 text-xs font-semibold tracking-wide text-muted-dark uppercase">
                    Built with {service.stack}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <p className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-md bg-cream py-2 pr-2 pl-6 text-sm text-muted-dark">
            <span>
              Not sure which fits? <strong className="text-ink-soft">Tell us the problem</strong> and we’ll suggest the right solution.
            </span>
            <Link
              href="/contact"
              className="rounded-md bg-accent px-5 py-2.5 font-bold text-white transition-colors hover:bg-accent-hover"
            >
              Get a free quote
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

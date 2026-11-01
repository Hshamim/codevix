import { tools } from "@/data/site";

/** Stands in for the reference's client-logo row: the stack, shown as quiet wordmarks. */
export function TechStrip() {
  const loop = [...tools, ...tools];
  return (
    <section aria-label="Tech stack" className="border-y border-cream-line bg-paper py-10">
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
          {loop.map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= tools.length}
              className="px-10 text-2xl font-extrabold tracking-tight whitespace-nowrap text-ink-soft/50 transition-colors hover:text-accent"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

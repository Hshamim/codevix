import { tools } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";

export function TechStack() {
  return (
    <section className="section-y bg-paper text-ink-soft">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Kicker>Our tech stack</Kicker>
          <h2 className={`mt-4 ${headingCls}`}>Proven tools, chosen for each project</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-dark">
            Modern, well-supported technology, so your product is fast today and easy to grow tomorrow.
          </p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {tools.map((tool, i) => (
            <Reveal
              as="li"
              key={tool}
              delay={(i % 8) * 0.04}
              className="rounded-md border-b-2 border-transparent bg-cream px-3 py-5 text-center text-sm font-bold transition-colors hover:border-accent hover:text-accent"
            >
              {tool}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

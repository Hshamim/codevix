import Image from "next/image";
import type { CoverVariant, Project } from "@/data/site";

type ProjectCoverProps = {
  project: Project;
  /** Override the mockup layout, e.g. for gallery images */
  variant?: CoverVariant;
  priority?: boolean;
  sizes?: string;
};

/**
 * Shows the project image if one is set (and no mockup variant is forced), otherwise a designed
 * mockup in the project's color. Sizes use container units (cqw)
 * so the mockup scales with the card.
 */
export function ProjectCover({ project, variant, priority, sizes = "(min-width: 768px) 50vw, 100vw" }: ProjectCoverProps) {
  if (project.image && !variant) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={sizes}
        preload={priority}
        className="object-cover"
      />
    );
  }

  const c = project.color;
  const kind = variant ?? project.variant;

  return (
    <div
      className="@container relative size-full overflow-hidden"
      style={{ background: `radial-gradient(130% 120% at 0% 0%, ${c} 0%, ${c}b3 40%, #0b0d12 100%)` }}
      role="img"
      aria-label={`${project.title} preview`}
    >
      <div className="absolute inset-0 bg-grid opacity-60" />
      {kind === "mobile" ? <Phones color={c} /> : <Browser color={c} kind={kind} />}
    </div>
  );
}

function Browser({ color, kind }: { color: string; kind: CoverVariant }) {
  return (
    <div className="absolute inset-x-[9%] top-[13%] -bottom-[4%] overflow-hidden rounded-t-[2cqw] border border-white/10 bg-ink/90 shadow-2xl shadow-black/50">
      <div className="flex items-center gap-[0.8cqw] border-b border-white/10 px-[2cqw] py-[1.6cqw]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-[1.1cqw] rounded-full bg-white/20" />
        ))}
        <span className="mx-auto h-[1.8cqw] w-[30%] rounded-full bg-white/10" />
      </div>
      <div className="h-full p-[3cqw]">
        {kind === "dashboard" && <Dashboard color={color} />}
        {kind === "landing" && <Landing color={color} />}
        {kind === "commerce" && <Commerce color={color} />}
      </div>
    </div>
  );
}

const bar = "rounded-full bg-white/15";

function Dashboard({ color }: { color: string }) {
  const heights = [40, 65, 50, 80, 60, 92, 70, 85, 55, 75, 95, 68];
  return (
    <div className="grid h-full grid-cols-[1fr_4fr] gap-[3cqw]">
      <div className="space-y-[1.8cqw]">
        <span className="block h-[2.4cqw] w-[70%] rounded-full" style={{ background: color }} />
        {[80, 60, 70, 50, 65].map((w, i) => (
          <span key={i} className={`block h-[1.4cqw] ${bar}`} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="space-y-[2.4cqw]">
        <div className="grid grid-cols-3 gap-[2cqw]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-[1.2cqw] rounded-[1.4cqw] border border-white/10 bg-white/5 p-[1.8cqw]">
              <span className={`block h-[1.2cqw] w-1/2 ${bar}`} />
              <span className="block h-[2.6cqw] w-3/4 rounded-full bg-white/70" />
            </div>
          ))}
        </div>
        <div className="flex h-[22cqw] items-end gap-[1.2cqw] rounded-[1.4cqw] border border-white/10 bg-white/5 p-[2cqw]">
          {heights.map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-[0.6cqw]"
              style={{ height: `${h}%`, background: i === 10 ? color : "rgb(255 255 255 / 0.18)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Landing({ color }: { color: string }) {
  return (
    <div className="flex flex-col items-center pt-[3cqw] text-center">
      <span className="h-[2cqw] w-[18%] rounded-full border border-white/15 bg-white/5" />
      <span className="mt-[2.5cqw] h-[4.4cqw] w-[70%] rounded-full bg-white/85" />
      <span className="mt-[1.4cqw] h-[4.4cqw] w-[52%] rounded-full bg-white/85" />
      <span className={`mt-[2.5cqw] h-[1.4cqw] w-[44%] ${bar}`} />
      <div className="mt-[3cqw] flex gap-[1.5cqw]">
        <span className="h-[4cqw] w-[14cqw] rounded-full" style={{ background: color }} />
        <span className="h-[4cqw] w-[14cqw] rounded-full border border-white/20" />
      </div>
      <div className="mt-[4.5cqw] grid w-full grid-cols-3 gap-[2cqw]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-[1.2cqw] rounded-[1.4cqw] border border-white/10 bg-white/5 p-[2cqw] text-left">
            <span className="block size-[4cqw] rounded-[1cqw]" style={{ background: i === 0 ? color : "rgb(255 255 255 / 0.15)" }} />
            <span className="block h-[1.6cqw] w-3/4 rounded-full bg-white/60" />
            <span className={`block h-[1.2cqw] w-full ${bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Commerce({ color }: { color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="h-[3cqw] w-[30%] rounded-full bg-white/85" />
        <span className="h-[3cqw] w-[12%] rounded-full" style={{ background: color }} />
      </div>
      <div className="mt-[3cqw] grid grid-cols-3 gap-[2cqw]">
        {[1, 0.7, 0.45].map((o, i) => (
          <div key={i} className="space-y-[1.2cqw]">
            <div
              className="aspect-[4/5] rounded-[1.4cqw]"
              style={{ background: `linear-gradient(160deg, ${color}, transparent)`, opacity: o }}
            />
            <span className="block h-[1.6cqw] w-3/4 rounded-full bg-white/60" />
            <span className={`block h-[1.2cqw] w-1/3 ${bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Phones({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-[5cqw] pt-[10%]">
      {[0, 1].map((p) => (
        <div
          key={p}
          className={`aspect-[9/19] w-[26%] overflow-hidden rounded-[4cqw] border border-white/15 bg-ink/90 p-[2cqw] shadow-2xl shadow-black/50 ${
            p === 0 ? "translate-y-[12%]" : "-translate-y-[2%]"
          }`}
        >
          <span className="mx-auto mb-[3cqw] block h-[1.6cqw] w-1/3 rounded-full bg-white/15" />
          <div className="h-[22cqw] rounded-[2.4cqw]" style={{ background: `linear-gradient(160deg, ${color}, transparent)` }} />
          <span className="mt-[2.4cqw] block h-[2cqw] w-3/4 rounded-full bg-white/80" />
          <span className={`mt-[1.4cqw] block h-[1.2cqw] w-full ${bar}`} />
          <span className={`mt-[1cqw] block h-[1.2cqw] w-2/3 ${bar}`} />
          <div className="mt-[2.4cqw] space-y-[1.4cqw]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-[1.4cqw]">
                <span className="size-[4cqw] shrink-0 rounded-[1cqw] bg-white/10" />
                <span className={`h-[1.2cqw] flex-1 ${bar}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

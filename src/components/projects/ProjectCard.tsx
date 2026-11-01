import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/site";
import { ProjectCover } from "./ProjectCover";

export function ProjectCard({ project, priority }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-md bg-paper text-ink-soft shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-20px_rgb(0_0_0/0.3)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
          <ProjectCover project={project} priority={priority} sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw" />
        </div>
      </div>
      <div className="relative flex flex-1 flex-col p-6 pt-8">
        <span className="absolute -top-3.5 left-6 rounded-md bg-accent px-3 py-1.5 text-xs font-bold text-white">
          {project.category} · {project.year}
        </span>
        <h3 className="text-xl font-extrabold transition-colors group-hover:text-accent">{project.title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-muted-dark">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-cream px-2.5 py-1 text-xs font-semibold text-muted-dark">
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 border-t border-cream-line pt-5 text-sm font-bold tracking-wide uppercase">
          View project
          <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

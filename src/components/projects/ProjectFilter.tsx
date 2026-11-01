"use client";

import { useState } from "react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { projectCategories, projects } from "@/data/site";
import { ProjectCard } from "./ProjectCard";

const loadLayoutFeatures = () => import("./layoutFeatures").then((mod) => mod.default);

export function ProjectFilter() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="mt-10 mb-14 flex flex-wrap justify-center gap-3" role="group" aria-label="Filter projects">
        {projectCategories.map((cat) => {
          const count = cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;
          const isActive = cat === active;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={`rounded-md px-5 py-3 text-sm font-bold transition-colors duration-300 ${
                isActive ? "bg-accent text-white" : "bg-paper text-ink-soft shadow-sm hover:text-accent"
              }`}
            >
              {cat} <span className="ml-1 text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <LazyMotion features={loadLayoutFeatures} strict>
        <m.div layout className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <m.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} priority={i < 3} />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </LazyMotion>
    </>
  );
}

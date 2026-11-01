import type { MetadataRoute } from "next";
import { projects, site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    priority: path === "" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({ url: `${site.url}/projects/${p.slug}`, priority: 0.6 }));
  return [...pages, ...work];
}

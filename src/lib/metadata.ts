import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * Per-page metadata with a canonical URL and matching social previews.
 * Next.js merges metadata shallowly, so each page must set its full `openGraph`/`twitter`
 * objects, otherwise it inherits the home page's title and URL when shared.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** Social links that point to a real profile (not a bare placeholder like "https://github.com/"). */
export const realProfiles = site.socials.map((s) => s.href).filter((href) => new URL(href).pathname.length > 1);

/** Schema.org structured data describing the agency, rendered once in the root layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: "Worldwide",
    knowsAbout: ["Laravel", "Next.js", "Vue.js", "SaaS development", "E-commerce", "AI chatbots", "Web development"],
    ...(realProfiles.length > 0 && { sameAs: realProfiles }),
  };
}

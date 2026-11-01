import Link from "next/link";
import { ArrowRight, Mail, MapPin, Send } from "lucide-react";
import { nav, projects, site, whatsappHref } from "@/data/site";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  return (
    <footer className="bg-ink">
      {/* Top row: quick contact, in place of the reference's newsletter */}
      <div className="border-b border-line">
        <div className="container-x flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-white">
              <Send className="size-6" />
            </span>
            <p className="text-xl leading-snug font-extrabold">
              Have a project in mind?
              <br />
              <span className="text-muted">Let’s build it together.</span>
            </p>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="group flex w-full items-center justify-between gap-6 rounded-md bg-card px-6 py-4 font-semibold text-muted transition-colors hover:text-fg md:w-auto md:min-w-96"
          >
            {site.email}
            <ArrowRight className="size-5 text-accent transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="container-x grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 sm:gap-y-12 md:py-16 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm leading-relaxed text-muted">{site.description}</p>
          <ul className="mt-6 flex gap-3">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full bg-card text-fg transition-colors hover:bg-accent hover:text-white"
                >
                  <SocialIcon label={s.label} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Explore" className="lg:col-span-2">
          <ul className="grid grid-cols-2 gap-3 sm:block sm:space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </FooterColumn>

        <FooterColumn title="Recent work" className="sm:order-last sm:col-span-2 lg:order-none lg:col-span-3">
          {/* Titled cards on small screens; compact thumbnails (title on hover, for mouse users) in the desktop column */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:max-w-64 lg:gap-2">
            {projects.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={p.title}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-md lg:aspect-square"
                >
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                    <ProjectCover project={p} sizes="(min-width: 1024px) 80px, (min-width: 640px) 33vw, 50vw" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 transition-opacity duration-300 lg:p-2 lg:pointer-fine:opacity-0 lg:pointer-fine:group-hover:opacity-100 lg:pointer-fine:group-focus-visible:opacity-100">
                    <span className="text-[11px] font-semibold tracking-wider text-white/75 uppercase lg:hidden">
                      {p.category}
                    </span>
                    <span className="truncate text-sm font-bold text-white lg:text-[11px]">{p.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/projects"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-accent"
          >
            View all work
            <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
          </Link>
        </FooterColumn>

        <FooterColumn title="Contact" className="lg:col-span-3">
          <ul className="space-y-4 text-muted">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              {site.location}
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all transition-colors hover:text-fg">
                <Mail className="mt-0.5 size-4 shrink-0 text-accent" />
                {site.email}
              </a>
            </li>
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition-colors hover:text-fg">
                <SocialIcon label="WhatsApp" className="mt-0.5 size-4 shrink-0 text-accent" />
                {site.phone}
              </a>
            </li>
          </ul>
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted sm:flex-row">
          <p>
            © {site.year} {site.name}. All rights reserved.
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="text-lg font-extrabold">{title}</p>
      <span className="mt-2 mb-6 block h-0.5 w-8 bg-accent" />
      {children}
    </div>
  );
}

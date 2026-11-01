"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { ChevronRight, Mail, MapPin, Menu, X } from "lucide-react";
import { hero, nav, site, whatsappHref } from "@/data/site";
import { BlockButton } from "@/components/ui/Button";
import { SocialIcon } from "./SocialIcon";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the page it was opened on, so any navigation
  // (menu link, logo, browser back) closes it automatically.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (value: boolean) => setOpenedOn(value ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top info bar: collapses once the page scrolls */}
        <div
          className={`hidden transition-[grid-template-rows] duration-500 md:grid ${
            scrolled || open ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-b border-fg/10 bg-black/70 text-[13px] text-muted">
              <div className="container-x flex h-11 items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-fg">
                    <Mail className="size-3.5 text-accent" />
                    {site.email}
                  </a>
                  <span className="hidden items-center gap-2 lg:inline-flex">
                    <MapPin className="size-3.5 text-accent" />
                    {site.location}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  {site.available && (
                    <span className="inline-flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      Available for new projects
                    </span>
                  )}
                  <ul className="flex items-center gap-2 border-l border-fg/10 pl-6">
                    {site.socials.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="grid size-8 place-items-center rounded-full bg-fg/10 text-fg transition-colors hover:bg-accent hover:text-white"
                        >
                          <SocialIcon label={s.label} className="size-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={`border-b transition-all duration-500 ${
            scrolled || open ? "border-line/70 bg-ink/85 backdrop-blur-xl" : "border-fg/15"
          }`}
        >
          <div
            className={`container-x flex items-center justify-between gap-6 transition-[height] duration-500 ${
              scrolled ? "h-20" : "h-20 md:h-24"
            }`}
          >
            <Logo />

            <nav aria-label="Main" className="hidden md:block">
              <ul className="flex items-center gap-8 lg:gap-11">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="relative">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`block py-2 text-[15px] font-semibold transition-colors ${
                          active ? "text-fg" : "text-fg/75 hover:text-fg"
                        }`}
                      >
                        {item.label}
                      </Link>
                      {/* CSS rather than a shared-layout animation, which would need motion's ~45 KiB layout engine on every page */}
                      <span
                        aria-hidden
                        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />

                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden items-center gap-3.5 md:flex lg:border-l lg:border-fg/15 lg:pl-8"
              >
                <span className="grid size-12 place-items-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:scale-110">
                  <SocialIcon label="WhatsApp" className="size-5" />
                </span>
                <span className="hidden leading-tight lg:block">
                  <span className="block text-xs text-muted">WhatsApp us</span>
                  <span className="block text-[15px] font-bold transition-colors group-hover:text-accent">{site.phone}</span>
                </span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid size-11 place-items-center rounded-full border border-fg/20 md:hidden"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-ink px-6 pt-28 pb-10 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line border-y border-line">
                {nav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between py-5 text-2xl font-extrabold tracking-tight ${
                          active ? "text-accent" : "text-fg"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`h-6 w-1 rounded-full ${active ? "bg-accent" : "bg-transparent"}`} aria-hidden />
                          {item.label}
                        </span>
                        <ChevronRight className={`size-5 ${active ? "text-accent" : "text-muted"}`} />
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
            </nav>

            <BlockButton href={hero.primary.href} className="mt-8 justify-center">
              {hero.primary.label}
            </BlockButton>

            <div className="mt-auto space-y-5 pt-10">
              <ul className="space-y-3 text-muted">
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-fg">
                    <Mail className="size-4 text-accent" />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition-colors hover:text-fg">
                    <SocialIcon label="WhatsApp" className="size-4 text-accent" />
                    {site.phone}
                  </a>
                </li>
              </ul>
              <ul className="flex gap-3">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full bg-card text-fg transition-colors hover:bg-accent hover:text-white"
                    >
                      <SocialIcon label={s.label} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

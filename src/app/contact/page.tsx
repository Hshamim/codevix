import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Clock, Mail, MapPin } from "lucide-react";
import { photos, site, whatsappHref } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SocialIcon } from "@/components/layout/SocialIcon";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get a free quote from ${site.name} for your web app, SaaS, online store or AI project. We reply within 24 hours.`,
  path: "/contact",
});

const WhatsAppIcon = ({ className }: { className?: string }) => <SocialIcon label="WhatsApp" className={className} />;

export default function ContactPage() {
  const details = [
    { icon: Mail, label: "Email us", value: site.email, href: `mailto:${site.email}` },
    { icon: WhatsAppIcon, label: "WhatsApp us", value: site.phone, href: whatsappHref, external: true },
    { icon: MapPin, label: "Based in", value: site.location },
    { icon: Clock, label: "Response time", value: "Within 24 hours" },
  ];

  return (
    <>
      <PageHero
        crumb="Contact"
        title="Let’s build something great together"
        description="Tell us about your project and we’ll get back to you with ideas, a timeline and a quote."
        image={photos.bannerContact}
      />

      {/* Contact details */}
      <section className="bg-paper pt-20 text-ink-soft lg:pt-28">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d, i) => (
            <Reveal key={d.label} delay={i * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-md bg-paper p-8 text-center shadow-[0_10px_40px_-20px_rgb(0_0_0/0.25)] transition-transform duration-500 hover:-translate-y-1.5">
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-white ring-8 ring-accent/12">
                  <d.icon className="size-6" />
                </span>
                <p className="mt-6 text-sm text-muted-dark">{d.label}</p>
                {d.href ? (
                  <a
                    href={d.href}
                    {...("external" in d ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-1 block font-extrabold break-all transition-colors hover:text-accent"
                  >
                    {d.value}
                  </a>
                ) : (
                  <p className="mt-1 font-extrabold">{d.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="section-y bg-paper text-ink-soft">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Kicker>Get in touch</Kicker>
            <h2 className={`mt-4 ${headingCls}`}>Have a project in mind?</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-dark">
              Whether it’s a new web app, a Laravel API, an AI feature or help with an existing project, we’d love to hear
              about it.
            </p>
            <div className="mt-10 rounded-md bg-ink p-8 text-fg">
              <p className="text-lg font-extrabold">Find us online</p>
              <ul className="mt-5 flex gap-3">
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid size-11 place-items-center rounded-full bg-card transition-colors hover:bg-accent hover:text-white"
                    >
                      <SocialIcon label={s.label} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
              {site.available && (
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  Available for new projects
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Mail, MessageSquare, Phone, Tag, User } from "lucide-react";
import { photos, site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker, headingCls } from "@/components/ui/SectionHeading";
import { Field } from "@/components/ui/Field";
import { BudgetPicker } from "@/components/ui/BudgetPicker";

/** Same approach as the contact page form: opens the visitor's email app with the message filled in. */
export function ContactSection() {
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Budget: ${budget ?? "Not specified"}`,
      "",
      String(data.get("message")),
    ].join("\n");
    const subject = String(data.get("subject") || `New enquiry from ${data.get("name")}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="relative bg-paper text-ink-soft">
      <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-0 lg:py-0">
        <Reveal className="lg:py-28 lg:pr-16">
          <Kicker>Contact us</Kicker>
          <h2 className={`mt-4 ${headingCls}`}>Get in touch with us</h2>
          <form onSubmit={handleSubmit} className="mt-10 grid gap-5 sm:grid-cols-2">
            <Field tone="cream" label="Your name" icon={User} name="name" required autoComplete="name" placeholder="John Smith" />
            <Field tone="cream" label="Email address" icon={Mail} name="email" type="email" required autoComplete="email" placeholder="john@company.com" />
            <Field tone="cream" label="Phone" optional icon={Phone} name="phone" type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" />
            <Field tone="cream" label="Subject" optional icon={Tag} name="subject" placeholder="New web app" />
            <BudgetPicker tone="cream" value={budget} onChange={setBudget} className="sm:col-span-2" />
            <Field tone="cream" multiline label="Message" icon={MessageSquare} name="message" required placeholder="Tell us about your project" className="sm:col-span-2" />
            <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
              <button
                type="submit"
                className="group relative overflow-hidden rounded-md bg-accent px-10 py-4 text-[15px] font-bold text-white"
              >
                <span className="absolute inset-y-0 left-0 w-5 bg-black/20 transition-all duration-300 group-hover:w-full" />
                <span className="relative">Submit message</span>
              </button>
              {sent && (
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600" role="status">
                  <Check className="size-4" /> Your email app should open. Just hit send!
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>

      {/* Photo bleeds to the right edge on large screens */}
      <div className="relative h-80 sm:h-[28rem] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-1/2">
        <Image src={photos.contact} alt="Clients meeting around a laptop" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      </div>
    </section>
  );
}

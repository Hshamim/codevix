"use client";

import { useState } from "react";
import { Check, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { services, site } from "@/data/site";
import { Field } from "@/components/ui/Field";
import { BudgetPicker, Chip } from "@/components/ui/BudgetPicker";

/**
 * Opens the visitor's email app with the message filled in.
 * To send directly from the site instead, connect a service such as
 * Resend or Formspree in handleSubmit.
 */
export function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const toggle = (s: string) => setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Services: ${selected.join(", ") || "Not sure yet"}`,
      `Budget: ${budget ?? "Not specified"}`,
      "",
      String(data.get("message")),
    ].join("\n");
    const subject = `New project enquiry from ${data.get("name")}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border-t-4 border-accent bg-cream p-6 text-ink-soft sm:p-8 md:p-10">
      <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">Tell us about your project</h2>
      <p className="mt-2 text-muted-dark">Fill in the details below and we’ll reply within 24 hours.</p>

      <fieldset className="mt-8">
        <legend className="mb-3 text-sm font-bold">I’m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {services.map(({ title }) => (
            <Chip key={title} active={selected.includes(title)} onClick={() => toggle(title)}>
              {title}
            </Chip>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" icon={User} name="name" required autoComplete="name" placeholder="John Smith" />
        <Field
          label="Email address"
          icon={Mail}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="john@company.com"
        />
        <Field
          label="Phone"
          optional
          icon={Phone}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+880 1XXX-XXXXXX"
          className="sm:col-span-2"
        />
      </div>

      <BudgetPicker value={budget} onChange={setBudget} className="mt-6" />

      <Field
        multiline
        label="Message"
        icon={MessageSquare}
        name="message"
        required
        placeholder="Tell us about your goals, timeline and anything else we should know."
        className="mt-6"
      />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-md bg-accent px-10 py-4 text-[15px] font-bold text-white"
        >
          <span className="absolute inset-y-0 left-0 w-5 bg-black/20 transition-all duration-300 group-hover:w-full" />
          <span className="relative">Send message</span>
          <Send className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
        {sent && (
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600" role="status">
            <Check className="size-4" /> Your email app should open. Just hit send!
          </p>
        )}
      </div>
    </form>
  );
}

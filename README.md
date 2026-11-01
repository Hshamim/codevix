# Codevix

Website for Codevix, a web and software development agency. Built with Next.js 16, Tailwind CSS v4 and Motion.

## Run it

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Edit content

Almost everything lives in `src/data/site.ts`:

| What | Where in `site.ts` |
|---|---|
| Brand, contact details, socials, website URL | `site` |
| Home hero text, buttons, trust promises, background photos | `hero` |
| Services (also used in the hero chips and contact form) | `services` |
| Projects, images and the home "Work showcase" (`featured: true`) | `projects` |
| Numbers (years, projects, clients) | `stats` |
| FAQs, testimonials, process steps, tech stack | `faqs`, `testimonials`, `process`, `tools` |
| Section photos and page banners | `photos` |

Other places:

| What | Where |
|---|---|
| Colors (accent red, dark and light section colors) | `src/app/globals.css`, `@theme` block |
| Logo mark | `src/components/layout/Logo.tsx` and `src/app/icon.svg` (favicon) |
| Social share image | `src/app/opengraph-image.tsx` |
| Contact form budget ranges | `src/components/ui/BudgetPicker.tsx` |

Photos are Unsplash placeholders. To use your own, add files to `public/` and point the entry at them, e.g. `image: "/projects/lumen.jpg"`. Remote images must be allowed in `next.config.ts` (`images.remotePatterns`).

## Structure

```
src/
  app/                  pages: home, about, projects, projects/[slug], contact, 404
  components/
    home/               home-only sections (about, why us, showcase, FAQ...)
    sections/           sections shared across pages (hero, page banner, services, CTA...)
    layout/             navbar, footer, logo
    projects/           project card, cover, filter
    ui/                 buttons, form fields, budget picker, headings, animations
  data/site.ts          all content
```

## Contact forms

The forms open the visitor's email app with the message filled in, so they work with no setup.
To send directly from the site, connect a service such as Resend or Formspree in
`src/components/ContactForm.tsx` and `src/components/home/ContactSection.tsx`.

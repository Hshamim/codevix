// All site content lives here. Replace the placeholder text with your own.

/** Builds an Unsplash image URL. Swap any of these for your own files in /public. */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  /** Brand shown in the logo */
  brand: "codeshikor",
  /** Name used in page titles, copyright and descriptions */
  name: "Codeshikor",
  role: "Web & Software Development Agency",
  location: "Bagha, Rajshahi, Bangladesh",
  /** Structured address for search engines (country is the ISO code) */
  address: { locality: "Bagha", region: "Rajshahi", country: "BD" },
  email: "hello@alexrivera.dev",
  phone: "+880 1785 424661",
  /** Same number for WhatsApp: country code and digits only, as wa.me links need */
  whatsapp: "8801785424661",
  available: true,
  year: 2026,
  /** Live domain: used for canonical URLs, the sitemap, robots.txt and social previews */
  url: "https://alexrivera.dev",
  description:
    "Codeshikor is a web development agency building websites, SaaS products and AI tools with Next.js, Vue.js and Laravel for startups and growing businesses.",
  socials: [
    { label: "GitHub", href: "https://github.com/Hshamim" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shamim-hosen-254697122/" },
    { label: "X", href: "https://x.com/Codeshikhofw2o" },
  ],
} as const;

/** Opens a WhatsApp chat with a ready-to-send first message. Calling Bangladesh costs clients abroad; WhatsApp doesn't. */
export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I'd like a quote for a project.`)}`;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const stats = [
  { value: 4, suffix: "+", label: "Years of experience" },
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 25, suffix: "+", label: "Happy clients" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

// What clients hire for, in their words. Order follows demand: SaaS/MVPs and business systems
// (booking, CRM, portals, dashboards) first, then e-commerce, AI, websites, and rescue/maintenance.
export const services = [
  {
    title: "SaaS & MVP development",
    short: "SaaS & MVPs",
    icon: "rocket",
    description:
      "Turn your idea into a working product with user accounts, subscriptions and an admin panel, ready to launch and grow.",
    items: ["User accounts & roles", "Stripe subscriptions", "Admin dashboard"],
    stack: "Laravel · Next.js",
  },
  {
    title: "Business web apps",
    short: "Booking & CRM systems",
    icon: "dashboard",
    description:
      "Replace spreadsheets and manual work with booking systems, CRMs, client portals and dashboards built around how you work.",
    items: ["Booking & scheduling", "CRM & client portals", "Reports & dashboards"],
    stack: "Laravel · Vue.js",
  },
  {
    title: "E-commerce stores",
    short: "Online stores",
    icon: "cart",
    description:
      "Custom online stores with secure payments, inventory and order management that turn visitors into customers.",
    items: ["Custom checkout", "Payments & invoicing", "Inventory & orders"],
    stack: "Laravel · Next.js",
  },
  {
    title: "AI chatbots & automation",
    short: "AI chatbots & automation",
    icon: "sparkles",
    description:
      "AI that answers customer questions, searches your content and automates repetitive tasks, so your team saves hours every week.",
    items: ["AI chat assistants", "Smart search", "Workflow automation"],
    stack: "OpenAI / Claude APIs · Laravel",
  },
  {
    title: "Business websites",
    short: "Business websites",
    icon: "globe",
    description:
      "Fast, SEO-ready websites that rank on Google, convert visitors into enquiries and are easy for your team to update.",
    items: ["SEO-ready pages", "Easy-to-edit CMS", "90+ PageSpeed score"],
    stack: "Next.js",
  },
  {
    title: "Fix, upgrade & maintain",
    short: "Fix & upgrade apps",
    icon: "wrench",
    description:
      "Take over an existing Laravel or Vue project: fix bugs, speed it up, upgrade old versions and keep it secure.",
    items: ["Bug fixes & rescue", "Version upgrades", "Monthly maintenance"],
    stack: "Laravel · Vue.js",
  },
];

export const process = [
  {
    title: "Discover",
    description: "We talk goals, users and features, then agree on scope and timeline.",
  },
  {
    title: "Plan",
    description: "Database, API and screens are mapped out up front, so the build has no surprises.",
  },
  {
    title: "Build",
    description: "Laravel backend and Next.js or Vue front end, built in short, AI-assisted iterations.",
  },
  {
    title: "Launch",
    description: "Testing, deployment and handover, plus support to keep things running smoothly.",
  },
];


export const tools = [
  "Next.js",
  "Vue.js",
  "Nuxt",
  "React",
  "Laravel",
  "PHP",
  "TypeScript",
  "Tailwind",
  "MySQL",
  "Redis",
  "Docker",
  "Git",
  "Claude",
  "ChatGPT",
  "Cursor",
  "Vercel",
];

export const testimonials = [
  {
    quote:
      "Codeshikor turned a vague idea into a web app our customers genuinely love. Sign-ups doubled within the first month of launch.",
    name: "Sarah Chen",
    title: "Founder, Lumen Health",
  },
  {
    quote:
      "A rock-solid Laravel backend and a front end that is incredibly fast. Codeshikor shipped in weeks what we had planned for months.",
    name: "Marcus Webb",
    title: "CTO, Fieldstack",
  },
  {
    quote:
      "Clear communication, on time, and the final result exceeded what we imagined. We already have the next project booked.",
    name: "Priya Nair",
    title: "Marketing Lead, Orbit Coffee",
  },
];

// Home hero. The message stays fixed (rotating text gets missed, see NN/g on carousels);
// only the background photos rotate. Swap the images for your own.
export const hero = {
  title: ["Web apps, SaaS & AI tools", "that grow your business"],
  text: "From booking systems and online stores to AI chatbots, we plan, build and launch it for you, with weekly updates and code you fully own.",
  primary: { label: "Get a free quote", href: "/contact" },
  secondary: { label: "See our work", href: "/projects" },
  /** Shown in the trust row under the buttons, after the client and project counts */
  promises: ["Replies within 24 hours", "Overlaps UK & EU working hours"],
  images: [
    unsplash("1519389950473-47ba0277781c", 2000),
    unsplash("1498050108023-c5249f4df085", 2000),
    unsplash("1522071820081-009f0129c71c", 2000),
  ],
};

export type CoverVariant = "dashboard" | "landing" | "commerce" | "mobile";

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  summary: string;
  tags: string[];
  color: string;
  variant: CoverVariant;
  /** Main image: a screenshot or photo, e.g. "/projects/lumen.jpg" in /public. Falls back to a drawn mockup. */
  image?: string;
  /** Extra images shown on the project page */
  gallery?: string[];
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  /** Shown in the home page "Work showcase" strip */
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "lumen-health",
    title: "Lumen Health",
    category: "Web App",
    year: "2026",
    client: "Lumen Health",
    role: "Full-Stack Development",
    summary: "A patient dashboard with a Laravel API and Next.js front end that makes health tracking simple.",
    tags: ["Next.js", "Laravel API", "Dashboard"],
    color: "#2f6bff",
    variant: "dashboard",
    image: unsplash("1576091160550-2173dba999ef"),
    gallery: [unsplash("1532938911079-1b06ac7ceec7"), unsplash("1505751172876-fa1923c5c528")],
    challenge:
      "Patients were overwhelmed by dense charts and medical jargon, and most stopped using the app after the first week.",
    solution:
      "A new Laravel API and Next.js dashboard built around one daily summary, with AI-generated plain-language insights.",
    results: [
      { value: "2.1×", label: "Weekly active users" },
      { value: "-38%", label: "Support tickets" },
      { value: "4.8", label: "App store rating" },
    ],
    featured: true,
  },
  {
    slug: "orbit-coffee",
    title: "Orbit Coffee",
    category: "E-commerce",
    year: "2025",
    client: "Orbit Coffee Roasters",
    role: "Full-Stack Development",
    summary: "A custom online store and subscription system built with Vue.js and Laravel.",
    tags: ["Vue.js", "Laravel", "E-commerce"],
    color: "#c2410c",
    variant: "commerce",
    image: unsplash("1495474472287-4d71bcdd2085"),
    gallery: [unsplash("1509042239860-f550ce710b93"), unsplash("1563013544-824ae1b704d3")],
    challenge:
      "A strong local brand stuck on a generic template store that could not handle subscriptions.",
    solution:
      "A Vue.js storefront on a Laravel backend, with a subscription builder, Stripe payments and an admin panel.",
    results: [
      { value: "+64%", label: "Conversion rate" },
      { value: "3.2k", label: "New subscribers" },
      { value: "1.1s", label: "Page load time" },
    ],
    featured: true,
  },
  {
    slug: "fieldstack",
    title: "Fieldstack",
    category: "SaaS Website",
    year: "2025",
    client: "Fieldstack Inc.",
    role: "Frontend Development",
    summary: "Marketing site for a field-service platform, with modular CMS pages and top performance.",
    tags: ["Next.js", "CMS", "SEO"],
    color: "#0f9d76",
    variant: "landing",
    image: unsplash("1504307651254-35680f356dfd"),
    gallery: [unsplash("1581092160562-40aa08e78837"), unsplash("1559028012-481c04fa702d")],
    challenge:
      "The old site was slow, and the marketing team needed developers for every change.",
    solution:
      "A Next.js site with a block-based CMS, so marketing can build and publish pages on their own.",
    results: [
      { value: "+45%", label: "Demo requests" },
      { value: "98", label: "Lighthouse score" },
      { value: "0", label: "Dev tickets for new pages" },
    ],
    featured: true,
  },
  {
    slug: "wander-app",
    title: "Wander",
    category: "AI Web App",
    year: "2024",
    client: "Wander Travel",
    role: "Full-Stack & AI Development",
    summary: "An AI travel planner that turns saved places into day-by-day itineraries.",
    tags: ["AI", "Nuxt", "Laravel"],
    color: "#7c3aed",
    variant: "mobile",
    image: unsplash("1469854523086-cc02fe5d8800"),
    gallery: [unsplash("1488646953014-85cb44e25828"), unsplash("1476514525535-07fb3b4ae5f1")],
    challenge:
      "Travellers saved dozens of places across apps but still planned trips in messy notes and spreadsheets.",
    solution:
      "A Nuxt app on a Laravel API that uses an LLM to generate itineraries, with a map-first planner and offline access.",
    results: [
      { value: "50k", label: "Users in 3 months" },
      { value: "72%", label: "Day-7 retention" },
      { value: "4.9", label: "Average rating" },
    ],
    featured: true,
  },
  {
    slug: "kinfolk-studio",
    title: "Kinfolk Studio",
    category: "Portfolio Website",
    year: "2024",
    client: "Kinfolk Architecture",
    role: "Full-Stack Development",
    summary: "An image-led portfolio for an architecture studio, with a simple Laravel-powered CMS.",
    tags: ["Vue.js", "Laravel", "CMS"],
    color: "#a16207",
    variant: "landing",
    image: unsplash("1600585154340-be6161a56a0c"),
    gallery: [unsplash("1487958449943-2429e8be8625"), unsplash("1486406146926-c627a92ad1ab")],
    challenge: "Beautiful work hidden behind a slow, outdated site that was hard to update.",
    solution: "A fast Vue.js front end with optimised images and a simple Laravel project editor.",
    results: [
      { value: "3×", label: "Time on site" },
      { value: "+80%", label: "Project enquiries" },
      { value: "95", label: "Lighthouse score" },
    ],
    featured: false,
  },
  {
    slug: "pulse-analytics",
    title: "Pulse Analytics",
    category: "Web App",
    year: "2023",
    client: "Pulse Labs",
    role: "Full-Stack Development",
    summary: "An analytics dashboard with a Laravel backend and reusable Vue.js components.",
    tags: ["Laravel", "Vue.js", "Dashboard"],
    color: "#db2777",
    variant: "dashboard",
    image: unsplash("1460925895917-afdab827c52f"),
    gallery: [unsplash("1551288049-bebda4e38f71"), unsplash("1504868584819-f8e8b4b6d7e3")],
    challenge: "Reports took minutes to load, and every team was rebuilding the same UI.",
    solution: "Laravel queues and caching for fast reports, plus a shared Vue.js component library.",
    results: [
      { value: "10×", label: "Faster reports" },
      { value: "-40%", label: "UI build time" },
      { value: "4", label: "Teams adopted" },
    ],
    featured: false,
  },
];


export const projectCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

// Home page photos (Unsplash placeholders). Replace with your own, ideally a photo of you for `about`.

export const photos = {
  about: unsplash("1551434678-e076c223a692"),
  aboutSmall: unsplash("1517694712202-14dd9538aa97", 700),
  // Fills half the screen on desktop, so it needs a large source to stay sharp on high-DPI displays
  why: unsplash("1531482615713-2afd69097998", 2400),
  workA: unsplash("1580894894513-541e068a3e2b", 700),
  workB: unsplash("1555066931-4365d14bab8c", 700),
  workC: unsplash("1573164713988-8665fc963095", 700),
  faq: unsplash("1600880292203-757bb62b4baf", 900),
  contact: unsplash("1522202176988-66273c2fd55f", 1200),
  team: unsplash("1580894894513-541e068a3e2b", 900),
  teamSmall: unsplash("1531482615713-2afd69097998", 700),
  // Inner-page banners (shown under a dark overlay)
  banner: unsplash("1504384308090-c894fdcc538d", 2000),
  bannerWork: unsplash("1555066931-4365d14bab8c", 2000),
  bannerContact: unsplash("1517694712202-14dd9538aa97", 2000),
};

export const aboutPoints = [
  "Next.js and Vue.js front ends that load fast",
  "Laravel backends and APIs built to scale",
  "AI-driven workflow for faster delivery",
];

export const highlights = [
  {
    title: "Clean, reliable code",
    description: "Well-structured Laravel and TypeScript that is tested, secure and easy to maintain.",
  },
  {
    title: "Fast delivery with AI",
    description: "AI tools speed up planning, coding and testing, so you get working software sooner.",
  },
  {
    title: "One team, full stack",
    description: "Database, API and interface built by one team, so nothing gets lost between handoffs.",
  },
];

export const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Web apps, SaaS products, admin dashboards, APIs and business websites. Most are built with Next.js or Vue.js on the front end and Laravel on the back end.",
  },
  {
    q: "How do you use AI in your work?",
    a: "We use AI tools to plan, write and test code faster, and we build AI features like chat, smart search and automation into products. Every line is still reviewed by our developers.",
  },
  {
    q: "How long does a project take?",
    a: "A business website usually takes 2–4 weeks. A web app or SaaS MVP is typically 6–12 weeks, depending on features.",
  },
  {
    q: "Can you work on an existing Laravel or Vue project?",
    a: "Yes. We regularly join existing codebases to add features, fix bugs, improve performance or upgrade to newer versions.",
  },
  {
    q: "How do we communicate across time zones?",
    a: "We’re based in Bangladesh (UTC+6), so our working day overlaps the UK and EU afternoon, and we make time for US calls when needed. You get a written progress update every week and a reply to messages within 24 hours.",
  },
  {
    q: "Who owns the code and the website?",
    a: "You do. The code lives in your own GitHub repository and the site runs on your own hosting accounts from day one, so you are never locked in.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. We offer monthly maintenance for updates, monitoring, backups and small improvements.",
  },
];

export const scores = [
  { value: 95, label: "On-time delivery" },
  { value: 98, label: "Client satisfaction" },
];

// Generates the social media banners and avatar in this folder.
// Run from the project root: node brand/generate.mjs [name filter, e.g. facebook]
import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(join(process.cwd(), "package.json"));
const { createElement: h } = require("react");
const { ImageResponse } = require("next/og");

const fontDir = join(process.cwd(), "node_modules/@fontsource/manrope/files");
const font = (w) => readFile(join(fontDir, `manrope-latin-${w}-normal.woff`));
const fonts = [
  { name: "Manrope", data: await font(500), weight: 500, style: "normal" },
  { name: "Manrope", data: await font(700), weight: 700, style: "normal" },
  { name: "Manrope", data: await font(800), weight: 800, style: "normal" },
];

// Brand tokens, matching src/app/globals.css
const ink = "#0b0d12";
const fg = "#f4f5f7";
const muted = "#9aa1ae";
const soft = "#d5d9e0"; // supporting text on banners: lighter than muted so it reads at thumbnail size
const accent = "#dc2f28";

const copy = {
  kicker: "Web & Software Development Agency",
  headline: ["Web apps, SaaS & AI tools", "that grow your business."],
  chips: ["SaaS & MVPs", "Booking & CRM", "Online stores", "AI automation"],
  promise: "Weekly updates · Code you own · Replies within 24h",
};

// "Stack C": a bold C sliced into three layers (front end, API, data). Same drawing as src/components/layout/Logo.tsx.
// The slices are cuts in the tile colour, so the glyph always sits on an accent background.
const glyph = [
  h("path", { d: "M29.3 12.9A10.6 10.6 0 1 0 29.3 27.1", fill: "none", stroke: "#fff", strokeWidth: 6.2, strokeLinecap: "round" }),
  h("path", { d: "M0 16.5h40v2H0zM0 21.5h40v2H0z", fill: accent }),
];
const mark = (size) => h("svg", { width: size, height: size, viewBox: "0 0 40 40" }, h("rect", { width: 40, height: 40, rx: 9, fill: accent }), ...glyph);

const abs = (style, child) => h("div", { style: { position: "absolute", display: "flex", ...style } }, child);

/**
 * Dark backdrop shared by every banner: a red glow, two rings echoing the C of the logo, and a red bottom stripe.
 * `glow` is the glow's position; `ring` places the rings ({ size, ...left/right/top }) clear of the text.
 */
const backdrop = (W, H, { glow, ring: { size, ...ringPos } }) => [
  h("div", {
    style: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", background: `radial-gradient(circle at ${glow}, #5c1512 0%, ${ink} 60%)` },
  }),
  h(
    "svg",
    { width: size, height: size, viewBox: "0 0 40 40", style: { position: "absolute", ...ringPos } },
    h("circle", { cx: 20, cy: 20, r: 17.5, fill: "none", stroke: accent, strokeOpacity: 0.28, strokeWidth: 0.25 }),
    h("circle", { cx: 20, cy: 20, r: 12, fill: "none", stroke: accent, strokeOpacity: 0.16, strokeWidth: 0.25 }),
  ),
  h("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: Math.max(4, H * 0.012), display: "flex", background: accent } }),
];

const frame = (W, H, look, children) =>
  h(
    "div",
    { style: { width: W, height: H, display: "flex", position: "relative", overflow: "hidden", fontFamily: "Manrope", background: ink } },
    ...backdrop(W, H, look),
    ...children,
  );

/** Logo, divider and descriptor on one line: the brand anchor above the headline. */
const lockup = (s) =>
  h(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 18 * s } },
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 11 * s } },
      mark(38 * s),
      h("div", { style: { display: "flex", fontSize: 30 * s, fontWeight: 800, letterSpacing: -1.1 * s, color: fg } }, "codevix", h("span", { style: { color: accent } }, ".")),
    ),
    h("div", { style: { display: "flex", width: 1, height: 22 * s, background: "rgba(255,255,255,0.35)" } }),
    h("div", { style: { display: "flex", fontSize: 17 * s, fontWeight: 800, letterSpacing: 1.6 * s, textTransform: "uppercase", color: soft } }, copy.kicker),
  );

const chip = (label, s) =>
  h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10 * s,
        padding: `${10 * s}px ${18 * s}px`,
        borderRadius: 8 * s,
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        fontSize: 19 * s,
        fontWeight: 700,
        color: fg,
      },
    },
    h("div", { style: { width: 7 * s, height: 7 * s, borderRadius: 99, background: accent } }),
    label,
  );

/** Lockup, headline (second line in red), service chips and promise line. `align` is "start" or "center". */
const content = (s, { align = "start", brand = true, meta = true, singleLine = false } = {}) => {
  const items = align === "center" ? "center" : "flex-start";
  return h(
    "div",
    { style: { display: "flex", flexDirection: "column", alignItems: items, textAlign: align === "center" ? "center" : "left" } },
    brand && lockup(s),
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: singleLine ? "row" : "column",
          alignItems: items,
          gap: singleLine ? 16 * s : 0,
          marginTop: brand ? 22 * s : 0,
          fontSize: 64 * s,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: -2.4 * s,
          color: fg,
        },
      },
      h("span", null, copy.headline[0]),
      h("span", { style: { color: accent } }, copy.headline[1]),
    ),
    // One row on every banner; wrapping would leave a lone chip on a second line
    h("div", { style: { display: "flex", justifyContent: items, gap: 12 * s, marginTop: 30 * s } }, ...copy.chips.map((c) => chip(c, s))),
    meta &&
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 28 * s, marginTop: 28 * s, fontSize: 19 * s, fontWeight: 600, color: soft } },
        h("span", null, copy.promise),
        h(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 10 * s } },
          h("div", { style: { width: 9 * s, height: 9 * s, borderRadius: 99, background: "#34d399" } }),
          "Available for new projects",
        ),
      ),
  );
};

// Product mockups, so the first glance shows what we build. Sizes scale from the given width.
const surface = "#12151c";
const card = "rgba(255,255,255,0.05)";
const hair = "1px solid rgba(255,255,255,0.1)";
const bar = (w, k, o = 0.15, hgt = 8) => h("div", { style: { width: w * k, height: hgt * k, borderRadius: 99, background: `rgba(255,255,255,${o})` } });
const txt = (k, size, weight, color, value) =>
  h("div", { style: { display: "flex", flexShrink: 0, fontSize: size * k, lineHeight: 1.25, fontWeight: weight, color } }, value);

const dashboard = (w) => {
  const k = w / 600;
  const bars = [40, 62, 48, 78, 58, 90, 66, 84, 52, 72, 96, 70];
  const stats = [
    ["Revenue", "$48.2k", "+12%"],
    ["Bookings", "1,284", "+8%"],
    ["Customers", "932", "+5%"],
  ];
  return h(
    "div",
    { style: { width: w, display: "flex", flexDirection: "column", background: surface, border: hair, borderRadius: 14 * k, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.6)" } },
    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: 7 * k, padding: `${12 * k}px ${16 * k}px`, borderBottom: hair } },
      ...["#ff5f57", "#febc2e", "#28c840"].map((c) => h("div", { style: { width: 10 * k, height: 10 * k, borderRadius: 99, background: c } })),
      h("div", { style: { marginLeft: 120 * k, width: 220 * k, height: 18 * k, borderRadius: 99, background: "rgba(255,255,255,0.07)" } }),
    ),
    h(
      "div",
      { style: { display: "flex", gap: 18 * k, padding: 18 * k } },
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 14 * k, width: 110 * k } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 8 * k } }, mark(20 * k), bar(60, k, 0.5)),
        h("div", { style: { display: "flex", marginTop: 8 * k, height: 26 * k, borderRadius: 6 * k, background: "rgba(220,47,40,0.18)", alignItems: "center", paddingLeft: 10 * k } }, bar(56, k, 0.9, 7)),
        ...[70, 55, 80, 50, 64].map((x) => h("div", { style: { display: "flex", paddingLeft: 10 * k } }, bar(x, k, 0.16, 7))),
      ),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 14 * k, flex: 1 } },
        h(
          "div",
          { style: { display: "flex", gap: 12 * k } },
          ...stats.map(([label, value, delta]) =>
            h(
              "div",
              { style: { display: "flex", flexDirection: "column", gap: 6 * k, flex: 1, padding: 12 * k, borderRadius: 10 * k, border: hair, background: card } },
              txt(k, 11, 500, muted, label),
              h("div", { style: { display: "flex", alignItems: "baseline", gap: 6 * k } }, txt(k, 20, 800, fg, value), txt(k, 11, 700, "#34d399", delta)),
            ),
          ),
        ),
        h(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 10 * k, padding: 14 * k, borderRadius: 10 * k, border: hair, background: card } },
          h("div", { style: { display: "flex", justifyContent: "space-between" } }, txt(k, 12, 700, fg, "Monthly revenue"), txt(k, 11, 500, muted, "Last 12 months")),
          h(
            "div",
            { style: { display: "flex", alignItems: "flex-end", gap: 8 * k, height: 130 * k } },
            ...bars.map((b, i) => h("div", { style: { flex: 1, height: `${b}%`, borderRadius: `${4 * k}px ${4 * k}px 0 0`, background: i === 10 ? accent : "rgba(255,255,255,0.14)" } })),
          ),
        ),
      ),
    ),
  );
};

const phone = (w) => {
  const k = w / 200;
  const slots = [
    ["09:00", "Haircut · Sam", 0.16],
    ["10:30", "Colour · Priya", 1],
    ["12:00", "Beard trim · Leo", 0.16],
  ];
  return h(
    "div",
    {
      style: {
        width: w,
        minHeight: w * 2.05,
        display: "flex",
        flexDirection: "column",
        gap: 12 * k,
        padding: `${14 * k}px ${12 * k}px`,
        background: surface,
        border: "1px solid rgba(255,255,255,0.16)",
        borderRadius: 30 * k,
        boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
      },
    },
    h("div", { style: { display: "flex", alignSelf: "center", width: 60 * k, height: 14 * k, borderRadius: 99, background: "#000" } }),
    txt(k, 11, 500, muted, "Today"),
    txt(k, 17, 800, fg, "Bookings"),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 4 * k, padding: 12 * k, borderRadius: 14 * k, background: accent } },
      txt(k, 10, 700, "rgba(255,255,255,0.8)", "NEXT UP"),
      txt(k, 16, 800, "#fff", "10:30 AM"),
      txt(k, 11, 500, "rgba(255,255,255,0.85)", "Colour · Priya"),
    ),
    ...slots.map(([time, name, o]) =>
      h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 8 * k, padding: 9 * k, borderRadius: 10 * k, border: hair, background: card } },
        h("div", { style: { width: 6 * k, height: 26 * k, borderRadius: 99, background: o === 1 ? accent : "rgba(255,255,255,0.2)" } }),
        h("div", { style: { display: "flex", flexDirection: "column", gap: 2 * k } }, txt(k, 11, 800, fg, time), txt(k, 10, 500, muted, name)),
      ),
    ),
    h(
      "div",
      { style: { display: "flex", marginTop: "auto", justifyContent: "center", padding: 10 * k, borderRadius: 12 * k, border: "1px solid rgba(220,47,40,0.5)" } },
      txt(k, 11, 800, fg, "+ New booking"),
    ),
  );
};

const banners = [
  {
    // Facebook page cover. The phone app shows roughly the middle 1100px and the profile photo covers a lower corner,
    // so text stays in the top half of that central column and the mockups rise from the bottom edge.
    file: "facebook-cover-1640x624.png",
    W: 1640,
    H: 624,
    el: (W, H) =>
      frame(W, H, { glow: "50% -20%", ring: { size: H * 1.1, right: -H * 0.36, top: -H * 0.23 } }, [
        abs({ top: 56, left: 0, right: 0, justifyContent: "center" }, content(0.95, { align: "center", meta: false })),
        abs({ left: 285, top: 380 }, dashboard(400)),
        abs({ left: 1010, top: 368 }, phone(150)),
        abs({ left: 1180, top: 408 }, phone(150)),
      ]),
  },
  {
    // X header. The profile photo covers the bottom-left, so content sits on the right
    // and the rings sit behind the dashboard, away from the text.
    file: "x-header-1500x500.png",
    W: 1500,
    H: 500,
    el: (W, H) =>
      frame(W, H, { glow: "88% 0%", ring: { size: H * 1.1, left: -H * 0.3, top: -H * 0.42 } }, [
        abs({ left: 240, top: 135 }, dashboard(400)),
        abs({ right: 80, top: 0, bottom: 0, alignItems: "center" }, content(0.84)),
      ]),
  },
  {
    // LinkedIn personal profile background. The photo covers the left third.
    file: "linkedin-profile-1584x396.png",
    W: 1584,
    H: 396,
    el: (W, H) =>
      frame(W, H, { glow: "88% 0%", ring: { size: H * 1.2, left: H * 0.75, top: -H * 0.55 } }, [
        abs({ left: 430, top: 86 }, dashboard(380)),
        abs({ right: 84, top: 0, bottom: 0, alignItems: "center" }, content(0.74)),
      ]),
  },
  {
    // LinkedIn company page cover (1128x191), rendered at 2x so it stays sharp. The page logo covers the left
    // and already shows the brand, so this is the headline and services only.
    file: "linkedin-company-2256x382.png",
    W: 2256,
    H: 382,
    el: (W, H) =>
      frame(W, H, { glow: "88% 0%", ring: { size: H * 1.1, left: -H * 0.35, top: -H * 0.25 } }, [
        abs({ right: 140, top: 0, bottom: 0, alignItems: "center" }, content(1.2, { brand: false, meta: false, singleLine: true })),
      ]),
  },
  {
    // Dribbble has no profile cover, so this is a 4:3 intro shot to pin first on the profile.
    file: "dribbble-shot-1600x1200.png",
    W: 1600,
    H: 1200,
    el: (W, H) =>
      frame(W, H, { glow: "50% 0%", ring: { size: 560, right: -200, top: -180 } }, [
        abs({ top: 110, left: 0, right: 0, justifyContent: "center" }, content(1.2, { align: "center" })),
        abs({ left: 250, top: 600 }, dashboard(960)),
        abs({ left: 1110, top: 670 }, phone(250)),
      ]),
  },
  {
    // Profile picture for every platform. Platforms crop it to a circle, so the background is the red tile itself
    // and only the symbol sits in the middle (a square tile inside a circle would leave dark corners).
    file: "avatar-800x800.png",
    W: 800,
    H: 800,
    el: (W, H) =>
      h(
        "div",
        { style: { width: W, height: H, display: "flex", alignItems: "center", justifyContent: "center", background: accent } },
        h("svg", { width: 600, height: 600, viewBox: "0 0 40 40" }, ...glyph),
      ),
  },
];

// Optional filter, e.g. `node brand/generate.mjs facebook` regenerates only the Facebook cover
const only = process.argv[2];
for (const { file, W, H, el } of banners.filter((b) => !only || b.file.includes(only))) {
  const res = new ImageResponse(el(W, H), { width: W, height: H, fonts });
  const data = Buffer.from(await res.arrayBuffer());
  // Windows briefly locks a file while an editor preview or watcher has it open, so retry a few times
  for (let attempt = 1; ; attempt++) {
    try {
      await writeFile(join(process.cwd(), "brand", file), data);
      break;
    } catch (err) {
      if (attempt === 5) throw err;
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }
  console.log("wrote brand/" + file);
}

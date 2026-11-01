import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

const fontDir = join(process.cwd(), "node_modules/@fontsource/manrope/files");

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview image shown when the site is shared on social media or chat apps. */
export default async function OpengraphImage() {
  const [medium, extraBold] = await Promise.all([
    readFile(join(fontDir, "manrope-latin-500-normal.woff")),
    readFile(join(fontDir, "manrope-latin-800-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 100% 0%, #5c1512 0%, #0b0d12 55%)",
          color: "#f4f5f7",
          fontFamily: "Manrope",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="80" height="80" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="9" fill="#dc2f28" />
            <path d="M29.3 12.9A10.6 10.6 0 1 0 29.3 27.1" fill="none" stroke="#fff" strokeWidth="6.2" strokeLinecap="round" />
            <path d="M0 16.5h40v2H0zM0 21.5h40v2H0z" fill="#dc2f28" />
          </svg>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 800, letterSpacing: -2 }}>
            {site.brand}
            <span style={{ color: "#dc2f28" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 800, lineHeight: 1.05, letterSpacing: -3 }}>
          <span>Modern web apps,</span>
          <span style={{ color: "#dc2f28" }}>built to last.</span>
        </div>
        <div style={{ fontSize: 28, color: "#9aa1ae" }}>{`${site.role} · ${site.location}`}</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: medium, weight: 500, style: "normal" },
        { name: "Manrope", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}

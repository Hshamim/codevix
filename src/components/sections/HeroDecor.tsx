/**
 * Brand decoration shared by every top-of-page hero (home, inner-page banners, 404):
 * a dark overlay for the photo, a red curve on the left and a red wave down the right edge.
 * Sizes are fixed rather than relative to the section, so the shapes look identical
 * whether the hero is full-screen or a shorter banner.
 */
export function HeroDecor() {
  return (
    <>
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <svg
        aria-hidden
        viewBox="0 0 220 380"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 -z-10 h-[min(26rem,46svh)] w-[22vw] max-w-56 min-w-24"
      >
        <defs>
          <linearGradient id="decor-curve-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <path d="M0 0H220C170 120 90 230 0 380Z" fill="url(#decor-curve-l)" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 320 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 right-0 -z-10 hidden h-full w-[18vw] max-w-80 md:block"
      >
        <defs>
          <linearGradient id="decor-curve-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="0.55" stopColor="color-mix(in srgb, var(--color-accent) 45%, white)" />
            <stop offset="1" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <path d="M320 0V800H120C40 640 300 470 270 260 255 150 300 70 320 0Z" fill="url(#decor-curve-r)" />
        <path d="M320 0V800H60C-10 640 250 470 225 260 210 150 270 70 320 0Z" fill="var(--color-ink)" opacity="0.55" />
      </svg>
    </>
  );
}

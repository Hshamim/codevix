/** Small "// label" above a heading. */
export function Kicker({ children, tone = "light" }: { children: React.ReactNode; tone?: "dark" | "light" }) {
  return (
    <p className={`text-sm font-semibold ${tone === "dark" ? "text-muted" : "text-muted-dark"}`}>
      <span className="mr-1.5 font-bold text-accent">{"//"}</span>
      {children}
    </p>
  );
}

export const headingCls = "text-[clamp(2rem,4vw,3rem)] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance";

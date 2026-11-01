import type { LucideIcon } from "lucide-react";

/** One focus style for every field: accent border plus a soft ring, no offset outline. */
export const fieldCls =
  "peer w-full rounded-md border border-transparent py-4 pr-5 pl-12 text-ink-soft shadow-[0_1px_2px_rgb(0_0_0/0.04)] placeholder:text-muted-dark/60 transition-[border-color,box-shadow,background-color] duration-200 hover:border-cream-line focus:border-accent focus:ring-4 focus:ring-accent/12 focus:outline-none";

type FieldProps = {
  label: string;
  icon: LucideIcon;
  /** Optional fields show "(optional)" next to the label */
  optional?: boolean;
  /** Field fill: white on gray panels, gray on white sections */
  tone?: "paper" | "cream";
  className?: string;
} & (
  | ({ multiline?: false } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({ multiline: true } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
);

export function Field({ label, icon: Icon, optional, tone = "paper", className = "", multiline, ...props }: FieldProps) {
  const cls = `${fieldCls} ${tone === "paper" ? "bg-paper" : "bg-cream focus:bg-paper"}`;
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-bold">
        {label}
        {optional && <span className="ml-1 font-medium text-muted-dark">(optional)</span>}
      </span>
      <span className="relative block">
        {multiline ? (
          <textarea
            rows={5}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={`${cls} resize-none`}
          />
        ) : (
          <input {...(props as React.InputHTMLAttributes<HTMLInputElement>)} className={cls} />
        )}
        <Icon
          aria-hidden
          className={`pointer-events-none absolute left-4 size-5 text-muted-dark/60 transition-colors peer-focus:text-accent ${
            multiline ? "top-4" : "top-1/2 -translate-y-1/2"
          }`}
        />
      </span>
    </label>
  );
}

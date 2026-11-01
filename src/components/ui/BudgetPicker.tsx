import { Check } from "lucide-react";

// Optional, nothing pre-selected: many clients don't know their budget before the first chat.
export const budgets = ["< $5k", "$5k – $10k", "$10k – $25k", "$25k +", "Not sure yet"];

type Tone = "paper" | "cream";

/** Toggle button used for the service and budget choices in contact forms. */
export function Chip({
  active,
  onClick,
  tone = "paper",
  children,
}: {
  active: boolean;
  onClick: () => void;
  /** Chip fill: white on gray panels, gray on white sections */
  tone?: Tone;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-md border px-4 py-2.5 text-sm font-bold transition-colors focus-visible:outline-offset-2 ${
        active
          ? "border-accent bg-accent text-white"
          : `border-transparent ${tone === "paper" ? "bg-paper" : "bg-cream"} text-ink-soft hover:border-accent/40 hover:text-accent`
      }`}
    >
      {active && <Check className="size-3.5" strokeWidth={3} />}
      {children}
    </button>
  );
}

/** Optional budget range; clicking the selected option again clears it. */
export function BudgetPicker({
  value,
  onChange,
  tone,
  className = "",
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  tone?: Tone;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="text-sm font-bold">
        Project budget <span className="font-medium text-muted-dark">(optional)</span>
      </legend>
      <p className="mt-1 mb-3 text-sm text-muted-dark">A rough range helps us suggest the right solution. No commitment.</p>
      <div className="flex flex-wrap gap-2">
        {budgets.map((b) => (
          <Chip key={b} tone={tone} active={value === b} onClick={() => onChange(value === b ? null : b)}>
            {b}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}

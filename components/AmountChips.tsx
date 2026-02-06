import { ChangeEvent } from "react";
import { formatCurrency } from "../lib/utils";
import { cn } from "../lib/cn";

type AmountChipsProps = {
  amounts: number[];
  selected: number | null;
  onSelect: (amount: number) => void;
  customAllowed?: boolean;
  customValue?: string;
  onCustomChange?: (value: string) => void;
};

export default function AmountChips({
  amounts,
  selected,
  onSelect,
  customAllowed,
  customValue,
  onCustomChange,
}: AmountChipsProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {amounts.map((amount, index) => {
          const active = selected === amount;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => onSelect(amount)}
              aria-pressed={active}
              className={cn(
                "rounded-full border-2 border-[var(--foreground)] px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ease-bounce",
                active
                  ? "bg-[var(--foreground)] text-white shadow-pop"
                  : "bg-[var(--muted)] text-[var(--foreground)] shadow-pop",
              )}
            >
              {formatCurrency(amount)}
            </button>
          );
        })}
      </div>
      {customAllowed ? (
        <label className="block text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
          Custom amount
          <input
            type="number"
            min={100}
            placeholder="Enter amount"
            value={customValue ?? ""}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onCustomChange?.(event.target.value)
            }
            className="mt-2 w-full rounded-lg border-2 border-[#cbd5e1] bg-white px-3 py-2 text-sm font-medium text-[var(--foreground)] shadow-pop transition-all duration-300 ease-bounce focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
          />
        </label>
      ) : null}
    </div>
  );
}

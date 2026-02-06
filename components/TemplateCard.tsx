import Card from "./Card";
import { GiftTemplate } from "../lib/types";
import { cn } from "../lib/cn";
import { headingStyle } from "../lib/typography";

type TemplateCardProps = {
  template: GiftTemplate;
  selected?: boolean;
  onSelect?: () => void;
};

export default function TemplateCard({
  template,
  selected,
  onSelect,
}: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
    >
      <Card
        accent={selected ? "secondary" : "accent"}
        className={cn(
          "h-full",
          selected && "ring-2 ring-[var(--foreground)]",
        )}
      >
        <div className="flex items-start justify-between">
          <span className="text-2xl">{template.emoji}</span>
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
            {selected ? "Selected" : "Pick"}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-extrabold leading-tight" style={headingStyle}>
          {template.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          {template.copy}
        </p>
      </Card>
    </button>
  );
}

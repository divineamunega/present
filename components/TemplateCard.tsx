import Card from "./Card";
import { GiftTemplate } from "../lib/types";
import { cn } from "../lib/cn";
import { headingStyle } from "../lib/typography";

type TemplateCardProps = {
  template: GiftTemplate;
  selected?: boolean;
  onSelect?: () => void;
  emphasize?: boolean;
};

export default function TemplateCard({
  template,
  selected,
  onSelect,
  emphasize,
}: TemplateCardProps) {
  const isSelected = Boolean(selected);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
    >
      <Card
        accent="accent"
        disableHoverFx={isSelected}
        hoverAccent={!isSelected}
        className={cn(
          "h-full",
          selected &&
            (emphasize
              ? "bg-[var(--foreground)] text-white shadow-pop scale-[1.02] border-transparent"
              : "bg-[var(--foreground)] text-white border-transparent"),
        )}
      >
        <div className="flex items-start justify-between">
          <span className="text-2xl">{template.emoji}</span>
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-widest",
              isSelected ? "text-white/80" : "text-[var(--muted-foreground)]",
            )}
          >
            {selected ? "Selected" : "Pick"}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-extrabold leading-tight" style={headingStyle}>
          {template.title}
        </h3>
        <p className={cn("mt-2 text-sm", isSelected ? "text-white/80" : "text-[var(--muted-foreground)]")}>
          {template.copy}
        </p>
      </Card>
    </button>
  );
}

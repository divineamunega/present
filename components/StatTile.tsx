import Card from "./Card";
import { headingStyle } from "../lib/typography";

type StatTileProps = {
  label: string;
  value: string;
  accent?: "accent" | "secondary" | "tertiary" | "quaternary";
};

export default function StatTile({ label, value, accent = "accent" }: StatTileProps) {
  return (
    <Card accent={accent} shadow="soft" className="h-full">
      <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-3 text-2xl font-extrabold" style={headingStyle}>
        {value}
      </p>
    </Card>
  );
}

import { Circle, Square, Triangle } from "lucide-react";

export default function GeoLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Square className="h-4 w-4 text-[var(--foreground)]" strokeWidth={2.5} />
        <Circle className="h-4 w-4 text-[var(--foreground)]" strokeWidth={2.5} />
        <Triangle className="h-4 w-4 text-[var(--foreground)]" strokeWidth={2.5} />
      </div>
      <span className="text-sm font-extrabold tracking-wide" style={{ fontFamily: "var(--font-outfit)" }}>
        Present
      </span>
    </div>
  );
}

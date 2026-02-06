import { Gift } from "lucide-react";

export default function GeoLogo() {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[var(--foreground)] bg-white shadow-pop">
        <Gift className="h-5 w-5 text-[var(--foreground)]" strokeWidth={2.5} />
      </span>
      <span
        className="text-2xl font-extrabold uppercase tracking-tight"
        style={{ fontFamily: "var(--font-outfit)" }}
      >
        Present
      </span>
    </div>
  );
}

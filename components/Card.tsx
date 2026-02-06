import { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  accent?: "accent" | "secondary" | "tertiary" | "quaternary";
  shadow?: "soft" | "pop";
};

const accentStyles: Record<NonNullable<CardProps["accent"]>, string> = {
  accent: "bg-[var(--muted)]",
  secondary: "bg-[var(--muted)]",
  tertiary: "bg-[var(--muted)]",
  quaternary: "bg-[var(--muted)]",
};

const shadowStyles: Record<NonNullable<CardProps["shadow"]>, string> = {
  soft: "shadow-sticker",
  pop: "shadow-sticker-pink",
};

export default function Card({
  accent = "accent",
  shadow = "soft",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-[var(--foreground)] bg-[var(--card)] p-5 text-[var(--foreground)] transition-all duration-300 ease-bounce hover:-rotate-1 hover:scale-[1.02]",
        shadowStyles[shadow],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute right-3 top-3 h-6 w-6 rounded-full border-2 border-[var(--foreground)] opacity-10",
          accentStyles[accent],
        )}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-3 left-5 h-3 w-12 rounded-full border-2 border-[var(--foreground)] opacity-10"
        aria-hidden
      />
      {children}
    </div>
  );
}

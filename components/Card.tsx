"use client";

import { HTMLAttributes, useId, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/cn";

type CardProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd"
> & {
  accent?: "accent" | "secondary" | "tertiary" | "quaternary";
  shadow?: "soft" | "pop";
  hoverAccent?: boolean;
  hoverAccentColor?: string;
};

const accentPalette = ["#8B5CF6", "#FBBF24"];

const shadowStyles: Record<NonNullable<CardProps["shadow"]>, string> = {
  soft: "shadow-sticker",
  pop: "shadow-sticker-pink",
};

export default function Card({
  accent = "accent",
  shadow = "soft",
  hoverAccent = true,
  hoverAccentColor,
  className,
  children,
  ...props
}: CardProps) {
  const id = useId();
  const accentColor = useMemo(() => {
    if (hoverAccentColor) return hoverAccentColor;
    const input = `${accent}-${id}`;
    let hash = 0;
    for (let i = 0; i < input.length; i += 1) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % accentPalette.length;
    return accentPalette[index];
  }, [accent, id]);

  const {
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    ...motionProps
  } = props;

  return (
    <motion.div
      whileHover={{ y: -2, rotate: -1, scale: 1.02 }}
      whileTap={{ y: 1, rotate: 0, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn(
        "group relative rounded-xl border-2 border-[var(--foreground)] bg-[var(--card)] p-5 text-[var(--foreground)] transition-all duration-300 ease-bounce hover:-rotate-1 hover:scale-[1.02]",
        hoverAccent &&
          "hover:border-[var(--card-accent)] hover:shadow-[8px_8px_0_0_var(--card-accent)]",
        shadowStyles[shadow],
        className,
      )}
      style={{ ["--card-accent" as string]: accentColor }}
      {...motionProps}
    >
      {hoverAccent ? (
        <div
          className={cn(
            "pointer-events-none absolute right-3 top-3 h-6 w-6 rounded-full border-2 border-[var(--foreground)] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          )}
          style={{ backgroundColor: accentColor }}
          aria-hidden
        />
      ) : null}
      <div
        className="pointer-events-none absolute -bottom-3 left-5 h-3 w-12 rounded-full border-2 border-[var(--foreground)] opacity-10"
        aria-hidden
      />
      {children}
    </motion.div>
  );
}

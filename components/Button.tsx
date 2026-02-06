"use client";

import { ButtonHTMLAttributes } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  shape?: "pill" | "soft";
};

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-foreground)] border-2 border-[var(--foreground)] shadow-pop hover:shadow-pop-hover",
  secondary:
    "bg-[var(--muted)] text-[var(--foreground)] border-2 border-[var(--foreground)] shadow-pop hover:shadow-pop-hover",
  outline:
    "bg-transparent text-[var(--foreground)] border-2 border-[var(--foreground)] hover:bg-[var(--muted)]",
};

const shapeStyles: Record<NonNullable<ButtonProps["shape"]>, string> = {
  pill: "rounded-full",
  soft: "rounded-[16px]",
};

export default function Button({
  variant = "primary",
  shape = "pill",
  className,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -2, x: -2 }}
      whileTap={{ y: 2, x: 2, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      className={cn(
        "inline-flex min-h-[48px] cursor-pointer select-none items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 ease-bounce hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-pop-active focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-60",
        variantStyles[variant],
        shapeStyles[shape],
        className,
      )}
      {...props}
    />
  );
}

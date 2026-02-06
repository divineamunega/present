"use client";

import { ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "../lib/cn";

type MagneticTagProps = {
  children: ReactNode;
  className?: string;
};

export default function MagneticTag({ children, className }: MagneticTagProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  return (
    <motion.span
      style={{ x: springX, y: springY }}
      onPointerMove={(event) => {
        const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        x.set(offsetX * 0.12);
        y.set(offsetY * 0.12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(
        "inline-flex select-none rounded-full border-2 border-[var(--foreground)] bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-[var(--foreground)] shadow-pop transition-all duration-300 ease-bounce",
        className,
      )}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );
}

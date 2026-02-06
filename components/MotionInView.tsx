"use client";

import { HTMLAttributes } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/cn";

type MotionInViewProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export default function MotionInView({
  delay = 0,
  className,
  children,
  ...props
}: MotionInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ type: "spring", stiffness: 160, damping: 20, delay }}
      className={cn("animate-pop-in", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

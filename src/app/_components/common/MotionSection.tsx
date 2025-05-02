"use client";

import { HTMLMotionProps, motion } from "motion/react";

import { cn } from "utils/cn";

type ClientSectionProps = {
  children: React.ReactNode;
} & Pick<React.HTMLProps<HTMLDivElement>, "className"> &
  HTMLMotionProps<"section">;

export function MotionSection({
  children,
  className,
  ...props
}: ClientSectionProps) {
  return (
    <motion.section {...props} className={cn(className)}>
      {children}
    </motion.section>
  );
}

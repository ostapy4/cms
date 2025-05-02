"use client";

import { HTMLMotionProps, motion } from "motion/react";

import { cn } from "utils/cn";

type ClientSectionProps = {
  children: React.ReactNode;
} & Pick<React.HTMLProps<HTMLDivElement>, "className"> &
  HTMLMotionProps<"div">;

export function MotionDiv({
  children,
  className,
  ...props
}: ClientSectionProps) {
  return (
    <motion.div {...props} className={cn(className)}>
      {children}
    </motion.div>
  );
}

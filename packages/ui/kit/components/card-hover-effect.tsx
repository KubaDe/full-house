"use client";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useState } from "react";
import { cn } from "../utils";

export const HoverEffect = ({
  items,
  className,
  selectedIndex,
}: {
  items: ReactNode[];
  className?: string;
  selectedIndex?: number;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="group relative  block size-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-hidden
        >
          <AnimatePresence>
            {hoveredIndex === idx && hoveredIndex !== selectedIndex && (
              <motion.span
                className="absolute inset-0 block size-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>{item}</Card>
        </div>
      ))}
    </div>
  );
};

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative z-20 rounded-2xl border border-transparent p-2 dark:border-white/[0.2]",
        className,
      )}
    >
      {children}
    </div>
  );
};

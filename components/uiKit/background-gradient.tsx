import React, { type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type BackgroundGradientProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  dominantColor?: string;
};

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
  dominantColor = "#fa3838",
  ...props
}: BackgroundGradientProps) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  const gradient = `linear-gradient(45deg, rgba(0,0,0,1) 0%, ${dominantColor} 100%)`;

  return (
    <div className={cn("group relative p-[4px]", containerClassName)} {...props}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
          backgroundImage: gradient,
        }}
        className={cn(
          "absolute inset-0 z-[1] rounded-2xl opacity-60 blur-xl transition  duration-500 will-change-transform",
          animate ? "group-hover:opacity-100" : undefined,
        )}
      />
      <div
        style={{
          backgroundImage: gradient,
        }}
        className={"absolute inset-0 z-[1] rounded-2xl will-change-transform"}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

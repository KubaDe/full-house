import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { BackgroundGradient, type BackgroundGradientProps } from "@/components/uiKit/background-gradient";
import { cn } from "@/lib/utils";

export type PointCardProps = BackgroundGradientProps & {
  value?: string;
  label?: string | number | ReactNode;
  special?: boolean;
  dominantColor?: string;
  isActive?: boolean;
  onClick?: () => void;
  isFlipped?: boolean;
  isDisabled?: boolean;
};

export const PointCard = ({
  label,
  dominantColor,
  special = false,
  isActive,
  isFlipped = false,
  isDisabled = false,
  ...props
}: PointCardProps) => {
  const content =
    typeof label === "string" || typeof label === "number" ? (
      <p className="text-3xl font-semibold">{label}</p>
    ) : (
      label
    );
  const obverse = (
    <>
      {!special && <p className="absolute left-2 top-1 text-sm font-semibold">{label}</p>}
      {content}
      {!special && <p className="absolute bottom-1 right-2 rotate-180 text-sm font-semibold">{label}</p>}
    </>
  );

  const reverse = <div className="text-4xl">🎰️</div>;

  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={{ rotate: isActive ? "15deg" : 0 }}
      transition={{ duration: 1 }}
    >
      <BackgroundGradient
        dominantColor={dominantColor}
        className={cn(
          "flex aspect-[2.5/3.5] w-16  items-center justify-center rounded-[12px] bg-white",
          isActive ? "bg-opacity-100" : "bg-opacity-95",
          isDisabled ? "pointer-events-none" : "cursor-pointer",
        )}
        {...props}
      >
        {isFlipped ? reverse : obverse}
      </BackgroundGradient>
    </motion.div>
  );
};

import { type ReactNode } from "react";
import { HoverEffect } from "@/components/uiKit/card-hover-effect";

type DeckProps = {
  children: ReactNode[];
  className?: string;
  selectedIndex?: number;
};

export const Deck = ({ children, className, selectedIndex }: DeckProps) => {
  return (
    <HoverEffect
      items={children}
      className={className}
      selectedIndex={selectedIndex}
    />
  );
};

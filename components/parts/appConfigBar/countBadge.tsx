import { type ReactNode } from "react";
import { Badge } from "@/components/uiKit/badge";

type CountBadgeProps = {
  children: ReactNode;
};
export const CountBadge = ({ children }: CountBadgeProps) => (
  <Badge className="ml-3 inline justify-self-end rounded-md px-1.5 py-0 text-[10px] font-bold leading-4">
    {children}
  </Badge>
);

CountBadge.displayName = "CountBadge";

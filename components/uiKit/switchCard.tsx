"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { Label } from "./label";
import { Switch } from "./switch";
import { cn } from "@/lib/utils";

type SwitchCardProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
  title: string;
  subtitle?: string;
};

const SwitchCard = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchCardProps>(
  ({ className, title, subtitle, ...props }, ref) => (
    <Label
      className={cn(
        "flex cursor-pointer flex-row items-center justify-between rounded-lg border p-4 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md",
        className,
      )}
    >
      <div className="flex max-w-[80%] flex-col gap-2">
        <span className="block">{title}</span>
        <span className="block text-xs text-muted-foreground">{subtitle}</span>
      </div>
      <Switch {...props} ref={ref} />
    </Label>
  ),
);
SwitchCard.displayName = SwitchPrimitives.Root.displayName;

export { SwitchCard };

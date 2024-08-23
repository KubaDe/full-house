import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/uiKit/button";
import { cn } from "@/lib/utils";

type ArrowButtonProps = ButtonProps & {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
};

export const ArrowButton = ({ direction, onClick, className, ...rest }: ArrowButtonProps) => {
  const icon = useMemo(() => {
    switch (direction) {
      case "left":
        return <ChevronLeft strokeWidth={3} className="size-4 -translate-x-px" />;
      case "right":
        return <ChevronRight strokeWidth={3} className="size-4 translate-x-px" />;
    }
  }, [direction]);

  return (
    <Button
      className={cn("flex size-5 content-center items-center rounded-full", className)}
      type="button"
      variant="default"
      size="icon"
      onClick={onClick}
      {...rest}
    >
      {icon}
    </Button>
  );
};

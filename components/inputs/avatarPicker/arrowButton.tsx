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
        return <ChevronLeft className="size-4" />;
      case "right":
        return <ChevronRight className="size-4" />;
    }
  }, [direction]);

  return (
    <Button
      className={cn("size-5 rounded-full", className)}
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

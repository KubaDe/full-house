import { match, P } from "ts-pattern";
import { type LucideIcon } from "lucide-react";
import { Button } from "@repo/ui-kit/button";
import { cn } from "@repo/ui-kit/utils";

type ChatButtonProps = {
  onClick: () => void;
  isActive: boolean;
  isSidebarOpen: boolean;
  Icon: LucideIcon;
  name?: string;
};

export const ModeButton = ({
  onClick,
  isActive,
  isSidebarOpen,
  Icon,
  name,
}: ChatButtonProps) => {
  const { iconSize, buttonSize, buttonVariant } = match([
    isSidebarOpen,
    isActive,
  ])
    .with([true, false], () => ({
      iconSize: 14,
      buttonSize: "size-8",
      buttonVariant: "secondary" as const,
    }))
    .with([true, true], () => ({
      iconSize: 18,
      buttonSize: "size-10",
      buttonVariant: "default" as const,
    }))
    .with([false, P.any], () => ({
      iconSize: 16,
      buttonSize: "size-10",
      buttonVariant: "secondary" as const,
    }))
    .exhaustive();

  return (
    <Button
      className={cn("rounded-full p-0 transition-all", buttonSize)}
      variant={buttonVariant}
      onClick={onClick}
      data-testid={`roomSplitView.modeButton.${name}`}
    >
      <Icon size={iconSize} />
    </Button>
  );
};

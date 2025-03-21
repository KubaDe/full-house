import { camelCase, capitalize, lowerCase, startCase } from "lodash-es";
import { ArrowButton } from "./arrowButton";
import { cn } from "@repo/ui-kit/utils";

enum Direction {
  Left = "left",
  Right = "right",
}

const transformPartNameToLabel = (part: string) => lowerCase(startCase(part));

type ControlRowProps = {
  className?: string;
  onClick: (direction: Direction) => void;
  partName: string;
};

export const ControlRow = ({
  onClick,
  className,
  partName,
}: ControlRowProps) => {
  return (
    <>
      <ArrowButton
        className={cn("col-start-1 row-span-1", className)}
        direction="left"
        onClick={() => onClick(Direction.Left)}
        aria-label={`Previous ${transformPartNameToLabel(partName)}`}
        data-testid={`previous${capitalize(camelCase(partName))}`}
      />
      <ArrowButton
        className={cn("col-start-3 row-span-1", className)}
        direction="right"
        onClick={() => onClick(Direction.Right)}
        aria-label={`Next ${transformPartNameToLabel(partName)}`}
        data-testid={`next${capitalize(camelCase(partName))}`}
      />
    </>
  );
};

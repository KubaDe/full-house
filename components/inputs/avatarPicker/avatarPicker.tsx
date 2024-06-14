import Peep, {
  BustPose,
  Face,
  FacialHair,
  Hair,
  Accessories,
  type BustPoseType,
  type FaceType,
  type HairType,
  type FacialHairType,
  type AccessoryType,
} from "react-peeps";
Accessories.GlassAviator;
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useMemo } from "react";
import { z } from "zod";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { lowerCase, startCase } from "lodash";
import { Button, type ButtonProps } from "@/components/uiKit/button";
import { cn } from "@/lib/utils";

type AvatarPickerProps = {
  value?: Avatar;
  defaultValue?: Avatar;
  onChange?: (value: Avatar) => void;
};

export const partsOptions = {
  body: Object.keys(BustPose),
  face: Object.keys(Face),
  hair: Object.keys(Hair),
  facialHair: Object.keys(FacialHair),
  accessory: Object.keys(Accessories),
};

export const avatarPickerInputSchema = z.object({
  body: z.custom<BustPoseType>((value: string): value is BustPoseType =>
    partsOptions.body.includes(value as BustPoseType),
  ),
  face: z.custom<FaceType>((value: string): value is FaceType =>
    partsOptions.face.includes(value as FaceType),
  ),
  hair: z.custom<HairType>((value: string): value is HairType =>
    partsOptions.hair.includes(value as HairType),
  ),
  facialHair: z.custom<FacialHairType>((value: string): value is FacialHairType =>
    partsOptions.facialHair.includes(value as FacialHairType),
  ),
  accessory: z.custom<AccessoryType>((value: string): value is AccessoryType =>
    partsOptions.accessory.includes(value as AccessoryType),
  ),
});

export type Avatar = z.infer<typeof avatarPickerInputSchema>;

const defaultAvatar = {
  body: "ArmsCrossed",
  face: "Cheeky",
  hair: "Buns",
  facialHair: "FullMedium",
  accessory: "GlassRound",
} satisfies Avatar;

type ArrowButtonProps = ButtonProps & {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
};

enum Direction {
  Left = "left",
  Right = "right",
}

const transformPartNameToLabel = (part: string) => lowerCase(startCase(part));

const ArrowButton = ({ direction, onClick, className, ...rest }: ArrowButtonProps) => {
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

type ControlRowProps = {
  className?: string;
  onClick: (direction: Direction) => void;
  partName: string;
};

const ControlRow = ({ onClick, className, partName }: ControlRowProps) => {
  return (
    <>
      <ArrowButton
        className={cn("col-start-1 row-span-1", className)}
        direction="left"
        onClick={() => onClick(Direction.Left)}
        aria-label={`Previous ${transformPartNameToLabel(partName)}`}
      />
      <ArrowButton
        className={cn("col-start-3 row-span-1", className)}
        direction="right"
        onClick={() => onClick(Direction.Right)}
        aria-label={`Next ${transformPartNameToLabel(partName)}`}
      />
    </>
  );
};

export const AvatarPicker = forwardRef<HTMLDivElement, AvatarPickerProps>(
  ({ onChange, defaultValue = defaultAvatar, value }, ref) => {
    const [controllableState, setControllableState] = useControllableState<Avatar>({
      prop: value,
      defaultProp: defaultValue,
      onChange,
    });
    const loopOver = ({ direction, part }: { part: keyof typeof partsOptions; direction: Direction }) => {
      const options = partsOptions[part];
      const partCurrentState = controllableState?.[part];
      const partCurrentStateIndex = partCurrentState
        ? options.findIndex((option) => option === partCurrentState)
        : 0;
      let partNewStateIndex = partCurrentStateIndex;
      switch (direction) {
        case Direction.Right:
          partNewStateIndex = (partCurrentStateIndex + 1) % options.length;
          break;
        case Direction.Left:
          partNewStateIndex = (partCurrentStateIndex - 1 + options.length) % options.length;
          break;
      }
      const partNewState = options[partNewStateIndex] ?? options[0];
      setControllableState({ ...(controllableState ?? defaultAvatar), [part]: partNewState });
    };

    return (
      <div
        ref={ref}
        className="grid h-56 w-80  grid-cols-[50px_minmax(0,1fr)_50px] grid-rows-[40px_40px_30px_30px_minmax(0,1fr)] items-end justify-items-center"
      >
        <ControlRow
          onClick={(direction) => loopOver({ direction, part: "hair" })}
          className="row-start-1"
          partName="hair"
        />

        <ControlRow
          onClick={(direction) => loopOver({ direction, part: "accessory" })}
          className="row-start-2"
          partName="accessory"
        />
        <ControlRow
          onClick={(direction) => loopOver({ direction, part: "face" })}
          className="row-start-3"
          partName="face"
        />
        <ControlRow
          onClick={(direction) => loopOver({ direction, part: "facialHair" })}
          className="row-start-4"
          partName="facialHair"
        />
        <ControlRow
          onClick={(direction) => loopOver({ direction, part: "body" })}
          className="row-start-5 self-center"
          partName="body"
        />
        <div className="col-start-2 row-span-full row-start-1 size-full overflow-hidden rounded-full border-2 border-current">
          <Peep
            {...controllableState}
            strokeColor="currentColor"
            viewBox={{
              x: "40",
              y: "-48",
              width: "850",
              height: "1200",
            }}
          />
        </div>
      </div>
    );
  },
);

AvatarPicker.displayName = "AvatarPicker";

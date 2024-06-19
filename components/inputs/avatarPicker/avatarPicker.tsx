import Peep from "react-peeps";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";
import { defaultAvatar, type Direction, type partsOptions, type Avatar } from "./consts";
import { ControlRow } from "./ControlRow";
import { loopOverPart } from "./utils";

type AvatarPickerProps = {
  value?: Avatar;
  defaultValue?: Avatar;
  onChange?: (value: Avatar) => void;
};

export const AvatarPicker = forwardRef<HTMLDivElement, AvatarPickerProps>(
  ({ onChange, defaultValue = defaultAvatar, value }, ref) => {
    const [controllableState, setControllableState] = useControllableState<Avatar>({
      prop: value,
      defaultProp: defaultValue,
      onChange,
    });

    const handleRowClick = ({
      direction,
      part,
    }: {
      part: keyof typeof partsOptions;
      direction: Direction;
    }) => {
      const newControllableState = loopOverPart({
        direction,
        part,
        currentState: controllableState ?? defaultAvatar,
      });
      setControllableState(newControllableState);
    };

    return (
      <div
        ref={ref}
        className="grid h-56 w-80 grid-cols-[50px_minmax(0,1fr)_50px] grid-rows-[40px_40px_30px_30px_minmax(0,1fr)] items-end justify-items-center"
      >
        <ControlRow
          onClick={(direction) => handleRowClick({ direction, part: "hair" })}
          className="row-start-1"
          partName="hair"
        />

        <ControlRow
          onClick={(direction) => handleRowClick({ direction, part: "accessory" })}
          className="row-start-2"
          partName="accessory"
        />
        <ControlRow
          onClick={(direction) => handleRowClick({ direction, part: "face" })}
          className="row-start-3"
          partName="face"
        />
        <ControlRow
          onClick={(direction) => handleRowClick({ direction, part: "facialHair" })}
          className="row-start-4"
          partName="facialHair"
        />
        <ControlRow
          onClick={(direction) => handleRowClick({ direction, part: "body" })}
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

import { defaultAvatar, Direction, partsOptions, type Avatar } from "./consts";

export const loopOverPart = ({
  direction,
  part,
  currentState,
}: {
  part: keyof typeof partsOptions;
  direction: Direction;
  currentState: Avatar;
}) => {
  const options = partsOptions[part];
  const partCurrentState = currentState?.[part];
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
  return { ...(currentState ?? defaultAvatar), [part]: partNewState };
};

import Peep, {
  type AccessoryType,
  type BustPoseType,
  type SittingPoseType,
  type StandingPoseType,
  type FaceType,
  type FacialHairType,
  type HairType,
} from "react-peeps";
import { cn } from "@/lib/utils";

export type Avatar = {
  accessory?: AccessoryType;
  body?: BustPoseType | SittingPoseType | StandingPoseType;
  face?: FaceType;
  facialHair?: FacialHairType;
  hair?: HairType;
};

type PersonProps = {
  className?: string;
  avatar?: Avatar;
  width?: number;
};

const defaultAvatar = {
  body: "RestingBW",
  face: "Smile",
  hair: "Short",
  facialHair: "None",
} as const;

export const PersonAvatar = ({ className, avatar }: PersonProps) => {
  return (
    <div className={cn("size-8 overflow-hidden rounded-full text-primary", className)}>
      <Peep {...(avatar ?? defaultAvatar)} strokeColor="currentColor" />
    </div>
  );
};

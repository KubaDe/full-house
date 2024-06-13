import { motion } from "framer-motion";
import Peep, {
  type AccessoryType,
  type BustPoseType,
  type SittingPoseType,
  type StandingPoseType,
  type FaceType,
  type FacialHairType,
  type HairType,
} from "react-peeps";
import { Badge } from "@/components/uiKit/badge";

export type Profile = { name: string; id: string };

type Avatar = {
  accessory?: AccessoryType;
  body?: BustPoseType | SittingPoseType | StandingPoseType;
  face?: FaceType;
  facialHair?: FacialHairType;
  hair?: HairType;
};

type PersonProps = {
  profile?: Profile;
  className?: string;
  isOpen?: boolean;
  avatar?: Avatar;
};

const defaultAvatar = {
  body: "RestingBW",
  face: "Smile",
  hair: "Short",
  facialHair: "None",
} as const;

export const PersonBadge = ({ profile, className, avatar, isOpen = true }: PersonProps) => {
  return (
    <motion.label
      className={className}
      animate={isOpen ? "open" : "close"}
      initial={isOpen ? "open" : "close"}
      whileHover="open"
    >
      <Badge variant="outline" className="max-w-44 cursor-default overflow-hidden bg-white p-0">
        <div className="size-8 overflow-hidden rounded-l-full text-primary">
          <Peep {...(avatar ?? defaultAvatar)} strokeColor="currentColor" />
        </div>
        <motion.div variants={{ open: { width: "auto", opacity: 1 }, close: { width: 0, opacity: 0 } }}>
          <p className=" truncate pl-2 pr-4 text-xs">{profile?.name}</p>
        </motion.div>
      </Badge>
    </motion.label>
  );
};

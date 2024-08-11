import Peep from "react-peeps";
import { cn } from "@/lib/utils";
import { type Avatar } from "@/modules/user/schemas/avatarSchema";
import { defaultAvatar } from "@/modules/user/consts/avatarConsts";

type PersonProps = {
  className?: string;
  avatar?: Avatar;
  width?: number;
};

export const PersonAvatar = ({ className, avatar }: PersonProps) => {
  return (
    <div className={cn("size-8 min-h-8 min-w-8 overflow-hidden rounded-full text-primary", className)}>
      <Peep {...(avatar ?? defaultAvatar)} strokeColor="currentColor" />
    </div>
  );
};

import { motion } from "framer-motion";
import { Badge } from "@/components/uiKit/badge";
import { cn } from "@/lib/utils";
import { PersonAvatar } from "@/components/parts/personAvatar";
import { type Avatar } from "@/modules/user/schemas/avatarSchema";

export type Profile = { name: string; id: string };

type PersonProps = {
  profile?: Profile;
  className?: string;
  isOpen?: boolean;
  openOnHover?: boolean;
  avatar?: Avatar;
};

// TODO: put avatar inside profile
export const PersonBadge = ({
  profile,
  className,
  avatar,
  isOpen = true,
  openOnHover = true,
}: PersonProps) => {
  return (
    <motion.label
      className={cn("flex items-center", className)}
      animate={isOpen ? "open" : "close"}
      initial={isOpen ? "open" : "close"}
      whileHover={openOnHover ? "open" : undefined}
      aria-label="Avatar with name"
    >
      <Badge variant="outline" className="max-w-44 cursor-default overflow-hidden bg-white p-0">
        <PersonAvatar avatar={avatar} className="rounded-l-full" />
        <motion.div variants={{ open: { width: "auto", opacity: 1 }, close: { width: 0, opacity: 0 } }}>
          <p className="truncate pl-2 pr-4 text-xs">{profile?.name}</p>
        </motion.div>
      </Badge>
    </motion.label>
  );
};

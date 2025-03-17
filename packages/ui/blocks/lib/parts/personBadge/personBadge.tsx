import { motion } from "framer-motion";
import { match } from "ts-pattern";
import { Badge } from "@repo/ui-kit/badge";
import { cn } from "@repo/ui-kit/utils";
import { PersonAvatar } from "../personAvatar";
import { type Avatar } from "@repo/schemas";
export type Profile = { name: string; id: string };

type PersonProps = {
  profile?: Profile;
  className?: string;
  isOpen?: boolean;
  openOnHover?: boolean;
  avatar?: Avatar;
  isActive?: boolean;
  isJoined?: boolean;
  showStatusDot?: boolean;
};
type StatusDotProps = { isActive: boolean; isJoined: boolean };

const StatusDot = ({ isActive, isJoined }: StatusDotProps) => {
  const attrs = match([isActive, isJoined])
    .with([true, true], () => ({
      color: "bg-green-400",
      ariaLabel: "Present",
      value: "present",
    }))
    .with([false, true], () => ({
      color: "bg-gray-400",
      ariaLabel: "Inactive",
      value: "inactive",
    }))
    .with([false, false], () => ({
      color: "bg-red-400",
      ariaLabel: "Absent",
      value: "absent",
    }))
    .otherwise(() => null);

  if (!attrs) return null;

  return (
    <div
      className="absolute bottom-[-2px] left-[-3px] z-10"
      aria-label={attrs.ariaLabel}
      data-testid="statusDot"
      data-value={attrs.value}
    >
      <div
        className={cn(
          "size-[14px] rounded-full border-2 border-white",
          attrs.color,
        )}
      />
    </div>
  );
};

// TODO: put avatar inside profile
export const PersonBadge = ({
  profile,
  className,
  avatar,
  isOpen = true,
  openOnHover = true,
  isActive = false,
  isJoined = true,
  showStatusDot = true,
}: PersonProps) => {
  return (
    <motion.label
      className={cn("relative flex items-center", className)}
      animate={isOpen ? "open" : "close"}
      initial={isOpen ? "open" : "close"}
      whileHover={openOnHover ? "open" : undefined}
      aria-label="Avatar with name"
      data-testid="personBadge"
    >
      {showStatusDot && <StatusDot isActive={isActive} isJoined={isJoined} />}
      <Badge
        variant="outline"
        className={cn(
          "max-w-44 cursor-default overflow-hidden rounded-full bg-white p-0",
          !isJoined && "opacity-50",
        )}
      >
        <PersonAvatar avatar={avatar} className="rounded-l-full" />
        <motion.div
          variants={{
            open: { width: "auto", opacity: 1 },
            close: { width: 0, opacity: 0 },
          }}
        >
          <p className="truncate pl-2 pr-4 text-xs">{profile?.name}</p>
        </motion.div>
      </Badge>
    </motion.label>
  );
};

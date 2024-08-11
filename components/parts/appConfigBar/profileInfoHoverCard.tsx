import dayjs from "dayjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@/components/uiKit/hover-card";
import { PersonAvatar } from "@/components/parts/personAvatar";
import { useMe } from "@/modules/user/hooks/useMe";

type ProfileInfoHoverCardProps = {
  children: React.ReactNode;
};

export const ProfileInfoHoverCard = ({ children }: ProfileInfoHoverCardProps) => {
  const { userData, auth } = useMe();
  return (
    <HoverCard closeDelay={500}>
      <HoverCardTrigger aria-label="Avatar" className="flex cursor-pointer items-center">
        {children}
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent className="w-80" aria-label="About me info">
          <div className="flex items-center justify-between space-x-4">
            <PersonAvatar className="size-20 self-start border" avatar={userData?.profile?.avatar} />

            <div className="flex-1 space-y-1">
              <h4 className="text-sm font-semibold">{userData?.profile?.name}</h4>
              <p className="text-sm">{auth?.user?.primaryEmailAddress?.emailAddress}</p>
              <div className="flex items-center pt-2">
                {userData?.createdAt && (
                  <span className="text-xs text-muted-foreground">
                    Joined {dayjs(userData?.createdAt).format("LL")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
};

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/uiKit/hover-card";
import { PersonAvatar } from "@/components/parts/personAvatar";

type ProfileInfoHoverCardProps = {
  children: React.ReactNode;
};

export const ProfileInfoHoverCard = ({ children }: ProfileInfoHoverCardProps) => {
  return (
    <HoverCard closeDelay={500}>
      <HoverCardTrigger aria-label="Avatar" className="flex cursor-pointer items-center">
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-80" aria-label="About me info">
        <div className="flex items-center justify-between space-x-4">
          <PersonAvatar className="size-20 self-start border" />

          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-semibold">Hardcoded Name</h4>
            <p className="text-sm">hardcoded@email.com</p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">Joined December 2021</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

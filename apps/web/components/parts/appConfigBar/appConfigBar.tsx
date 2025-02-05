"use client";
import { Menu } from "./menu";
import { ProfileInfoHoverCard } from "./profileInfoHoverCard";
import { PersonAvatar } from "@/components/parts/personAvatar";
import { useMe } from "@/modules/user/hooks/useMe";

export const AppConfigBar = () => {
  const { userData } = useMe();
  if (!userData) {
    return null;
  }
  return (
    <div className="flex content-center gap-4">
      <ProfileInfoHoverCard>
        <PersonAvatar
          width={100}
          className="border"
          avatar={userData.profile?.avatar}
        />
      </ProfileInfoHoverCard>
      <Menu />
    </div>
  );
};

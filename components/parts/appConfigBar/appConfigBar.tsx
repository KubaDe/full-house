"use client";
import { Menu } from "./menu";
import { ProfileInfoHoverCard } from "./profileInfoHoverCard";
import { PersonAvatar } from "@/components/parts/personAvatar";
import { useMe } from "@/modules/user/hooks/useMe";

export const AppConfigBar = () => {
  const { auth, userData } = useMe();
  if (!auth.user) {
    return null;
  }
  return (
    <div className="flex content-center gap-4">
      <ProfileInfoHoverCard>
        <PersonAvatar width={100} className="size-8 border" avatar={userData?.profile?.avatar} />
      </ProfileInfoHoverCard>
      <Menu />
    </div>
  );
};

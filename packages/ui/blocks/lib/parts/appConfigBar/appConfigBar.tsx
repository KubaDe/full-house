"use client";
import { Menu } from "./menu";
import { ProfileInfoHoverCard } from "./profileInfoHoverCard";
import { PersonAvatar } from "../personAvatar";
import { useMe } from "@repo/ui-hooks/user";

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

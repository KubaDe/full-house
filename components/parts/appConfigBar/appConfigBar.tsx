"use client";
import { Menu } from "./menu";
import { ProfileInfoHoverCard } from "./profileInfoHoverCard";
import { PersonAvatar } from "@/components/parts/personAvatar";

export const AppConfigBar = () => {
  return (
    <div className="flex content-center gap-4">
      <ProfileInfoHoverCard>
        <PersonAvatar width={100} className="size-8 border" />
      </ProfileInfoHoverCard>
      <Menu />
    </div>
  );
};

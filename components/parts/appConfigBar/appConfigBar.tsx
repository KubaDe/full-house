"use client";
import { Menu } from "./menu";
import { ProfileInfoHoverCard } from "./profileInfoHoverCard";
import { PersonAvatar } from "@/components/parts/personAvatar";
import { api } from "@/utils/api";
import { useMe } from "@/modules/user/hooks/useMe";

export const AppConfigBar = api.withTRPC(() => {
  const { auth } = useMe();
  if (!auth.user) {
    return null;
  }
  return (
    <div className="flex content-center gap-4">
      <ProfileInfoHoverCard>
        <PersonAvatar width={100} className="size-8 border" />
      </ProfileInfoHoverCard>
      <Menu />
    </div>
  );
});

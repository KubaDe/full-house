import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "@/utils/api";

export const useMe = () => {
  const { data: profileData, ...profileQueryInfo } = api.me.profile.useQuery(undefined, { retry: false });
  const auth = useClerk();

  const { refetch } = profileQueryInfo;
  const { isSignedIn } = useUser();

  useEffect(() => {
    void refetch();
  }, [isSignedIn, refetch]);

  return {
    profileData,
    profileQueryInfo,
    auth,
  };
};

import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { api } from "@/utils/api";

export const useMe = () => {
  const { data: userData, ...userQueryInfo } = api.me.userQuery.useQuery(undefined, { retry: false });
  const auth = useClerk();

  const { refetch } = userQueryInfo;
  const { isSignedIn } = useUser();

  useEffect(() => {
    void refetch();
  }, [isSignedIn, refetch]);

  return {
    userData,
    userQueryInfo,
    auth,
    isSignedIn,
  };
};

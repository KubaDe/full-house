import { useClerk, useUser as useClerkUser } from "@clerk/nextjs";
import { api } from "@/utils/api";

const useMockedAuth = () => {
  return {
    signOut: () => {},
  };
};

const useMockedUser = () => {
  return {
    isSignedIn: true,
  };
};

const useAuth = process.env.NEXT_PUBLIC_MOCKED_USER_ID ? useMockedAuth : useClerk;
const useUser = process.env.NEXT_PUBLIC_MOCKED_USER_ID ? useMockedUser : useClerkUser;

export const useMe = () => {
  const { data: userData, ...userQueryInfo } = api.me.userQuery.useQuery(undefined, {
    retry: false,
  });
  const auth = useAuth();
  const { isSignedIn } = useUser();

  return {
    userData,
    userQueryInfo,
    auth,
    isSignedIn,
  };
};

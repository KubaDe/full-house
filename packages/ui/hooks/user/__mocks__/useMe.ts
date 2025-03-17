import { type useClerk } from "@clerk/nextjs";
import { type inferRouterOutputs } from "@trpc/server";
import { type PartialDeep } from "type-fest";
import { type api, MeRouter } from "@repo/api/client";
import { defaultAvatar } from "@repo/schemas";

export const useMe = () => {
  return {
    userData: {
      id: "hardcoded-user-id",
      clerkId: "hardcoded-clerk-id",
      email: "foo@bar.com",
      profile: {
        id: "hardcoded",
        name: "Test User",
        avatar: defaultAvatar,
      },
      createdAt: new Date("2021-01-01T00:00:00Z"),
    } satisfies inferRouterOutputs<MeRouter>["userQuery"],
    profileQueryInfo: {
      isLoading: false,
    } satisfies PartialDeep<ReturnType<typeof api.me.userQuery.useQuery>>,
    auth: {
      user: {
        id: "hardcoded-user-id",
        primaryEmailAddress: { emailAddress: "foo@bar.com" },
      },
      buildSignInUrl: () => "/sign-in",
    } satisfies PartialDeep<ReturnType<typeof useClerk>>,
  };
};

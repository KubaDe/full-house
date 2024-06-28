import { type useClerk } from "@clerk/nextjs";
import { type inferRouterOutputs } from "@trpc/server";
import { type PartialDeep } from "type-fest";
import { type api } from "@/utils/api";
import { type MeRouter } from "@/server/api/user/meRouter";

export const useMe = () => {
  return {
    profileData: {
      name: "John Doe",
      email: "foo@mail.com",
      createdAt: new Date("2021-01-01T00:00:00Z"),
    } satisfies inferRouterOutputs<MeRouter>["profile"],
    profileQueryInfo: {
      isLoading: false,
    } satisfies PartialDeep<ReturnType<typeof api.me.profile.useQuery>>,
    auth: {
      user: {
        id: "hardcoded-user-id",
      },
      buildSignInUrl: () => "/sign-in",
    } satisfies PartialDeep<ReturnType<typeof useClerk>>,
  };
};

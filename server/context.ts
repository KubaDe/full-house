import type * as trpcNext from "@trpc/server/adapters/next";
import { getAuth, currentUser } from "@clerk/nextjs/server";

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  if (process.env.NEXT_PUBLIC_MOCKED_USER_ID) {
    return {
      auth: {
        userId: process.env.NEXT_PUBLIC_MOCKED_USER_ID,
        email: process.env.NEXT_PUBLIC_MOCKED_USER_EMAIL,
      },
    };
  }
  // TODO: Test it with internet
  const { primaryEmailAddress } = (await currentUser()) ?? {};
  const auth = getAuth(opts.req);
  return {
    auth: {
      email: primaryEmailAddress?.emailAddress,
      userId: auth.userId,
    },
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

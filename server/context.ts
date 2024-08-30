import type * as trpcNext from "@trpc/server/adapters/next";
import { clerkClient, getAuth } from "@clerk/nextjs/server";

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  if (process.env.NEXT_PUBLIC_MOCKED_USER_ID) {
    return {
      auth: {
        userId: process.env.NEXT_PUBLIC_MOCKED_USER_ID,
        email: process.env.NEXT_PUBLIC_MOCKED_USER_EMAIL,
      },
    };
  }
  const auth = getAuth(opts.req);
  const user = auth.userId ? await clerkClient.users.getUser(auth.userId) : null;
  return {
    auth: {
      email: user?.primaryEmailAddress?.emailAddress,
      userId: auth.userId,
    },
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

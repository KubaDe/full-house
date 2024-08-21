import type * as trpcNext from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  if (process.env.NEXT_PUBLIC_MOCKED_USER_ID) {
    return {
      auth: {
        userId: process.env.NEXT_PUBLIC_MOCKED_USER_ID,
      },
    };
  }
  return { auth: getAuth(opts.req) };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

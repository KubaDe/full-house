import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  status: publicProcedure.query(() => {
    return {
      status: "ok",
    };
  }),
});

export type AppRouter = typeof appRouter;

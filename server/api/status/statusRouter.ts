import { protectedProcedure, publicProcedure, router } from "../../trpc";

export const statusRouter = router({
  status: publicProcedure.query(() => {
    return {
      status: "ok",
    };
  }),
  secret: protectedProcedure.query(({ ctx }) => {
    return {
      secret: `${ctx.auth?.userId} is using a protected procedure`,
    };
  }),
});

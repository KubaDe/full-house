import { protectedProcedure, router } from "../../trpc";

export const meRouter = router({
  profile: protectedProcedure.query(({ ctx }) => {
    return {
      name: "John Doe",
      email: "foobar@mail.com",
      createdAt: ctx.user.createdAt,
    };
  }),
});

export type MeRouter = typeof meRouter;

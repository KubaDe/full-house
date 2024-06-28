import { protectedProcedure, router } from "../../trpc";

export const meRouter = router({
  profile: protectedProcedure.query(() => {
    return {
      name: "John Doe",
      email: "foobar@mail.com",
      createdAt: new Date(),
    };
  }),
});

export type MeRouter = typeof meRouter;

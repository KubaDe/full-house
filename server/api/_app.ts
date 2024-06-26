import { router } from "../trpc";
import { statusRouter } from "./status/statusRouter";
import { meRouter } from "./user/meRouter";

export const appRouter = router({
  status: statusRouter,
  me: meRouter,
});

export type AppRouter = typeof appRouter;

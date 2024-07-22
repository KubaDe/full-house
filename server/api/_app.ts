// import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { statusRouter } from "./status/statusRouter";
import { meRouter } from "./user/meRouter";
import { userRoomRouter } from "./room/userRoomRouter";

export const appRouter = router({
  status: statusRouter,
  me: meRouter,
  userRoom: userRoomRouter,
});

export type AppRouter = typeof appRouter;

// export type RouterInput = inferRouterInputs<AppRouter>;
// export type RouterOutput = inferRouterOutputs<AppRouter>;

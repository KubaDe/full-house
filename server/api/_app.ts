// import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { statusRouter } from "./status/router/statusRouter";
import { meRouter } from "./user/router/meRouter";
import { roomRouter } from "./room/router/roomRouter";
import { invitationRouter } from "./invitation/router/invitationRouter";

export const appRouter = router({
  status: statusRouter,
  me: meRouter,
  room: roomRouter,
  invitation: invitationRouter,
});

export type AppRouter = typeof appRouter;

// export type RouterInput = inferRouterInputs<AppRouter>;
// export type RouterOutput = inferRouterOutputs<AppRouter>;

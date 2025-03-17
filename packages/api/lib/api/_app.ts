// import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { router } from "./trpc";
import { statusRouter } from "./status/router/statusRouter";
import { meRouter } from "./user/router/meRouter";
import { roomRouter } from "./room/router/roomRouter";
import { invitationRouter } from "./invitation/router/invitationRouter";
import { eventRouter } from "./event/router/invitationRouter";
import { sessionRouter } from "./session/router/sessionRouter";

export const appRouter = router({
  status: statusRouter,
  me: meRouter,
  room: roomRouter,
  invitation: invitationRouter,
  event: eventRouter,
  session: sessionRouter,
});

export type AppRouter = typeof appRouter;

// export type RouterInput = inferRouterInputs<AppRouter>;
// export type RouterOutput = inferRouterOutputs<AppRouter>;

import { router } from "../../trpc";
import { pushInputEventMutation } from "../pushInputEventMutation";
import { sessionEventSubscription } from "../sessionEventSubscription";

export const eventRouter = router({
  pushInputEventMutation,
  sessionEventSubscription,
});

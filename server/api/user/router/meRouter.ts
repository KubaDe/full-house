import { router } from "../../../trpc";
import { userQuery } from "../userQuery";
import { updateProfileMutation } from "../updateProfileMutation";

export const meRouter = router({
  userQuery,
  updateProfileMutation,
});

export type MeRouter = typeof meRouter;

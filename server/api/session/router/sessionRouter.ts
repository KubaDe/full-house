import { router } from "../../../trpc";
import { resetSessionsMutation } from "../resetSessionsMutation";
import { createSessionMutation } from "../createSessionMutation";
import { activeParticipantsQuery } from "../activeParticipantsQuery";
import { joinedParticipantsQuery } from "../joinedParticipantsQuery";

export const sessionRouter = router({
  resetSessionsMutation,
  createSessionMutation,
  activeParticipantsQuery,
  joinedParticipantsQuery,
});

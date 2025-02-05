import { router } from "../../../trpc";
import { chatRouter } from "../chat/router/chatRouter";
import { roomSessionsQuery } from "../roomSessionsQuery";
import { resetSessionsMutation } from "../resetSessionsMutation";
import { createSessionMutation } from "../createSessionMutation";
import { activeParticipantsQuery } from "../activeParticipantsQuery";
import { joinedParticipantsQuery } from "../joinedParticipantsQuery";
import { roomAggregatedJoinedParticipantsQuery } from "../roomAggregatedJoinedParticipantsQuery";
import { roomAggregatedActiveParticipantsQuery } from "../roomAggregatedActiveParticipantsQuery";

export const sessionRouter = router({
  roomSessionsQuery,
  resetSessionsMutation,
  createSessionMutation,
  activeParticipantsQuery,
  joinedParticipantsQuery,
  roomAggregatedJoinedParticipantsQuery,
  roomAggregatedActiveParticipantsQuery,
  chat: chatRouter,
});

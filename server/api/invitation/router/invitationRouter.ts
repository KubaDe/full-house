import { router } from "../../../trpc";
import { inviteUserToRoomMutation } from "../inviteUserToRoomMutation";
import { switchOpenInvitationMutation } from "../switchOpenInvitationMutation";
import { userToRoomInvitationsQuery } from "../userToRoomInvitationsQuery";
import { roomOpenInvitationQuery } from "../roomOpenInvitationQuery";

export const invitationRouter = router({
  userToRoomInvitationsQuery,
  roomOpenInvitationQuery,
  inviteUserToRoomMutation,
  switchOpenInvitationMutation,
});

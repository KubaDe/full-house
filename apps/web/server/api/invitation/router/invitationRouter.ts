import { router } from "../../../trpc";
import { inviteUserToRoomMutation } from "../inviteUserToRoomMutation";
import { switchOpenInvitationMutation } from "../switchOpenInvitationMutation";
import { userToRoomInvitationsQuery } from "../userToRoomInvitationsQuery";
import { roomOpenInvitationQuery } from "../roomOpenInvitationQuery";
import { myInvitationsQuery } from "../myInvitationsQuery";
import { respondInvitationMutation } from "../respondInvitationMutation";

export const invitationRouter = router({
  myInvitationsQuery,
  userToRoomInvitationsQuery,
  roomOpenInvitationQuery,
  inviteUserToRoomMutation,
  switchOpenInvitationMutation,
  respondInvitationMutation,
});

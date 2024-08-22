import { router } from "../../../trpc";
import { inviteUserToRoomMutation } from "../inviteUserToRoomMutation";
import { userToRoomInvitationsQuery } from "../userToRoomInvitationsQuery";

export const invitationRouter = router({
  userToRoomInvitationsQuery,
  inviteUserToRoomMutation,
});

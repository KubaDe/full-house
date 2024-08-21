import { router } from "../../../trpc";
import { inviteUserToRoomMutation } from "../inviteUserToRoomMutation";

export const invitationRouter = router({
  inviteUserToRoomMutation,
});

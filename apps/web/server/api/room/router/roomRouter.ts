import { router } from "../../../trpc";
import { userRoomsQuery } from "../userRoomsQuery";
import { userRoomQuery } from "../userRoomQuery";
import { participantsQuery } from "../participantsQuery";
import { deleteRoomMutation } from "../deleteRoomMutation";
import { addRoomMutation } from "../addRoomMutation";
import { leaveRoomMutation } from "../leaveRoomMutation";

export const roomRouter = router({
  userRoomsQuery,
  userRoomQuery,
  addRoomMutation,
  deleteRoomMutation,
  participantsQuery,
  leaveRoomMutation,
});

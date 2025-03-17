import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@repo/db";
import {
  userToTheRoomInvitationsQueryInputSchema,
  userToTheRoomInvitationsQueryOutputSchema,
} from "@repo/schemas";
export const userToRoomInvitationsQuery = protectedProcedure
  .input(userToTheRoomInvitationsQueryInputSchema)
  .output(userToTheRoomInvitationsQueryOutputSchema.nullish())
  .unstable_concat(requireRoomParticipantMiddleware)
  .query(async ({ input }) => {
    const { roomId } = input;
    const userToRoomInvitations = await db.invitation.findMany({
      where: { roomId },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return userToTheRoomInvitationsQueryOutputSchema.safeParse(
      userToRoomInvitations,
    ).data;
  });

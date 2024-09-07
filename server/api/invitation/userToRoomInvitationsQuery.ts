import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import {
  userToTheRoomInvitationsQueryInputSchema,
  userToTheRoomInvitationsQueryOutputSchema,
} from "@/modules/invitation/schemas/api";

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
    return userToTheRoomInvitationsQueryOutputSchema.safeParse(userToRoomInvitations).data;
  });

import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import {
  roomOpenInvitationQueryInputSchema,
  roomOpenInvitationQueryOutputSchema,
} from "@/modules/invitation/schemas/api";

export const roomOpenInvitationQuery = protectedProcedure
  .input(roomOpenInvitationQueryInputSchema)
  .output(roomOpenInvitationQueryOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .query(async ({ input }) => {
    const { roomId } = input;
    const userToRoomInvitation = await db.invitation.findFirst({
      where: { roomId, isOpen: true },
    });

    if (!userToRoomInvitation) {
      return null;
    }

    return roomOpenInvitationQueryOutputSchema.safeParse({
      id: userToRoomInvitation.id,
      link: `${process.env.NEXT_PUBLIC_BASE_URL}/invitation/${userToRoomInvitation.id}`,
    }).data;
  });

import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import {
  inviteUserToRoomMutationInputSchema,
  inviteUserToRoomMutationOutputSchema,
} from "@/modules/invitation/schemas/api";

export const inviteUserToRoomMutation = protectedProcedure
  .input(inviteUserToRoomMutationInputSchema)
  .output(inviteUserToRoomMutationOutputSchema.nullish())
  .unstable_concat(requireRoomParticipantMiddleware)
  .mutation(async ({ ctx, input }) => {
    const existingUser = await db.user.findFirst({ where: { email: input.userEmail } });

    const existingInvitation = await db.invitation.findFirst({
      where: { roomId: input.roomId, email: input.userEmail, isOpen: false },
    });

    if (existingInvitation) {
      const invitation = await db.invitation.update({
        where: {
          id: existingInvitation.id,
        },
        data: {
          receiverId: existingUser?.id,
          email: input.userEmail,
          updatedAt: new Date(),
        },
      });
      return inviteUserToRoomMutationOutputSchema.safeParse(invitation).data;
    }

    const invitation = await db.invitation.create({
      data: {
        receiverId: existingUser?.id,
        senderId: ctx.user.id,
        email: input.userEmail,
        roomId: input.roomId,
        isOpen: false,
      },
    });

    return inviteUserToRoomMutationOutputSchema.safeParse(invitation).data;
  });

import crypto from "crypto";
import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@repo/db";
import {
  switchOpenInvitationMutationInputSchema,
  switchOpenInvitationMutationOutputSchema,
} from "@repo/schemas";
export const switchOpenInvitationMutation = protectedProcedure
  .input(switchOpenInvitationMutationInputSchema)
  .output(switchOpenInvitationMutationOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .mutation(async ({ ctx, input }) => {
    const existingInvitation = await db.invitation.findFirst({
      where: {
        OR: [{ roomId: input.roomId, email: null, isOpen: true }],
      },
    });

    if (existingInvitation) {
      if (input.value) {
        const invitation = await db.invitation.update({
          where: {
            id: existingInvitation.id,
          },
          data: {
            updatedAt: new Date(),
          },
        });
        return switchOpenInvitationMutationOutputSchema.safeParse(invitation)
          .data;
      }
      await db.invitation.delete({
        where: {
          id: existingInvitation.id,
        },
      });
      return null;
    }

    if (input.value) {
      const invitation = await db.invitation.create({
        data: {
          senderId: ctx.user.id,
          roomId: input.roomId,
          isOpen: true,
          token: crypto.randomBytes(32).toString("hex"),
        },
      });
      return switchOpenInvitationMutationOutputSchema.safeParse(invitation)
        .data;
    }
    return null;
  });

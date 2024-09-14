import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import { respondMutationInputSchema, respondMutationOutputSchema } from "@/modules/invitation/schemas/api";
import { requireInvitationReceiverMiddleware } from "@/server/api/authorization/requireInvitationReceiverMiddleware";

export const respondInvitationMutation = protectedProcedure
  .input(respondMutationInputSchema)
  .output(respondMutationOutputSchema)
  .unstable_concat(requireInvitationReceiverMiddleware)
  .mutation(async ({ ctx, input }) => {
    const invitation = await db.invitation.findFirst({
      where: { email: ctx.user.email, id: input.invitationId },
    });

    if (!invitation) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invitation not found",
      });
    }

    if (input.accept) {
      await db.$transaction([
        db.usersOnRooms.create({
          data: {
            userId: ctx.user.id,
            roomId: invitation.roomId,
          },
        }),
        db.invitation.delete({
          where: {
            id: input.invitationId,
          },
        }),
      ]);
    } else {
      await db.invitation.delete({
        where: {
          id: input.invitationId,
        },
      });
    }
    return respondMutationOutputSchema.safeParse(null).data;
  });

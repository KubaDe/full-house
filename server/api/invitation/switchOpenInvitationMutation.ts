import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import {
  switchOpenInvitationMutationInputSchema,
  switchOpenInvitationMutationOutputSchema,
} from "@/modules/invitation/schemas/api";

export const switchOpenInvitationMutation = protectedProcedure
  .input(switchOpenInvitationMutationInputSchema)
  .output(switchOpenInvitationMutationOutputSchema)
  .use(async (opts) => {
    const canChange = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
      },
    });

    if (!canChange) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't update this invitation",
      });
    }

    return opts.next();
  })
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
        return switchOpenInvitationMutationOutputSchema.safeParse(invitation).data;
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
        },
      });
      return switchOpenInvitationMutationOutputSchema.safeParse(invitation).data;
    }
    return null;
  });

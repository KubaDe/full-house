import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import {
  inviteUserToRoomMutationInputSchema,
  inviteUserToRoomMutationOutputSchema,
} from "@/modules/invitation/schemas/api";

export const inviteUserToRoomMutation = protectedProcedure
  .input(inviteUserToRoomMutationInputSchema)
  .output(inviteUserToRoomMutationOutputSchema.nullish())
  .use(async (opts) => {
    const canInvite = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
      },
    });

    if (!canInvite) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't invite to this room",
      });
    }

    return opts.next();
  })
  .mutation(async ({ ctx, input }) => {
    const existingUser = await db.user.findFirst({ where: { email: input.userEmail } });
    const existingInvitation = await db.invitation.findFirst({
      where: { roomId: input.roomId, email: input.userEmail },
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
        isOpen: !!input.isOpen,
      },
    });

    return inviteUserToRoomMutationOutputSchema.safeParse(invitation).data;
  });

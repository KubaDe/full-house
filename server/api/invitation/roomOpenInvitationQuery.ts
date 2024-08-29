import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import {
  roomOpenInvitationQueryInputSchema,
  roomOpenInvitationQueryOutputSchema,
} from "@/modules/invitation/schemas/api/roomOpenInvitationQuery";

export const roomOpenInvitationQuery = protectedProcedure
  .input(roomOpenInvitationQueryInputSchema)
  .output(roomOpenInvitationQueryOutputSchema)
  .use(async (opts) => {
    const canAccess = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
      },
    });

    if (!canAccess) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't access this room",
      });
    }

    return opts.next();
  })
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

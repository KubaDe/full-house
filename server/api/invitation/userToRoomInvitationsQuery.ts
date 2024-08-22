import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";
import {
  userToTheRoomInvitationsQueryInputSchema,
  userToTheRoomInvitationsQueryOutputSchema,
} from "@/modules/invitation/schemas/api/userToRoomInvitationsQuery";

export const userToRoomInvitationsQuery = protectedProcedure
  .input(userToTheRoomInvitationsQueryInputSchema)
  .output(userToTheRoomInvitationsQueryOutputSchema.nullish())
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
    const userToRoomInvitations = await db.invitation.findMany({
      where: { roomId },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return userToTheRoomInvitationsQueryOutputSchema.safeParse(userToRoomInvitations).data;
  });

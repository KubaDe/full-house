import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";

export const deleteRoomMutation = protectedProcedure
  .input(z.object({ roomId: z.string() }))
  .use(async (opts) => {
    const canDelete = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
        isOwner: true,
      },
    });

    if (!canDelete) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't delete this room",
      });
    }

    return opts.next();
  })
  .mutation(async ({ input }) => {
    const { roomId } = input;
    await db.room.delete({
      where: {
        id: roomId,
      },
    });
  });

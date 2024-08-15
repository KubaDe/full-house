import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { db } from "@/server/db/prisma";

export const leaveRoomMutation = protectedProcedure
  .input(z.object({ roomId: z.string() }))
  .use(async (opts) => {
    const canLeave = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
      },
    });

    if (!canLeave) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You can't leave this room",
      });
    }

    return opts.next();
  })
  .mutation(async ({ input, ctx }) => {
    const { roomId } = input;
    await db.usersOnRooms.deleteMany({
      where: {
        roomId,
        userId: ctx.user.id,
      },
    });
  });

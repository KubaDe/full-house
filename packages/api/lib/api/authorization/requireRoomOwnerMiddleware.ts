import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { db } from "@repo/db";
export const requireRoomOwnerMiddleware = protectedProcedure
  .input(z.object({ roomId: z.string() }))
  .use(async (opts) => {
    const canAccess = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
        isOwner: true,
      },
    });

    if (!canAccess) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Room not found or you have no access to it.",
      });
    }

    return opts.next();
  });

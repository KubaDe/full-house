import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/trpc";
import { db } from "@/server/db/prisma";

export const requireRoomParticipantMiddleware = protectedProcedure
  .input(z.object({ roomId: z.string() }))
  .use(async (opts) => {
    const canAccess = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
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

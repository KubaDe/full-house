import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "@/server/trpc";
import { db } from "@/server/db/prisma";

export const requireSessionAllowedMiddleware = protectedProcedure
  .input(z.object({ sessionId: z.string() }))
  .use(async (opts) => {
    const session = await db.session.findFirst({
      where: {
        id: opts.input.sessionId,
      },
    });

    if (!session) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Session not found",
      });
    }
    const roomId = session.roomId;

    if (!roomId) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Session not found",
      });
    }

    const canAccess = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId,
      },
    });

    if (!canAccess) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Session not found",
      });
    }

    return opts.next();
  });

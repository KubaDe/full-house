import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { db } from "@repo/db";
import { protectedProcedure } from "../trpc";
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
        message: `Session ${opts.input.sessionId} not found`,
      });
    }
    const roomId = session.roomId;

    if (!roomId) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Session ${opts.input.sessionId} not found`,
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

    return opts.next({
      ...opts,
      ctx: {
        ...opts.ctx,
        roomId,
      },
      input: {
        ...opts.input,
      },
    });
  });

import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { db } from "@repo/db";
export const requireInvitationReceiverMiddleware = protectedProcedure
  .input(z.object({ invitationId: z.string() }))
  .use(async (opts) => {
    const canAccess = await db.invitation.findFirst({
      where: {
        email: opts.ctx.user.email,
      },
    });

    if (!canAccess) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Invitation not found or you have no access to it.",
      });
    }

    return opts.next();
  });

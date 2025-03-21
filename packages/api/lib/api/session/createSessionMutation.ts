import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import {
  createSessionMutationInputSchema,
  createSessionMutationOutputSchema,
} from "@repo/schemas";
import { db } from "@repo/db";
import { sessionLifecycleService } from "@repo/services/session";

export const createSessionMutation = protectedProcedure
  .input(createSessionMutationInputSchema)
  .output(createSessionMutationOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .mutation(async ({ input, ctx }) => {
    const { roomId, type } = input;

    const existingSession = await db.session.findFirst({
      where: {
        roomId,
        type,
      },
    });
    if (existingSession) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "Session already exists",
      });
    }
    await sessionLifecycleService.createSession({
      roomId,
      userId: ctx.user.id,
      type,
    });
  });

import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import {
  resetSessionsMutationInputSchema,
  resetSessionsMutationOutputSchema,
} from "@repo/schemas";
import { db } from "@repo/db";
export const resetSessionsMutation = protectedProcedure
  .input(resetSessionsMutationInputSchema)
  .output(resetSessionsMutationOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .mutation(async ({ input }) => {
    const { roomId } = input;
    const room = await db.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Room not found",
      });
    }

    await db.session.deleteMany({
      where: {
        room: {
          id: roomId,
        },
      },
    });
  });

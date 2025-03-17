import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { requireRoomOwnerMiddleware } from "../authorization/requireRoomOwnerMiddleware";
import { db } from "@repo/db";
export const deleteRoomMutation = protectedProcedure
  .input(z.object({ roomId: z.string() }))
  .unstable_concat(requireRoomOwnerMiddleware)
  .mutation(async ({ input }) => {
    const { roomId } = input;

    await db.room.delete({
      where: {
        id: roomId,
      },
      include: { sessions: true },
    });
  });

import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";

export const leaveRoomMutation = protectedProcedure
  .input(z.object({ roomId: z.string() }))
  .unstable_concat(requireRoomParticipantMiddleware)
  .mutation(async ({ input, ctx }) => {
    const { roomId } = input;
    await db.usersOnRooms.deleteMany({
      where: {
        roomId,
        userId: ctx.user.id,
      },
    });
  });

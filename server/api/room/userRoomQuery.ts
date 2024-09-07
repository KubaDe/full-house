import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import { userRoomOutputSchema } from "@/modules/room/schemas/userRoomSchema";

export const userRoomQuery = protectedProcedure
  .input(z.object({ roomId: z.string() }))
  .output(userRoomOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .query(async ({ ctx, input }) => {
    const { roomId } = input;
    const userRoom = await db.usersOnRooms.findUnique({
      where: {
        userId_roomId: {
          userId: ctx.user.id,
          roomId,
        },
      },
      include: {
        room: true,
      },
    });
    if (!userRoom) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Room not found",
      });
    }
    return userRoom;
  });

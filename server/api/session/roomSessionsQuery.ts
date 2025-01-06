import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { db } from "@/server/db/prisma";
import {
  roomSessionsQueryInputSchema,
  roomSessionsQueryOutputSchema,
} from "@/modules/session/schemas/api/roomSessionsSchema";

export const roomSessionsQuery = protectedProcedure
  .input(roomSessionsQueryInputSchema)
  .output(roomSessionsQueryOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .query(async (opts) => {
    const userRoom = await db.usersOnRooms.findFirst({
      where: {
        userId: opts.ctx.user.id,
        roomId: opts.input.roomId,
      },
      include: {
        room: {
          include: {
            sessions: true,
          },
        },
      },
    });

    if (!userRoom) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Room not found",
      });
    }

    return roomSessionsQueryOutputSchema.parse(userRoom.room.sessions);
  });

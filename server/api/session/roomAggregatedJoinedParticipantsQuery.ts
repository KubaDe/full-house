import { protectedProcedure } from "../../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import {
  roomAggregatedJoinedParticipantsQueryInputSchema,
  roomAggregatedJoinedParticipantsQueryOutputSchema,
} from "@/modules/session/schemas/api/roomAggregatedJoinedParticipantsSchema";
import { sessionEventService } from "@/server/services/event/sessionEventService";
import { db } from "@/server/db/prisma";

export const roomAggregatedJoinedParticipantsQuery = protectedProcedure
  .input(roomAggregatedJoinedParticipantsQueryInputSchema)
  .output(roomAggregatedJoinedParticipantsQueryOutputSchema)
  .unstable_concat(requireRoomParticipantMiddleware)
  .query(async (opts) => {
    // TODO: Optimize this query to not query all sessions from postgres
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
    const sessionIds = userRoom?.room?.sessions?.map((session) => session.id) ?? [];

    const joinedParticipantsIds = (
      await Promise.all(
        sessionIds.map((sessionId) =>
          sessionEventService.projections.joinedParticipantsProjection({
            sessionId,
          }),
        ),
      )
    )
      .flat()
      .filter((value): value is string => Boolean(value));
    return roomAggregatedJoinedParticipantsQueryOutputSchema.parse(joinedParticipantsIds);
  });

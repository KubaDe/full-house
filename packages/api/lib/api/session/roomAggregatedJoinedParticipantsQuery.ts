import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import {
  roomAggregatedJoinedParticipantsQueryInputSchema,
  roomAggregatedJoinedParticipantsQueryOutputSchema,
} from "@repo/schemas";
import { sessionEventService } from "@repo/services/event";
import { db } from "@repo/db";
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
    const sessionIds =
      userRoom?.room?.sessions?.map((session) => session.id) ?? [];

    const joinedParticipantsIds = (
      await Promise.all(
        sessionIds.map((sessionId) =>
          sessionEventService.projections.meta.joinedParticipantsProjection({
            sessionId,
          }),
        ),
      )
    )
      .flat()
      .filter((value): value is string => Boolean(value));
    return roomAggregatedJoinedParticipantsQueryOutputSchema.parse(
      joinedParticipantsIds,
    );
  });

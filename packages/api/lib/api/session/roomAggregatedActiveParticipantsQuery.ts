import { protectedProcedure } from "../trpc";
import { requireRoomParticipantMiddleware } from "../authorization/requireRoomParticipantMiddleware";
import { sessionEventService } from "@repo/services/event";
import {
  roomAggregatedActiveParticipantsQueryOutputSchema,
  roomAggregatedActiveParticipantsQueryInputSchema,
} from "@repo/schemas";
import { db } from "@repo/db";
export const roomAggregatedActiveParticipantsQuery = protectedProcedure
  .input(roomAggregatedActiveParticipantsQueryInputSchema)
  .output(roomAggregatedActiveParticipantsQueryOutputSchema)
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
          sessionEventService.projections.meta.activeParticipantsProjection({
            sessionId,
          }),
        ),
      )
    )
      .flat()
      .filter((value): value is string => Boolean(value));
    return roomAggregatedActiveParticipantsQueryOutputSchema.parse(
      joinedParticipantsIds,
    );
  });

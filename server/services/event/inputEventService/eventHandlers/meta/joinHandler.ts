import superjson from "superjson";
import type { JoinEvent } from "@/modules/event/schemas/inputEvent/meta/joinEvent";
import { userJoinEventSchema } from "@/modules/event/schemas/sessionEvent/meta/userJoinEvent";
import { rds } from "@/server/db/redis";
import { outputEventService } from "@/server/services/event/outputEventService";
import { invalidateQueryKeySchema, outputEventTypeSchema } from "@/modules/event/schemas/outputEvent";
import { serializeSessionEventToStreamInput } from "@/modules/event/utils/serializeSessionEventToStreamInput";
import { projections } from "@/server/services/event/sessionEventService/projections";

export const joinHandler = async ({
  event,
  userId,
  roomId,
}: {
  event: JoinEvent;
  userId: string;
  roomId: string;
}) => {
  const userJoinEvent = userJoinEventSchema.parse({ userId });

  await rds.xadd(
    `sessionEvents:${event.sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(userJoinEvent),
  );

  const activeParticipants = await projections.meta.activeParticipantsProjection({
    sessionId: event.sessionId,
  });
  const activeParticipantsString = superjson.stringify(activeParticipants);
  const previousActiveParticipantsString = await rds.set(
    `session:${event.sessionId}:activeParticipants`,
    activeParticipantsString,
    "GET",
  );
  if (activeParticipantsString !== previousActiveParticipantsString) {
    await outputEventService.onPush({
      event: {
        roomId: roomId,
        type: outputEventTypeSchema.enum.invalidateQuery,
        payload: {
          keys: [
            invalidateQueryKeySchema.enum.session__joinedParticipantsQuery,
            invalidateQueryKeySchema.enum.session__roomAggregatedJoinedParticipantsQuery,
            invalidateQueryKeySchema.enum.session__activeParticipantsQuery,
            invalidateQueryKeySchema.enum.session__roomAggregatedActiveParticipantsQuery,
            invalidateQueryKeySchema.enum.room__participantsQuery,
          ],
        },
      },
    });
  }
};

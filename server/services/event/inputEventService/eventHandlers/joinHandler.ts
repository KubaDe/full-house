import superjson from "superjson";
import type { JoinEvent } from "@/modules/event/schemas/inputEvent";
import { userJoinEventSchema } from "@/modules/event/schemas/sessionEvent";
import { rds } from "@/server/db/redis";
import { outputEventService } from "@/server/services/event/outputEventService";
import { invalidateQueryKeySchema, outputEventTypeSchema } from "@/modules/event/schemas/outputEvent";
import { serializeSessionEventToStreamInput } from "@/modules/event/utils/serializeSessionEventToStreamInput";
import { activeParticipantsProjection } from "@/server/services/event/sessionEventService/projections/activeParticipantsProjection";

export const joinHandler = async ({ event, userId }: { event: JoinEvent; userId: string }) => {
  const userJoinEvent = userJoinEventSchema.parse({ event, userId });

  await rds.xadd(
    `sessionEvents:${event.sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(userJoinEvent),
  );

  const activeParticipants = await activeParticipantsProjection({ sessionId: event.sessionId });
  const activeParticipantsString = superjson.stringify(activeParticipants);
  const previousActiveParticipantsString = await rds.set(
    `session:${event.sessionId}:activeParticipants`,
    activeParticipantsString,
    "GET",
  );
  if (activeParticipantsString !== previousActiveParticipantsString) {
    await outputEventService.onPush({
      event: {
        sessionId: event.sessionId,
        type: outputEventTypeSchema.enum.invalidateQuery,
        payload: {
          keys: [
            invalidateQueryKeySchema.enum.session__joinedParticipantsQuery,
            invalidateQueryKeySchema.enum.session__roomAggregatedJoinedParticipantsQuery,
            invalidateQueryKeySchema.enum.session__activeParticipantsQuery,
            invalidateQueryKeySchema.enum.session__roomAggregatedActiveParticipantsQuery,
          ],
        },
      },
    });
  }
};

import superjson from "superjson";
import { userPingEventSchema } from "@/modules/event/schemas/sessionEvent/meta/userPingEvent";
import { rds } from "@/server/db/redis";
import { type PingEvent } from "@/modules/event/schemas/inputEvent/meta/pingEvent";
import { serializeSessionEventToStreamInput } from "@/modules/event/utils/serializeSessionEventToStreamInput";
import { outputEventService } from "@/server/services/event/outputEventService";
import { invalidateQueryKeySchema, outputEventTypeSchema } from "@/modules/event/schemas/outputEvent";
import { projections } from "@/server/services/event/sessionEventService/projections";

export const pingHandler = async ({ event, userId }: { event: PingEvent; userId: string }) => {
  const userPingEvent = userPingEventSchema.parse({
    userId,
  });
  await rds.xadd(
    `sessionEvents:${event.sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(userPingEvent),
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
        sessionId: event.sessionId,
        type: outputEventTypeSchema.enum.invalidateQuery,
        payload: {
          keys: [
            invalidateQueryKeySchema.enum.session__activeParticipantsQuery,
            invalidateQueryKeySchema.enum.session__roomAggregatedActiveParticipantsQuery,
          ],
        },
      },
    });
  }
};

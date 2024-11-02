import superjson from "superjson";
import { userPingEventSchema } from "@/modules/event/schemas/sessionEvent";
import { rds } from "@/server/db/redis";
import { type PingEvent } from "@/modules/event/schemas/inputEvent/pingEvent";
import { serializeSessionEventToStreamInput } from "@/modules/event/utils/serializeSessionEventToStreamInput";
import { outputEventService } from "@/server/services/event/outputEventService";
import { invalidateQueryKeySchema, outputEventTypeSchema } from "@/modules/event/schemas/outputEvent";
import { activeParticipantsProjection } from "@/server/services/event/sessionEventService/projections/activeParticipantsProjection";

export const pingHandler = async ({ event, userId }: { event: PingEvent; userId: string }) => {
  const userPingEvent = userPingEventSchema.parse({
    event,
    userId,
  });
  await rds.xadd(
    `sessionEvents:${event.sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(userPingEvent),
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
          key: invalidateQueryKeySchema.enum.session__activeParticipantsQuery,
        },
      },
    });
  }
};

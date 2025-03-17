import superjson from "superjson";
import { rds } from "@repo/db";

import { projections } from "../../../sessionEventService/projections";
import {
  invalidateQueryKeySchema,
  outputEventTypeSchema,
  userPingEventSchema,
  PingEvent,
} from "@repo/schemas";
import { serializeSessionEventToStreamInput } from "@repo/utils";
import { outputEventService } from "../../../outputEventService";

export const pingHandler = async ({
  event,
  userId,
  roomId,
}: {
  event: PingEvent;
  userId: string;
  roomId: string;
}) => {
  const userPingEvent = userPingEventSchema.parse({
    userId,
  });
  await rds.xadd(
    `sessionEvents:${event.sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(userPingEvent),
  );

  const activeParticipants =
    await projections.meta.activeParticipantsProjection({
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
        roomId,
        type: outputEventTypeSchema.enum.invalidateQuery,
        payload: {
          keys: [
            invalidateQueryKeySchema.enum.session__activeParticipantsQuery,
            invalidateQueryKeySchema.enum
              .session__roomAggregatedActiveParticipantsQuery,
          ],
        },
      },
    });
  }
};

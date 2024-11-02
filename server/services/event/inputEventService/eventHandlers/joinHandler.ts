import type { JoinEvent } from "@/modules/event/schemas/inputEvent";
import { userJoinEventSchema } from "@/modules/event/schemas/sessionEvent";
import { rds } from "@/server/db/redis";
import { outputEventService } from "@/server/services/event/outputEventService";
import { invalidateQueryKeySchema, outputEventTypeSchema } from "@/modules/event/schemas/outputEvent";
import { serializeSessionEventToStreamInput } from "@/modules/event/utils/serializeSessionEventToStreamInput";

export const joinHandler = async ({ event, userId }: { event: JoinEvent; userId: string }) => {
  const userJoinEvent = userJoinEventSchema.parse({ event, userId });

  await rds.xadd(
    `sessionEvents:${event.sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(userJoinEvent),
  );

  await outputEventService.onPush({
    event: {
      sessionId: event.sessionId,
      type: outputEventTypeSchema.enum.invalidateQuery,
      payload: {
        key: invalidateQueryKeySchema.enum.session__joinedParticipantsQuery,
      },
    },
  });
};

import type { MessageEvent } from "@/modules/event/schemas/inputEvent/chat/messageEvent";
import { messageEventSchema } from "@/modules/event/schemas/sessionEvent/chat/messageEvent";
import { rds } from "@/server/db/redis";
import { serializeSessionEventToStreamInput } from "@/modules/event/utils/serializeSessionEventToStreamInput";
import { outputEventService } from "@/server/services/event/outputEventService";
import {
  invalidateQueryKeySchema,
  outputEventTypeSchema,
} from "@/modules/event/schemas/outputEvent";

export const messageHandler = async ({
  event,
  userId,
  roomId,
}: {
  event: MessageEvent;
  userId: string;
  roomId: string;
}) => {
  const messageEvent = messageEventSchema.parse({
    userId,
    payload: { message: event.message },
  });

  await rds.xadd(
    `sessionEvents:${event.sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(messageEvent),
  );

  await outputEventService.onPush({
    event: {
      roomId,
      type: outputEventTypeSchema.enum.invalidateQuery,
      payload: {
        keys: [invalidateQueryKeySchema.enum.session__chat__liveMessagesQuery],
      },
    },
  });
};

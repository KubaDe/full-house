import { rds } from "@repo/db";
import {
  invalidateQueryKeySchema,
  messageEventSchema,
  outputEventTypeSchema,
  SendMessageEvent,
} from "@repo/schemas";
import { serializeSessionEventToStreamInput } from "@repo/utils";
import { outputEventService } from "../../../outputEventService";

export const messageHandler = async ({
  event,
  userId,
  roomId,
}: {
  event: SendMessageEvent;
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

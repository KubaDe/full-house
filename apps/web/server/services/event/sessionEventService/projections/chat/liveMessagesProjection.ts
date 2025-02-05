import { rds } from "@/server/db/redis";
import { deserializeStreamOutputToSessionEvent } from "@/modules/event/utils/deserializeStreamOutputToSessionEvent";
import { messageEventSchema } from "@/modules/event/schemas/sessionEvent/chat/messageEvent";
import { type MessageEvent } from "@/modules/event/schemas/inputEvent/chat/messageEvent";

type activeParticipantsProjectionProps = {
  sessionId: string;
  cursor?: string;
};

export const liveMessagesProjection = async ({
  sessionId,
  cursor = "-",
}: activeParticipantsProjectionProps) => {
  try {
    const entries = await rds.xrevrange(
      `sessionEvents:${sessionId}`,
      "+",
      cursor,
    );
    const messages = entries
      .map(deserializeStreamOutputToSessionEvent)
      .filter((event) => messageEventSchema.safeParse(event).data)
      .filter((event): event is MessageEvent => !!event);
    return messages;
  } catch (error) {
    console.error("liveMessagesProjection error", error);
    return [];
  }
};

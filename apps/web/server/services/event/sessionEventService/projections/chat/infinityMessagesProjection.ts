import { rds } from "@/server/db/redis";
import { deserializeStreamOutputToSessionEvent } from "@/modules/event/utils/deserializeStreamOutputToSessionEvent";
import { messageEventSchema } from "@/modules/event/schemas/sessionEvent/chat/messageEvent";
import { type MessageEvent } from "@/modules/event/schemas/inputEvent/chat/messageEvent";

type activeParticipantsProjectionProps = {
  sessionId: string;
  cursor?: string;
  limit: number;
};

export const infinityMessagesProjection = async ({
  sessionId,
  limit,
  cursor = "+",
}: activeParticipantsProjectionProps) => {
  try {
    const entries = await rds.xrevrange(
      `sessionEvents:${sessionId}`,
      cursor,
      "-",
      "COUNT",
      String(limit),
    );
    const remainedEntries = await rds.xrevrange(
      `sessionEvents:${sessionId}`,
      `(${entries[entries.length - 1]?.[0]}`,
      "-",
    );
    const moreCount = remainedEntries
      .map(deserializeStreamOutputToSessionEvent)
      .filter((event) => messageEventSchema.safeParse(event).data)
      .filter((event): event is MessageEvent => !!event).length;

    const messages = entries
      .map(deserializeStreamOutputToSessionEvent)
      .filter((event) => messageEventSchema.safeParse(event).data)
      .filter((event): event is MessageEvent => !!event);

    return {
      messages,
      moreCount,
    };
  } catch (error) {
    console.error("infinityMessagesProjection error", error);
    return {
      messages: [],
      moreCount: 0,
    };
  }
};

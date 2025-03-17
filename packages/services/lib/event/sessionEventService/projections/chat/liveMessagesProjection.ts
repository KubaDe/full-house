import { rds } from "@repo/db";
import { deserializeStreamOutputToSessionEvent } from "@repo/utils";
import { messageEventSchema, MessageEvent } from "@repo/schemas";

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

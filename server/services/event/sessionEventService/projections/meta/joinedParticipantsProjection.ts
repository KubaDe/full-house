import { uniq } from "lodash";
import { rds } from "@/server/db/redis";
import { deserializeStreamOutputToSessionEvent } from "@/modules/event/utils/deserializeStreamOutputToSessionEvent";
import { sessionEventTypeSchema } from "@/modules/event/schemas/sessionEvent";

type joinedParticipantsProjectionProps = {
  sessionId: string;
};

export const joinedParticipantsProjection = async ({ sessionId }: joinedParticipantsProjectionProps) => {
  const entries = await rds.xrange(`sessionEvents:${sessionId}`, "-", "+");
  const events = entries.map(deserializeStreamOutputToSessionEvent);
  const userIds = events
    .filter((event) => event?.type === sessionEventTypeSchema.enum.userJoin)
    .map((event) => event?.userId);
  return uniq(userIds);
};

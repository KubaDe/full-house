import { uniq } from "lodash-es";
import { rds } from "@repo/db";
import { deserializeStreamOutputToSessionEvent } from "@repo/utils";
import { sessionEventTypeSchema } from "@repo/schemas";

type joinedParticipantsProjectionProps = {
  sessionId: string;
};

export const joinedParticipantsProjection = async ({
  sessionId,
}: joinedParticipantsProjectionProps) => {
  const entries = await rds.xrange(`sessionEvents:${sessionId}`, "-", "+");
  const events = entries.map(deserializeStreamOutputToSessionEvent);
  const userIds = events
    .filter((event) => event?.type === sessionEventTypeSchema.enum.userJoin)
    .map((event) => event?.userId);
  return uniq(userIds);
};

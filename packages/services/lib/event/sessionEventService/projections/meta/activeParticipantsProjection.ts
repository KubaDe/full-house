import { sortBy, uniq } from "lodash-es";
import { dayjs } from "@repo/libs/dayjs";
import { rds } from "@repo/db";
import { deserializeStreamOutputToSessionEvent } from "@repo/utils";

type activeParticipantsProjectionProps = {
  sessionId: string;
};

const ACTIVE_TIME = 1000 * 20;

export const activeParticipantsProjection = async ({
  sessionId,
}: activeParticipantsProjectionProps) => {
  const now = dayjs.utc().valueOf();
  const offset = now - ACTIVE_TIME;

  const startId = `${offset}-0`;
  const endId = `${now}-0`;
  const entries = await rds.xrevrange(
    `sessionEvents:${sessionId}`,
    endId,
    startId,
  );
  const events = entries.map(deserializeStreamOutputToSessionEvent);
  const userIds = events.map((event) => event?.userId);
  return sortBy(uniq(userIds));
};

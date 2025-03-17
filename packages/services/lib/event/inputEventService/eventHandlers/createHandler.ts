import { rds, db } from "@repo/db";

import {
  createEventSchema,
  invalidateQueryKeySchema,
  outputEventTypeSchema,
  sessionTypeSchema,
} from "@repo/schemas";
import { serializeSessionEventToStreamInput } from "@repo/utils";
import { outputEventService } from "../../outputEventService";

export const createHandler = async ({
  sessionId,
  userId,
  roomId,
}: {
  sessionId: string;
  userId: string;
  roomId: string;
}) => {
  const createEvent = createEventSchema.parse({ userId });

  await rds.xadd(
    `sessionEvents:${sessionId}`,
    "*",
    ...serializeSessionEventToStreamInput(createEvent),
  );
  const metaSessionId = (
    await db.session.findUnique({
      where: { id: sessionId },
      select: {
        room: {
          select: {
            sessions: { where: { type: sessionTypeSchema.enum.meta } },
          },
        },
      },
    })
  )?.room.sessions[0]?.id;

  if (!metaSessionId) {
    throw new Error("Meta session not found");
  }

  await outputEventService.onPush({
    event: {
      roomId,
      type: outputEventTypeSchema.enum.invalidateQuery,
      payload: {
        keys: [invalidateQueryKeySchema.enum.session__roomSessionsQuery],
      },
    },
  });
};

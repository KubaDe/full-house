import { rds } from "@/server/db/redis";
import { serializeSessionEventToStreamInput } from "@/modules/event/utils/serializeSessionEventToStreamInput";
import { createEventSchema } from "@/modules/event/schemas/sessionEvent/createEvent";
import { outputEventService } from "@/server/services/event/outputEventService";
import { invalidateQueryKeySchema, outputEventTypeSchema } from "@/modules/event/schemas/outputEvent";
import { db } from "@/server/db/prisma";
import { sessionTypeSchema } from "@/modules/session/schemas/sessionType";

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

  await rds.xadd(`sessionEvents:${sessionId}`, "*", ...serializeSessionEventToStreamInput(createEvent));
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
  )?.room.sessions[0].id;

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

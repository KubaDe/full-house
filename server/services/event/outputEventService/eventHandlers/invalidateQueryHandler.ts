import { type InvalidateQueryEvent } from "@/modules/event/schemas/outputEvent";
import { rds } from "@/server/db/redis";
import { serializeOutputEventToPublish } from "@/modules/event/utils/serializeOutputEventToPublish";

export const invalidateQueryHandler = async ({ event }: { event: InvalidateQueryEvent }) => {
  const invalidateQueryEvent = serializeOutputEventToPublish(event);
  await rds.publish(`outputEvents:${event.roomId}`, invalidateQueryEvent);
};

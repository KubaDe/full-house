import { rds } from "@repo/db";
import { serializeOutputEventToPublish } from "@repo/utils";
import { InvalidateQueryEvent } from "@repo/schemas";

export const invalidateQueryHandler = async ({
  event,
}: {
  event: InvalidateQueryEvent;
}) => {
  const invalidateQueryEvent = serializeOutputEventToPublish(event);
  await rds.publish(`outputEvents:${event.roomId}`, invalidateQueryEvent);
};

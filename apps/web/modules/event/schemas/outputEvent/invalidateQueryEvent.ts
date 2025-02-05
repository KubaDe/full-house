import { z } from "zod";
import { outputEventBase } from "./outputEventBase";
import { outputEventTypeSchema } from "./outputEventType";

export const invalidateQueryKeySchema = z.enum([
  //ROOM
  "session__roomSessionsQuery",
  "room__participantsQuery",
  // META
  "session__joinedParticipantsQuery",
  "session__activeParticipantsQuery",
  "session__roomAggregatedJoinedParticipantsQuery",
  "session__roomAggregatedActiveParticipantsQuery",
  // CHAT
  "session__chat__liveMessagesQuery",
]);

export const invalidateQueryEventSchema = outputEventBase.extend({
  type: z.literal(outputEventTypeSchema.enum.invalidateQuery),
  payload: z.object({
    keys: z.array(invalidateQueryKeySchema),
  }),
});

export type InvalidateQueryEvent = z.infer<typeof invalidateQueryEventSchema>;

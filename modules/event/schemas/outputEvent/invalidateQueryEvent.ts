import { z } from "zod";
import { outputEventBase } from "./outputEventBase";
import { outputEventTypeSchema } from "./outputEventType";

export const invalidateQueryKeySchema = z.enum([
  "session__joinedParticipantsQuery",
  "session__activeParticipantsQuery",
]);

export const invalidateQueryEventSchema = outputEventBase.extend({
  type: z.literal(outputEventTypeSchema.enum.invalidateQuery),
  payload: z.object({
    key: invalidateQueryKeySchema,
  }),
});

export type InvalidateQueryEvent = z.infer<typeof invalidateQueryEventSchema>;

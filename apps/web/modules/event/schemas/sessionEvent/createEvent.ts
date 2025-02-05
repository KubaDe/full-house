import { z } from "zod";
import { sessionEventBase } from "./sessionEventBase";
import { sessionEventTypeSchema } from "./sessionEventType";

export const createEventSchema = sessionEventBase.extend({
  type: z
    .literal(sessionEventTypeSchema.enum.create)
    .default(sessionEventTypeSchema.enum.create),
  userId: z.string(),
});

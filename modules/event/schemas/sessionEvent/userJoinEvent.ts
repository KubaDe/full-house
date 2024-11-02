import { z } from "zod";
import { sessionEventTypeSchema } from "./sessionEventType";
import { sessionEventBase } from "./sessionEventBase";

export const userJoinEventSchema = sessionEventBase.extend({
  type: z.literal(sessionEventTypeSchema.enum.userJoin).default(sessionEventTypeSchema.enum.userJoin),
  userId: z.string(),
});

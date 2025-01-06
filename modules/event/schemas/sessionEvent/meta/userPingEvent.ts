import { z } from "zod";
import { sessionEventTypeSchema } from "../sessionEventType";
import { sessionEventBase } from "../sessionEventBase";

export const userPingEventSchema = sessionEventBase.extend({
  type: z.literal(sessionEventTypeSchema.enum.userPing).default(sessionEventTypeSchema.enum.userPing),
  userId: z.string(),
});

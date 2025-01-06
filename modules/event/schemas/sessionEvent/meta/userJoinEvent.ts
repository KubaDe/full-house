import { z } from "zod";
import { sessionEventBase } from "../sessionEventBase";
import { metaSessionEventTypeSchema } from "./metaEventType";

export const userJoinEventSchema = sessionEventBase.extend({
  type: z.literal(metaSessionEventTypeSchema.enum.userJoin).default(metaSessionEventTypeSchema.enum.userJoin),
  userId: z.string(),
});

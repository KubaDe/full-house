import { z } from "zod";
import { sessionEventBase } from "../sessionEventBase";
import { chatSessionEventTypeSchema } from "./chatEventType";

export const messageEventSchema = sessionEventBase.extend({
  type: z.literal(chatSessionEventTypeSchema.enum.message).default(chatSessionEventTypeSchema.enum.message),
  userId: z.string(),
  payload: z.object({
    message: z.string(),
  }),
});

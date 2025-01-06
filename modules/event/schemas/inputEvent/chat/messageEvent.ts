import { z } from "zod";
import { inputEventBase } from "../inputEventBase";
import { chatInputEventTypeSchema } from "./chatInputEventType";

export const messageEventSchema = inputEventBase.extend({
  type: z.literal(chatInputEventTypeSchema.enum.message),
  message: z.string().trim().min(1).max(255),
});

export type MessageEvent = z.infer<typeof messageEventSchema>;

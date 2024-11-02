import { z } from "zod";
import { inputEventTypeSchema } from "./inputEventType";
import { inputEventBase } from "./inputEventBase";

export const pingEventSchema = inputEventBase.extend({
  type: z.literal(inputEventTypeSchema.enum.ping),
});

export type PingEvent = z.infer<typeof pingEventSchema>;

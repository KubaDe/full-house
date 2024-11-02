import { z } from "zod";
import { inputEventTypeSchema } from "./inputEventType";
import { inputEventBase } from "./inputEventBase";

export const joinEventSchema = inputEventBase.extend({
  type: z.literal(inputEventTypeSchema.enum.join),
});

export type JoinEvent = z.infer<typeof joinEventSchema>;

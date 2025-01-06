import { z } from "zod";
import { metaInputEventTypeSchema } from "./meta/metaInputEventType";
import { chatInputEventTypeSchema } from "./chat/chatInputEventType";

export const inputEventTypeSchema = z.enum([
  ...metaInputEventTypeSchema.options,
  ...chatInputEventTypeSchema.options,
]);

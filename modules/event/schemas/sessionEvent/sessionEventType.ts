import { z } from "zod";
import { metaSessionEventTypeSchema } from "./meta/metaEventType";
import { chatSessionEventTypeSchema } from "./chat/chatEventType";

export const sessionEventTypeSchema = z.enum([
  ...metaSessionEventTypeSchema.options,
  ...chatSessionEventTypeSchema.options,
  "create",
]);

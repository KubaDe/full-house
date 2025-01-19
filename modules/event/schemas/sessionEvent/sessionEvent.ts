import { z } from "zod";
import { metaSessionEventSchemas } from "./meta/metaSessionEvent";
import { chatSessionEventSchemas } from "./chat/chatSessionEvent";
import { createEventSchema } from "./createEvent";

export const sessionEventSchema = z.discriminatedUnion("type", [
  ...metaSessionEventSchemas,
  ...chatSessionEventSchemas,
  createEventSchema,
]);

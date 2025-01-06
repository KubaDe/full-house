import { z } from "zod";
import { metaSessionEventSchemas } from "./meta/metaSessionEvent";
import { chatSessionEventSchemas } from "./chat/chatSessionEvent";

export const sessionEventSchema = z.discriminatedUnion("type", [
  ...metaSessionEventSchemas,
  ...chatSessionEventSchemas,
]);

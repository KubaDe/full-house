import { z } from "zod";
import { metaInputEventSchemas } from "./meta/metaInputEvent";
import { chatInputEventSchemas } from "./chat/chatInputEvent";

export const inputEventSchema = z.discriminatedUnion("type", [
  ...metaInputEventSchemas,
  ...chatInputEventSchemas,
]);

export type InputEvent = z.infer<typeof inputEventSchema>;

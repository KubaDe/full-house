import { z } from "zod";
import { joinEventSchema } from "./joinEvent";
import { pingEventSchema } from "./pingEvent";

export const inputEventSchema = z.discriminatedUnion("type", [joinEventSchema, pingEventSchema]);

export type InputEvent = z.infer<typeof inputEventSchema>;

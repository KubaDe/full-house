import { z } from "zod";

import { invalidateQueryEventSchema } from "./invalidateQueryEvent";

export const outputEventSchema = z.discriminatedUnion("type", [invalidateQueryEventSchema]);

export type OutputEvent = z.infer<typeof outputEventSchema>;

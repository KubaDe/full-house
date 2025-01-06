import { joinEventSchema } from "./joinEvent";
import { pingEventSchema } from "./pingEvent";

export const metaInputEventSchemas = [joinEventSchema, pingEventSchema] as const;

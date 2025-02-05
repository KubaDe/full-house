import { z } from "zod";

export const outputEventTypeSchema = z.enum(["invalidateQuery"]);

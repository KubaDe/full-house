import { z } from "zod";

export const metaInputEventTypeSchema = z.enum(["join", "ping"]);

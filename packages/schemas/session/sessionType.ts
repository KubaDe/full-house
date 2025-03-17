import { z } from "zod";

export const sessionTypeSchema = z.enum(["meta", "simpleMessage", "chat"]);

export type SessionType = z.infer<typeof sessionTypeSchema>;

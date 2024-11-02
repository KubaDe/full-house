import { z } from "zod";

export const sessionEventTypeSchema = z.enum(["userJoin", "userPing"]);

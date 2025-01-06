import { z } from "zod";

export const metaSessionEventTypeSchema = z.enum(["userJoin", "userPing"]);

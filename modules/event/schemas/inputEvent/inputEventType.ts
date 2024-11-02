import { z } from "zod";

export const inputEventTypeSchema = z.enum(["join", "ping"]);

import { z } from "zod";

export const chatInputEventTypeSchema = z.enum(["message"]);

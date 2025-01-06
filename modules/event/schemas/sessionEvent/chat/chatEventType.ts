import { z } from "zod";

export const chatSessionEventTypeSchema = z.enum(["message"]);

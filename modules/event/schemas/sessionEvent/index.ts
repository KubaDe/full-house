import { z } from "zod";

import { userJoinEventSchema } from "./userJoinEvent";
import { userPingEventSchema } from "./userPingEvent";
export * from "./sessionEventType";
export * from "./userJoinEvent";
export * from "./userPingEvent";

export const sessionEventSchema = z.discriminatedUnion("type", [userJoinEventSchema, userPingEventSchema]);

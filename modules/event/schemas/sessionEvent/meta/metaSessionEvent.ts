import { userJoinEventSchema } from "./userJoinEvent";
import { userPingEventSchema } from "./userPingEvent";

export const metaSessionEventSchemas = [userJoinEventSchema, userPingEventSchema] as const;

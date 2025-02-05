import superjson from "superjson";
import type { OutputEvent } from "../schemas/outputEvent/outputEvent";

export const serializeOutputEventToPublish = (event: OutputEvent): string => {
  return superjson.stringify(event);
};

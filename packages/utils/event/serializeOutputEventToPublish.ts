import superjson from "superjson";
import { OutputEvent } from "@repo/schemas";

export const serializeOutputEventToPublish = (event: OutputEvent): string => {
  return superjson.stringify(event);
};

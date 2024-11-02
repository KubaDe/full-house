import superjson from "superjson";
import { match, P } from "ts-pattern";
import { type OutputEvent, outputEventSchema } from "@/modules/event/schemas/outputEvent";

export const deserializePublishToOutputEvent = (message: string): OutputEvent | null => {
  const parsedMessage = superjson.parse(message);
  return match(outputEventSchema.safeParse(parsedMessage))
    .with({ data: P.nonNullable }, ({ data }) => data)
    .otherwise(() => {
      console.error("Failed to deserialize publish to output event", message);
      return null;
    });
};

import superjson from "superjson";
import { match, P } from "ts-pattern";
import { type OutputEvent, outputEventSchema } from "@repo/schemas";

export const deserializePublishToOutputEvent = (
  message: string,
): OutputEvent | null => {
  const parsedMessage = superjson.parse(message);

  return match(outputEventSchema.safeParse(parsedMessage))
    .with({ data: P.nonNullable }, ({ data }) => data)
    .otherwise(({ error }) => {
      console.error(
        "Failed to deserialize publish to output event",
        message,
        error,
      );
      return null;
    });
};

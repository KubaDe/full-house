import { match, P } from "ts-pattern";
import { chunk, fromPairs } from "lodash-es";
import superjson from "superjson";
import type { SessionEventBase } from "@repo/schemas";
import { sessionEventSchema } from "@repo/schemas";

export const deserializeStreamOutputToSessionEvent = ([id, fields]: [
  id: string,
  fields: string[],
]): SessionEventBase | undefined => {
  const parsedData = fromPairs(chunk(fields, 2));
  const extendedParseData = match(parsedData)
    .with({ payload: P.string }, (data) => ({
      ...data,
      id,
      timestamp: id.split("-")[0],
      payload: superjson.parse(data.payload),
    }))
    .otherwise((data) => ({
      ...data,
      id,
      timestamp: id.split("-")[0],
    }));

  const { data } = sessionEventSchema.safeParse(extendedParseData);
  return data;
};

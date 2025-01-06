import { match, P } from "ts-pattern";
import { chunk, fromPairs } from "lodash";
import superjson from "superjson";
import type { SessionEventBase } from "../schemas/sessionEvent/sessionEventBase";
import { sessionEventSchema } from "../schemas/sessionEvent";

export const deserializeStreamOutputToSessionEvent = ([id, fields]: [id: string, fields: string[]]):
  | SessionEventBase
  | undefined => {
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

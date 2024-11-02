import { match, P } from "ts-pattern";
import { flatten, toPairs } from "lodash";
import superjson from "superjson";
import type { SessionEventBase } from "../schemas/sessionEvent/sessionEventBase";

export const serializeSessionEventToStreamInput = ({ payload, ...data }: SessionEventBase): string[] => {
  const extendedData = match(payload)
    .with(P.nonNullable, (payload) => ({
      ...data,
      payload: superjson.stringify(payload),
    }))
    .otherwise(() => data);

  return flatten(toPairs(extendedData));
};

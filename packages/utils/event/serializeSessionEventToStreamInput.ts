import { match, P } from "ts-pattern";
import { flatten, toPairs } from "lodash-es";
import superjson from "superjson";
import { SessionEventBase } from "@repo/schemas";

export const serializeSessionEventToStreamInput = ({
  payload,
  ...data
}: SessionEventBase): string[] => {
  const extendedData = match(payload)
    .with(P.nonNullable, (payload) => ({
      ...data,
      payload: superjson.stringify(payload),
    }))
    .otherwise(() => data);

  return flatten(toPairs(extendedData));
};

import { match } from "ts-pattern";
import { eventHandlers } from "./eventHandlers";
import { OutputEvent, outputEventTypeSchema } from "@repo/schemas";

type OnPushProps = {
  event: OutputEvent;
};

export const outputEventService = {
  onPush: async (props: OnPushProps) => {
    await match(props)
      .with(
        { event: { type: outputEventTypeSchema.enum.invalidateQuery } },
        eventHandlers.invalidateQueryHandler,
      )
      .exhaustive();
  },
};

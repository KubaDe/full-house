import { match } from "ts-pattern";
import { eventHandlers } from "./eventHandlers";
import { outputEventTypeSchema, type OutputEvent } from "@/modules/event/schemas/outputEvent";

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

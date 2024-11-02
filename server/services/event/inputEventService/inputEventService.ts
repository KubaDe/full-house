import { match } from "ts-pattern";
import { eventHandlers } from "./eventHandlers";
import { type InputEvent, inputEventTypeSchema } from "@/modules/event/schemas/inputEvent";

type OnPushProps = {
  event: InputEvent;
  userId: string;
};

export const inputEventService = {
  onPush: async (props: OnPushProps) => {
    await match(props)
      .with({ event: { type: inputEventTypeSchema.enum.join } }, eventHandlers.joinHandler)
      .with({ event: { type: inputEventTypeSchema.enum.ping } }, eventHandlers.pingHandler)
      .exhaustive();
  },
};

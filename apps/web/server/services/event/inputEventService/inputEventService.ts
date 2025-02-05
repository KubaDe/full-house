import { match } from "ts-pattern";
import {
  createHandler,
  metaEventHandlers,
  chatEventHandlers,
} from "./eventHandlers";
import {
  type InputEvent,
  inputEventTypeSchema,
} from "@/modules/event/schemas/inputEvent";

type OnPushProps = {
  event: InputEvent;
  userId: string;
  roomId: string;
};

type OnCreateProps = {
  sessionId: string;
  userId: string;
  roomId: string;
};

export const inputEventService = {
  onCreate: async (props: OnCreateProps) => {
    await createHandler(props);
  },

  onPush: async (props: OnPushProps) => {
    await match(props)
      // META
      .with(
        { event: { type: inputEventTypeSchema.enum.join } },
        metaEventHandlers.joinHandler,
      )
      .with(
        { event: { type: inputEventTypeSchema.enum.ping } },
        metaEventHandlers.pingHandler,
      )
      // CHAT
      .with(
        { event: { type: inputEventTypeSchema.enum.message } },
        chatEventHandlers.messageHandler,
      )
      .exhaustive();
  },
};

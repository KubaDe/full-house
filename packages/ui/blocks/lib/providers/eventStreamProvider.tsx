"use client";
import { type ReactNode } from "react";
import { api } from "@repo/api/client";
import { useCurrentRoom } from "@repo/ui-hooks/room";
import { useEventStreamHandler } from "@repo/ui-hooks/event";

type EventStreamProviderProps = { children: ReactNode };
export const EventStreamProvider = ({ children }: EventStreamProviderProps) => {
  const { roomId } = useCurrentRoom();
  const { eventStreamHandler } = useEventStreamHandler();

  api.event.sessionEventSubscription.useSubscription(
    { roomId },
    { onData: eventStreamHandler },
  );

  return children;
};

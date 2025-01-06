"use client";
import { type ReactNode } from "react";
import { api } from "@/utils/api";
import { useEventStreamHandler } from "@/modules/event/hooks/eventStreamHandler";
import { useCurrentRoom } from "@/modules/room/hooks/useCurrentRoom";

type EventStreamProviderProps = { children: ReactNode };
export const EventStreamProvider = ({ children }: EventStreamProviderProps) => {
  const { roomId } = useCurrentRoom();
  const { eventStreamHandler } = useEventStreamHandler();

  api.event.sessionEventSubscription.useSubscription({ roomId }, { onData: eventStreamHandler });

  return children;
};

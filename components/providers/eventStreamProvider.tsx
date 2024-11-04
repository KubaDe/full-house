"use client";
import { type ReactNode } from "react";
import { api } from "@/utils/api";
import { useEventStreamHandler } from "@/modules/event/hooks/eventStreamHandler";

type EventStreamProviderProps = { roomId: string; children: ReactNode };
export const EventStreamProvider = ({ children, roomId }: EventStreamProviderProps) => {
  const { eventStreamHandler } = useEventStreamHandler();

  api.event.sessionEventSubscription.useSubscription({ roomId }, { onData: eventStreamHandler });

  return children;
};

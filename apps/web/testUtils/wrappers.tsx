import { type ReactNode } from "react";
import { CurrentRoomProvider } from "@/modules/room/hooks/useCurrentRoom";

export const TEST_ROOM_ID = "test-room-id";

type TestCurrentRoomProviderProps = {
  children: ReactNode;
};
export const TestCurrentRoomProvider = ({
  children,
}: TestCurrentRoomProviderProps) => (
  <CurrentRoomProvider roomId={TEST_ROOM_ID}>{children}</CurrentRoomProvider>
);

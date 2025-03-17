"use client";
import { createContext, type ReactNode, useContext, useMemo, JSX } from "react";

type CurrentRoomContextValue = {
  roomId: string;
};

const CurrentRoomContext = createContext<CurrentRoomContextValue | null>(null);

type CurrentRoomProviderProps = {
  roomId: string;
  children: ReactNode;
};
export const CurrentRoomProvider = ({
  roomId,
  children,
}: CurrentRoomProviderProps): JSX.Element => {
  const value = useMemo(() => ({ roomId }), [roomId]);
  return (
    <CurrentRoomContext.Provider value={value}>
      {children}
    </CurrentRoomContext.Provider>
  );
};

export const useCurrentRoom = () => {
  const context = useContext(CurrentRoomContext);
  if (!context) {
    throw new Error("useCurrentRoom must be used within a CurrentRoomProvider");
  }
  return context;
};

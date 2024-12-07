import { type Metadata } from "next";
import { type ReactNode } from "react";
import { ParticipantsList, ParticipantsListWrapper } from "@/components/parts/participantsList";
import { EventStreamProvider } from "@/components/providers/eventStreamProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RoomLayoutProps = {
  children: ReactNode;
  params: Promise<{ roomId: string[] }>;
};

const RoomLayout = async (props: RoomLayoutProps) => {
  const params = await props.params;

  const {
    children
  } = props;

  const roomId = params?.roomId?.[0] ?? "";
  if (!roomId) return null;
  return (
    <EventStreamProvider roomId={roomId}>
      {children}
      <ParticipantsListWrapper>
        <ParticipantsList roomId={roomId} />
      </ParticipantsListWrapper>
    </EventStreamProvider>
  );
};

export default RoomLayout;

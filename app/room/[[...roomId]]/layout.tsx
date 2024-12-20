import { type Metadata } from "next";
import { type ReactNode } from "react";
import { ParticipantsList, ParticipantsListWrapper } from "@/components/parts/participantsList";
import { EventStreamProvider } from "@/components/providers/eventStreamProvider";
import { MetaSessionManager } from "@/components/parts/metaSessionManager";

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

  const { children } = props;

  const roomId = params?.roomId?.[0] ?? "";
  if (!roomId) return null;
  return (
    <MetaSessionManager roomId={roomId}>
      <EventStreamProvider roomId={roomId}>
        {children}
        <ParticipantsListWrapper>
          <ParticipantsList roomId={roomId} />
        </ParticipantsListWrapper>
      </EventStreamProvider>
    </MetaSessionManager>
  );
};

export default RoomLayout;

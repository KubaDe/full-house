import { UserCheck } from "lucide-react";
import { api } from "@/utils/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/uiKit/tabs";
import { PendingInvitationsCard } from "@/components/parts/inviteUserToRoomTabs/pendingInvitationsCard";
import { InviteIndividualCard } from "@/components/parts/inviteUserToRoomTabs/inviteIndividualCard";
import { OpenInvitationCard } from "@/components/parts/inviteUserToRoomTabs/openInvitationCard";

type InviteUserToRoomTabsProps = {
  roomId: string;
  onSuccess: () => void;
};
export const InviteUserToRoomTabs = ({ roomId, onSuccess }: InviteUserToRoomTabsProps) => {
  const { data: roomOpenInvitationData } = api.invitation.roomOpenInvitationQuery.useQuery({
    roomId,
  });

  return (
    <Tabs defaultValue="single" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="flex-1" value="single">
          Single user invitations
        </TabsTrigger>
        <TabsTrigger className="flex-1" value="public">
          Open invitation
          {roomOpenInvitationData && <UserCheck className="ml-3 text-green-700" size={16} />}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="single" className="space-y-4">
        <PendingInvitationsCard roomId={roomId} />
        <InviteIndividualCard roomId={roomId} onSuccess={onSuccess} />
      </TabsContent>

      <TabsContent value="public">
        <OpenInvitationCard roomId={roomId} />
      </TabsContent>
    </Tabs>
  );
};

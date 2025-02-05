import { api } from "@/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/uiKit/card";
import { Badge } from "@/components/uiKit/badge";

type PendingInvitationsCardProps = {
  roomId: string;
};
export const PendingInvitationsCard = ({
  roomId,
}: PendingInvitationsCardProps) => {
  const { data: userToTheRoomInvitationsData } =
    api.invitation.userToRoomInvitationsQuery.useQuery(
      {
        roomId,
      },
      {
        select: (data) => data?.filter((invitation) => !invitation.isOpen),
        enabled: !!roomId,
      },
    );

  if (!userToTheRoomInvitationsData?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending invitations</CardTitle>
        <CardDescription>
          Users that are already invited to this room.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul
          className="flex w-full flex-wrap gap-1"
          aria-label="invitations list"
        >
          {userToTheRoomInvitationsData?.map((invitation) => (
            <li key={invitation.id}>
              <Badge className="justify-center" variant="secondary">
                <div className="overflow-hidden text-ellipsis">
                  {invitation.email}
                </div>
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

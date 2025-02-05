import { MyInvitationsTableRow } from "./myInvitationsTableRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/uiKit/table";
import { api } from "@/utils/api";

export const MyInvitationsTable = () => {
  const { data: invitationsData } =
    api.invitation.myInvitationsQuery.useQuery();

  return (
    <Table>
      <TableCaption>
        {invitationsData?.length === 0
          ? "You have no invitations"
          : "A list of your invitations"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invited to</TableHead>
          <TableHead>Invited by</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitationsData?.map((invitation) => (
          <MyInvitationsTableRow key={invitation.id} invitation={invitation} />
        ))}
      </TableBody>
    </Table>
  );
};

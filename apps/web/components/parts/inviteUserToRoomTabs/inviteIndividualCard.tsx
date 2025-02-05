import { Button } from "@/components/uiKit/button";
import { ButtonSpinner } from "@/components/uiKit/buttonSpinner";
import { useInviteUserToRoomForm } from "@/components/forms/inviteUserToRoomForm";
import { api } from "@/utils/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/uiKit/card";

type InviteIndividualCardProps = {
  roomId: string;
  onSuccess: () => void;
};
export const InviteIndividualCard = ({
  roomId,
  onSuccess,
}: InviteIndividualCardProps) => {
  const {
    formUI,
    formName,
    form,
    mutationParams: { isPending },
  } = useInviteUserToRoomForm({
    roomId,
    onSuccess,
  });
  const { data: roomData } = api.room.userRoomQuery.useQuery({ roomId });

  const disabled = !form.formState.isDirty || isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {roomData ? `Invite single user to room "${roomData.room.name}"` : ""}
        </CardTitle>
        <CardDescription>
          Please provide the user&#39;s email address. The user will receive a
          notification regarding the pending invitation.
        </CardDescription>
      </CardHeader>
      <CardContent>{formUI}</CardContent>
      <CardFooter className="justify-end">
        <Button type="submit" form={formName} disabled={disabled}>
          <ButtonSpinner isLoading={isPending} />
          Send invitation
        </Button>
      </CardFooter>
    </Card>
  );
};

import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@repo/ui-kit/dialog";
import { Button } from "@repo/ui-kit/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@repo/ui-kit/sheet";
import { ButtonSpinner } from "@repo/ui-kit/buttonSpinner";
import { api } from "@repo/api/client";

type NoMetaSessionModalModalProps = {
  roomId: string;
};

export const NoMetaSessionModal = ({
  roomId,
}: NoMetaSessionModalModalProps) => {
  const utils = api.useUtils();
  const { replace } = useRouter();

  const { mutateAsync: createSession, isPending } =
    api.session.createSessionMutation.useMutation({
      onSuccess: () => utils.room.userRoomQuery.refetch(),
    });

  const isDialog = useMediaQuery({ minWidth: theme.screens.md });

  const title = "You have entered the meeting room";
  const content =
    "You've entered the meeting room. There is no active session started. Would you like to start a new meeting?";

  const disabled = isPending;

  const confirmButton = (
    <Button
      disabled={disabled}
      onClick={() => createSession({ roomId, type: "meta" })}
      data-testid="noMetaSessionModal.startMeetingButton"
    >
      <ButtonSpinner isLoading={isPending} />
      Start meeting
    </Button>
  );

  const onClose = () => {
    replace("/");
  };

  if (isDialog) {
    return (
      <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{content}</DialogDescription>
            <SheetClose />
          </DialogHeader>
          <DialogFooter>{confirmButton}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Sheet open={true} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="flex flex-col gap-8">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{content}</SheetDescription>
        </SheetHeader>
        <SheetFooter>{confirmButton}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

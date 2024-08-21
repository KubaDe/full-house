import { useModal, create as createModal } from "@ebay/nice-modal-react";
import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogHeader,
} from "@/components/uiKit/dialog";
import { Button } from "@/components/uiKit/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/uiKit/sheet";
import { ScrollArea } from "@/components/uiKit/scroll-area";
import { ButtonSpinner } from "@/components/uiKit/buttonSpinner";
import { useInviteUserToRoomForm } from "@/components/forms/inviteUserToRoomForm";
import { api } from "@/utils/api";

type InviteUserToRoomModalProps = {
  roomId: string;
};
export const InviteUserToRoomModal = createModal(({ roomId }: InviteUserToRoomModalProps) => {
  const { visible, show, hide } = useModal();
  const {
    formUI,
    formName,
    form,
    mutationParams: { isPending },
  } = useInviteUserToRoomForm({
    roomId,
    onSuccess: hide,
  });
  const { data: roomData } = api.room.userRoomQuery.useQuery({ roomId });
  const isDialog = useMediaQuery({ minWidth: theme.screens.md });
  const onOpenChange = (value: boolean) => (value ? show() : hide());

  const title = "Send invitation";
  const subtitle = roomData ? `Invite user to the "${roomData.room.name}" room` : "";
  const disabled = !form.formState.isDirty || isPending;

  if (isDialog) {
    return (
      <Dialog open={visible} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{subtitle}</DialogDescription>
            <SheetClose />
          </DialogHeader>
          {formUI}
          <DialogFooter>
            <Button type="submit" form={formName} disabled={disabled}>
              <ButtonSpinner isLoading={isPending} />
              Send invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Sheet open={visible} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="flex flex-col gap-8">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{subtitle}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="pb-8">
          <div className="m-1">{formUI}</div>
        </ScrollArea>
        <SheetFooter>
          <Button type="submit" form={formName} disabled={disabled}>
            <ButtonSpinner isLoading={isPending} />
            Send invitation
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

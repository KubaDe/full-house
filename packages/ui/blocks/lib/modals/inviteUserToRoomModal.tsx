import { useModal, create as createModal } from "@ebay/nice-modal-react";
import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@repo/ui-kit/dialog";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@repo/ui-kit/sheet";
import { ScrollArea } from "@repo/ui-kit/scroll-area";
import { InviteUserToRoomTabs } from "../parts/inviteUserToRoomTabs";

type InviteUserToRoomModalProps = {
  roomId: string;
};
export const InviteUserToRoomModal = createModal(
  ({ roomId }: InviteUserToRoomModalProps) => {
    const { visible, show, hide } = useModal();
    const isDialog = useMediaQuery({ minWidth: theme.screens.md });
    const onOpenChange = (value: boolean) => (value ? show() : hide());

    const title = "Send invitation";

    if (isDialog) {
      return (
        <Dialog open={visible} onOpenChange={onOpenChange}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <SheetClose />
            </DialogHeader>
            <InviteUserToRoomTabs onSuccess={hide} roomId={roomId} />
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Sheet open={visible} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="flex flex-col gap-8">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="pb-8">
            <div className="m-1">
              <InviteUserToRoomTabs onSuccess={hide} roomId={roomId} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  },
);

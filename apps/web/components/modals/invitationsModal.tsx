import { useModal, create as createModal } from "@ebay/nice-modal-react";
import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "react-responsive";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/uiKit/dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/uiKit/sheet";

import { ScrollArea } from "@/components/uiKit/scroll-area";
import { useMe } from "@/modules/user/hooks/useMe";
import { MyInvitationsTable } from "@/components/tables/myInvitationsTable";

type InvitationsModalProps = {
  canClose?: boolean;
};

export const InvitationsModal = createModal(
  ({ canClose = true }: InvitationsModalProps) => {
    const { userData } = useMe();
    const { visible, show, hide } = useModal();

    const isDialog = useMediaQuery({ minWidth: theme.screens.md });
    const onOpenChange = (value: boolean) => (value ? show() : hide());

    const title = "Invitations";

    if (isDialog) {
      return (
        <Dialog
          open={visible}
          onOpenChange={userData?.profile ? onOpenChange : undefined}
        >
          <DialogContent canClose={canClose}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                Choose your avatar and nickname
              </DialogDescription>
            </DialogHeader>
            <MyInvitationsTable />
          </DialogContent>
        </Dialog>
      );
    }
    return (
      <Sheet open={visible} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="flex flex-col gap-8">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>Choose your avatar and nickname</SheetDescription>
          </SheetHeader>
          <ScrollArea>
            <div className="m-1">
              <MyInvitationsTable />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    );
  },
);

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
import { ScrollArea } from "@repo/ui-kit/scroll-area";
import { ButtonSpinner } from "@repo/ui-kit/buttonSpinner";
import { useAddRoomForm } from "../forms";

export const AddRoomModal = createModal(() => {
  const { visible, show, hide } = useModal();
  const {
    formUI,
    formName,
    form,
    mutationParams: { isPending },
  } = useAddRoomForm({
    onSuccess: hide,
  });
  const isDialog = useMediaQuery({ minWidth: theme.screens.md });
  const onOpenChange = (value: boolean) => (value ? show() : hide());

  const title = "Add room";
  const subtitle = "Add a new room and invite your friends";
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
              Add room
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
            Add room
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
});

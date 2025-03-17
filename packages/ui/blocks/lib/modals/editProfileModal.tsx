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
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@repo/ui-kit/sheet";

import { ScrollArea } from "@repo/ui-kit/scroll-area";
import { useEditProfileForm } from "../forms";
import { ButtonSpinner } from "@repo/ui-kit/buttonSpinner";
import { useMe } from "@repo/ui-hooks/user";

type EditProfileModalProps = {
  canClose?: boolean;
};

export const EditProfileModal = createModal(
  ({ canClose = true }: EditProfileModalProps) => {
    const { userData } = useMe();
    const { visible, show, hide } = useModal();
    const {
      formUI,
      formName,
      form,
      mutationParams: { isPending },
    } = useEditProfileForm({
      onSuccess: hide,
    });
    const isDialog = useMediaQuery({ minWidth: theme.screens.md });
    const onOpenChange = (value: boolean) => (value ? show() : hide());

    const title = userData?.profile ? "Edit profile" : "Create profile";
    const disabled = !form.formState.isDirty || isPending;

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
            {formUI}
            <DialogFooter>
              <Button type="submit" form={formName} disabled={disabled}>
                <ButtonSpinner isLoading={isPending} />
                Save profile
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
            <SheetDescription>Choose your avatar and nickname</SheetDescription>
          </SheetHeader>
          <ScrollArea>
            <div className="m-1">{formUI}</div>
          </ScrollArea>
          <SheetFooter>
            <Button type="submit" form={formName} disabled={disabled}>
              <ButtonSpinner isLoading={isPending} />
              Save profile
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
);

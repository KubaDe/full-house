import { useModal, create as createModal } from "@ebay/nice-modal-react";
import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "react-responsive";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui-kit/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui-kit/sheet";
import { Button, type ButtonProps } from "@repo/ui-kit/button";
import { ButtonSpinner } from "@repo/ui-kit/buttonSpinner";

type ConfirmActionModalProps = {
  title: string;
  description: string;
  onConfirm?: () => Promise<void>;
  onCancel?: () => Promise<void>;
  cancelButtonText?: string;
  confirmButtonText?: string;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: ButtonProps;
};

export const ConfirmActionModal = createModal(
  (props: ConfirmActionModalProps) => {
    const {
      description,
      title,
      onConfirm,
      onCancel,
      cancelButtonText = "Cancel",
      confirmButtonText = "Confirm",
      confirmButtonProps = {},
      cancelButtonProps = {},
    } = props;
    const { visible, show, hide } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const isDialog = useMediaQuery({ minWidth: theme.screens.md });

    const onConfirmHandler = async () => {
      setIsLoading(true);
      try {
        await onConfirm?.();
      } catch {
        // handled outside the modal
      }
      setIsLoading(false);
      await hide();
    };
    const onCancelHandler = async () => {
      await onCancel?.();
      await hide();
    };
    const onOpenChange = (value: boolean) => (value ? show() : hide());
    if (isDialog) {
      return (
        <AlertDialog open={visible} onOpenChange={onOpenChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                onClick={onCancelHandler}
                variant="outline"
                disabled={isLoading}
                autoFocus
                data-testid="confirmationModal.cancelAction"
                {...cancelButtonProps}
              >
                {cancelButtonText}
              </Button>
              <Button
                onClick={onConfirmHandler}
                data-testid="confirmationModal.confirmAction"
                {...confirmButtonProps}
              >
                <ButtonSpinner isLoading={isLoading} />
                {confirmButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }
    return (
      <Sheet open={visible} onOpenChange={onOpenChange}>
        <SheetContent side="bottom">
          <SheetHeader className="pb-8">
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <div className="flex flex-col gap-2">
              <Button onClick={onConfirmHandler} {...confirmButtonProps}>
                <ButtonSpinner isLoading={isLoading} />
                {confirmButtonText}
              </Button>
              <Button
                variant="outline"
                onClick={onCancelHandler}
                disabled={isLoading}
                {...cancelButtonProps}
              >
                {cancelButtonText}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
);

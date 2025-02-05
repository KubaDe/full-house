import { Orbit } from "lucide-react";
import * as React from "react";
import { useDebounce } from "react-use";
import { useEffect } from "react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/uiKit/dialog";

type ButtonSpinnerProps = {
  isLoading?: boolean;
};
export const FullPageSpinner = ({ isLoading = true }: ButtonSpinnerProps) => {
  const [isVisible, setIsVisible] = React.useState(false);

  useDebounce(
    () => {
      if (isLoading) {
        setIsVisible(true);
      }
    },
    500,
    [isLoading],
  );

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(false);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <Dialog open={isVisible}>
      <DialogPortal>
        <DialogOverlay />

        <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
          <Orbit
            strokeWidth={1}
            className="size-16 animate-spin text-white"
            data-testid="full-page-spinner"
          />
        </div>
      </DialogPortal>
    </Dialog>
  );
};

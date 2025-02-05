import { Orbit } from "lucide-react";
import * as React from "react";
import { useDebounce } from "react-use";
import { useEffect } from "react";

type ButtonSpinnerProps = {
  isLoading?: boolean;
};
export const ButtonSpinner = ({ isLoading }: ButtonSpinnerProps) => {
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
    <Orbit className="mr-2 size-4 animate-spin" data-testid="button-spinner" />
  );
};

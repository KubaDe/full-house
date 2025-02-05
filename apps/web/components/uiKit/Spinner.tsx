import { Orbit } from "lucide-react";
import * as React from "react";
import { useDebounce } from "react-use";
import { useEffect } from "react";

type SpinnerProps = {
  isLoading?: boolean;
};
export const Spinner = ({ isLoading = true }: SpinnerProps) => {
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
    <div className="size-full">
      <Orbit
        strokeWidth={1}
        className="size-16 animate-spin text-white"
        data-testid="fullPageSpinner"
      />
    </div>
  );
};

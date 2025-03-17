import { type ReactNode } from "react";

type ChatButtonWrapperProps = {
  children: ReactNode;
};

export const SideContentModePickerWrapper = ({
  children,
}: ChatButtonWrapperProps) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col items-center gap-3">
      {children}
    </div>
  );
};

import { type ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { DayjsProvider } from "@/components/Providers/DayjsProvider";

export const CombinedProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DayjsProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </DayjsProvider>
  );
};

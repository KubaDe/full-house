"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";
import { DayjsProvider } from "@/components/Providers/DayjsProvider";
import { ApiProvider } from "@/components/Providers/ApiProvider";

export const CombinedProvider = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <ApiProvider>
      <DayjsProvider>
        <ClerkProvider>{children}</ClerkProvider>
      </DayjsProvider>
    </ApiProvider>
  );
};

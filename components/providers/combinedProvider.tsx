"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { type ReactNode } from "react";
import { DayjsProvider } from "@/components/providers/dayjsProvider";
import { ApiProvider } from "@/components/providers/apiProvider";
import { ModalsProvider } from "@/components/providers/niceModalProvider";
import { OnboardingProvider } from "@/components/providers/onboardingProvider";

export const CombinedProvider = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <ApiProvider>
      <DayjsProvider>
        <ClerkProvider>
          <OnboardingProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </OnboardingProvider>
        </ClerkProvider>
      </DayjsProvider>
    </ApiProvider>
  );
};

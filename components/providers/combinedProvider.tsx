"use client";
import { type ReactNode } from "react";
import { DayjsProvider } from "@/components/providers/dayjsProvider";
import { ApiProvider } from "@/components/providers/apiProvider";
import { ModalsProvider } from "@/components/providers/niceModalProvider";
import { OnboardingProvider } from "@/components/providers/onboardingProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const CombinedProvider = ({ children }: { children: ReactNode }): ReactNode => {
  return (
    <ApiProvider>
      <DayjsProvider>
        <AuthProvider>
          <OnboardingProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </OnboardingProvider>
        </AuthProvider>
      </DayjsProvider>
    </ApiProvider>
  );
};

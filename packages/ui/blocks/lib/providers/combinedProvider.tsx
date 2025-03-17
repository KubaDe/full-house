"use client";
import { type ReactNode } from "react";
import { ApiProvider } from "./apiProvider";
import { DayjsProvider } from "./dayjsProvider";
import { ModalsProvider } from "./niceModalProvider";
import { OnboardingProvider } from "./onboardingProvider";
import { AuthProvider } from "./authProvider";

export const CombinedProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
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

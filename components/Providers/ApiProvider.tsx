"use client";
import { type FunctionComponent, type ReactNode } from "react";
import { api } from "@/utils/api";

export const ApiProvider = api.withTRPC(({ children }: { children: ReactNode }) => {
  return children;
}) as FunctionComponent<{ children: ReactNode }>;

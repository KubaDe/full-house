"use client";
import NiceModal from "@ebay/nice-modal-react";
import { type ReactNode } from "react";

type ModalsProviderProps = { children: ReactNode };

export const ModalsProvider = ({ children }: ModalsProviderProps) => (
  <NiceModal.Provider>{children}</NiceModal.Provider>
);

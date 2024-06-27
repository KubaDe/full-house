"use client";
import { type ReactNode } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);
dayjs().locale("en");

export const DayjsProvider = ({ children }: { children: ReactNode }) => {
  return children;
};

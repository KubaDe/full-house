"use client";
import { type ReactNode } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs().locale("en");

export const DayjsProvider = ({ children }: { children: ReactNode }) => {
  return children;
};

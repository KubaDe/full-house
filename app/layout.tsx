import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { type Metadata } from "next";
import { cn } from "@/lib/utils";
import { AppConfigBar, AppConfigBarWrapper } from "@/components/parts/appConfigBar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <AppConfigBarWrapper>
          <AppConfigBar />
        </AppConfigBarWrapper>
        {children}
      </body>
    </html>
  );
}

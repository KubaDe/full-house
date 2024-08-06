import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { type Metadata } from "next";
import { cn } from "@/lib/utils";
import { AppConfigBar, AppConfigBarWrapper } from "@/components/parts/appConfigBar";
import { CombinedProvider } from "@/components/providers/combinedProvider";
import { Toaster } from "@/components/uiKit/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <CombinedProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </head>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <AppConfigBarWrapper>
            <AppConfigBar />
          </AppConfigBarWrapper>
          {children}
          <Toaster />
        </body>
      </html>
    </CombinedProvider>
  );
};

export default RootLayout;

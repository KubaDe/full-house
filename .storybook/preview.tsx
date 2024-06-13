import type { Preview } from "@storybook/react";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { ModalsProvider } from "@/components/modals/Provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ModalsProvider>
        <Story />
      </ModalsProvider>
    ),
  ],
};

export default preview;

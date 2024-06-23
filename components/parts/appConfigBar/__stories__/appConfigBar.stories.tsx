import type { Meta, StoryObj } from "@storybook/react";
import { AppConfigBar } from "../appConfigBar";

const meta = {
  title: "parts/AppConfigBar",
  component: AppConfigBar,
  argTypes: {},
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof AppConfigBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

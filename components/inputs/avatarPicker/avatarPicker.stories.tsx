import type { Meta, StoryObj } from "@storybook/react";
import { AvatarPicker } from "./avatarPicker";

const meta = {
  title: "inputs/AvatarPicker",
  component: AvatarPicker,
  argTypes: {},
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof AvatarPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

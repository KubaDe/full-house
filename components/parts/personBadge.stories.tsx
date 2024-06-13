import type { Meta, StoryObj } from "@storybook/react";
import { PersonBadge } from "@/components/parts/personBadge";

const meta = {
  title: "parts/PersonBadge",
  component: PersonBadge,
  argTypes: {
    isOpen: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    profile: { name: "Jack Sparrow", id: "1234" },
  },
} satisfies Meta<typeof PersonBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

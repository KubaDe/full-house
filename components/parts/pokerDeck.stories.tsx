import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PokerDeck } from "@/components/parts/pokerDeck";

const meta = {
  title: "parts/PokerDeck",
  component: PokerDeck,

  decorators: [
    (Story, props) => {
      const [activeValue, setActiveValue] = useState("");
      return <Story {...props} args={{ ...props.args, setActiveValue, activeValue }} />;
    },
  ],
  argTypes: {
    profile: {
      name: "person",
      id: "id",
    },
    activeValue: {
      control: false,
    },
    setActiveValue: {
      control: false,
    },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    profile: { name: "Jack Sparrow", id: "1234" },
  },
} satisfies Meta<typeof PokerDeck>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { PokerSeat, SeatState } from "@/components/parts/pokerSeat";
import { preset } from "@/components/parts/pokerDeck";

const meta = {
  title: "parts/PokerSeat",
  component: PokerSeat,
  argTypes: {
    state: {
      options: Object.values(SeatState),
      control: { type: "select" },
    },
    activeValue: {
      options: preset.map((presetItem) => presetItem.value),
      control: { type: "select" },
    },
  },
  parameters: {
    layout: "centered",
  },
  args: {
    profile: { name: "Player 1", id: "id" },
    state: SeatState.Empty,
    activeValue: "3",
  },
} satisfies Meta<typeof PokerSeat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

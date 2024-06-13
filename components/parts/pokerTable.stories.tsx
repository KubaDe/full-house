import type { Meta, StoryObj } from "@storybook/react";
import { PokerTable } from "@/components/parts/pokerTable";
import { SeatState } from "@/components/parts/pokerSeat";

const meta = {
  title: "parts/PokerTable",
  component: PokerTable,
  parameters: {
    layout: "centered",
  },
  args: {
    seats: [
      {
        id: "1",
        profile: { name: "Player 1", id: "0" },
        state: SeatState.Empty,
        activeValue: "3",
      },
      {
        id: "2",
        profile: { name: "Player 2", id: "1" },
        state: SeatState.Revealed,
        activeValue: "5",
      },
      {
        id: "3",
        profile: { name: "Player 3", id: "2" },
        state: SeatState.Covered,
        activeValue: "11",
      },
      {
        id: "4",
        profile: { name: "Player 4", id: "3" },
        state: SeatState.Covered,
        activeValue: "infinity",
      },
      {
        id: "5",
        profile: { name: "Player 5", id: "4" },
        state: SeatState.Revealed,
        activeValue: "infinity",
      },
      {
        id: "6",
        profile: { name: "Player 6", id: "5" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "7",
        profile: { name: "Player 7", id: "6" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "8",
        profile: { name: "Player 8", id: "7" },
        state: SeatState.Revealed,
        activeValue: "1",
      },
      {
        id: "9",
        profile: { name: "Player 9", id: "8" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "10",
        profile: { name: "Player 10", id: "9" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "11",
        profile: { name: "Player 11", id: "10" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "12",
        profile: { name: "Player 12", id: "11" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "13",
        profile: { name: "Player 13", id: "12" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "14",
        profile: { name: "Player 14", id: "13" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "15",
        profile: { name: "Player 15", id: "14" },
        state: SeatState.Revealed,
        activeValue: "1",
      },
      {
        id: "16",
        profile: { name: "Player 16", id: "15" },
        state: SeatState.Empty,
        activeValue: "1",
      },
      {
        id: "17",
        profile: { name: "Player 17", id: "16" },
        state: SeatState.Empty,
        activeValue: "1",
      },
    ],
  },
} satisfies Meta<typeof PokerTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

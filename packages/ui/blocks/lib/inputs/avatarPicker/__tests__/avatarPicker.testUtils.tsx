import { screen } from "@testing-library/react";

const nextPartLabels = {
  face: "Next face",
  body: "Next body",
  facialHair: "Next facial hair",
  hair: "Next hair",
  accessory: "Next accessory",
} as const;

export const selectNextPart = (part: string) => {
  const buttonName = nextPartLabels[part as keyof typeof nextPartLabels];
  if (!buttonName) {
    throw new Error(`Invalid part: ${part}`);
  }
  return screen.getByRole("button", { name: buttonName });
};

const previousPartLabels = {
  face: "Previous face",
  body: "Previous body",
  facialHair: "Previous facial hair",
  hair: "Previous hair",
  accessory: "Previous accessory",
} as const;

export const selectPreviousPart = (part: string) => {
  const buttonName =
    previousPartLabels[part as keyof typeof previousPartLabels];
  if (!buttonName) {
    throw new Error(`Invalid part: ${part}`);
  }
  return screen.getByRole("button", { name: buttonName });
};

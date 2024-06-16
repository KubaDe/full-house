import { screen } from "@testing-library/react";

const nextPartLabels = {
  face: "Next face",
  body: "Next body",
  facialHair: "Next facial hair",
  hair: "Next hair",
  accessory: "Next accessory",
} as const;

export const selectNextPart = (part: keyof typeof nextPartLabels) => {
  const buttonName = nextPartLabels[part];
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

export const selectPreviousPart = (part: keyof typeof previousPartLabels) => {
  const buttonName = previousPartLabels[part];
  if (!buttonName) {
    throw new Error(`Invalid part: ${part}`);
  }
  return screen.getByRole("button", { name: buttonName });
};

import { expect, it, describe } from "vitest";
import { defaultAvatar, avatarPickerInputSchema } from "../consts";

describe("AvatarPicker => const", () => {
  describe("avatarPickerInputSchema", () => {
    it("should validate correct avatar", () => {
      const { success } = avatarPickerInputSchema.safeParse(defaultAvatar);
      expect(success).toBe(true);
    });

    it("should validate incorrect avatar", () => {
      const { success, error } = avatarPickerInputSchema.safeParse({
        ...defaultAvatar,
        body: defaultAvatar.accessory[0],
        face: defaultAvatar.body[0],
      });
      expect(success).toBe(false);
      expect(error?.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ message: "Incorrect face type", path: ["face"] }),
          expect.objectContaining({ message: "Incorrect body type", path: ["body"] }),
        ]),
      );
    });
  });
});

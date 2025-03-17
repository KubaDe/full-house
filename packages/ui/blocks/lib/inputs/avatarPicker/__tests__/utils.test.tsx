import { expect, it, describe } from "vitest";
import { type FaceType } from "react-peeps";
import { Direction } from "../consts";
import { loopOverPart } from "../utils";
import * as avatarPickerMock from "../__mocks__/avatarPicker.mock";
import { partsOptions } from "@repo/schemas";
describe("AvatarPicker => utils", () => {
  describe("loopOverPart", () => {
    it("should return the next part after middle one when moving forwards", () => {
      const part = "face";
      const direction = Direction.Right;
      const currentState = {
        ...avatarPickerMock.avatar,
        face: partsOptions.face[2] as FaceType,
      };
      const newState = loopOverPart({ direction, part, currentState });
      expect(newState).toEqual({
        ...avatarPickerMock.avatar,
        face: partsOptions.face[3],
      });
    });

    it("should return the first part after the last one when moving forwards", () => {
      const part = "face";
      const direction = Direction.Right;
      const currentState = {
        ...avatarPickerMock.avatar,
        face: partsOptions.face[partsOptions.face.length - 1] as FaceType,
      };
      const newState = loopOverPart({ direction, part, currentState });
      expect(newState).toEqual({
        ...avatarPickerMock.avatar,
        face: partsOptions.face[0],
      });
    });

    it("should return the previous part after middle one when moving backwards", () => {
      const part = "face";
      const direction = Direction.Left;
      const currentState = {
        ...avatarPickerMock.avatar,
        face: partsOptions.face[3] as FaceType,
      };
      const newState = loopOverPart({ direction, part, currentState });
      expect(newState).toEqual({
        ...avatarPickerMock.avatar,
        face: partsOptions.face[2],
      });
    });

    it("should return the last part after the first one when moving backwards", () => {
      const part = "face";
      const direction = Direction.Left;
      const currentState = {
        ...avatarPickerMock.avatar,
        face: partsOptions.face[0] as FaceType,
      };
      const newState = loopOverPart({ direction, part, currentState });
      expect(newState).toEqual({
        ...avatarPickerMock.avatar,
        face: partsOptions.face[partsOptions.face.length - 1],
      });
    });
  });
});

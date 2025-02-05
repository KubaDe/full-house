import { expect, vi, it, describe } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { get } from "lodash-es";
import { AvatarPicker } from "../avatarPicker";
import * as avatarPickerMock from "../__mocks__/avatarPicker.mock";
import * as avatarPickerTestUtils from "./avatarPicker.testUtils";
import { partsOptions } from "@/modules/user/schemas/avatarSchema";

describe("AvatarPicker", () => {
  it.each(["face", "body", "facialHair", "hair", "accessory"])(
    "should change %s",
    (part) => {
      const onChange = vi.fn();
      render(
        <AvatarPicker
          onChange={onChange}
          defaultValue={avatarPickerMock.avatar}
        />,
      );

      fireEvent.click(avatarPickerTestUtils.selectNextPart(part));
      expect(onChange).toHaveBeenLastCalledWith({
        ...avatarPickerMock.avatar,
        [part]: get(partsOptions, `[${part}][1]`),
      });

      fireEvent.click(avatarPickerTestUtils.selectNextPart(part));
      expect(onChange).toHaveBeenLastCalledWith({
        ...avatarPickerMock.avatar,
        [part]: get(partsOptions, `[${part}][2]`),
      });

      fireEvent.click(avatarPickerTestUtils.selectPreviousPart(part));
      expect(onChange).toHaveBeenLastCalledWith({
        ...avatarPickerMock.avatar,
        [part]: get(partsOptions, `[${part}][1]`),
      });
    },
  );
});

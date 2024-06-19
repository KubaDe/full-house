import { vi, it, describe, expect } from "vitest";
import { fireEvent, screen, render, renderHook, waitFor } from "@testing-library/react";
import { useEditProfileForm } from "../useEditProfileForm";
import * as avatarPickerMock from "@/components/inputs/avatarPicker/__mocks__/avatarPicker.mock";
import * as avatarPickerTestUtils from "@/components/inputs/avatarPicker/__tests__/avatarPicker.testUtils";

describe("EditProfileForm", () => {
  it("should call submit when form is valid", async () => {
    const onSave = vi.fn();

    const { result } = renderHook(() =>
      useEditProfileForm({
        onSave,
        defaultValues: {
          name: "",
          avatar: avatarPickerMock.avatar,
        },
      }),
    );
    const { formUI } = result.current;
    render(formUI);

    fireEvent.click(avatarPickerTestUtils.selectNextPart("face"));
    fireEvent.click(avatarPickerTestUtils.selectNextPart("body"));
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "John Smith" } });

    fireEvent.click(screen.getByText("Save profile"));
    await waitFor(() => expect(onSave).toHaveBeenCalled());
    expect(onSave).toHaveBeenCalledWith(
      {
        avatar: {
          ...avatarPickerMock.avatar,
          body: "Shirt",
          face: "Blank",
        },
        name: "John Smith",
      },
      expect.anything(),
    );
  });

  it("should call onInvalid when form is invalid", async () => {
    const onSave = vi.fn();
    const onInvalid = vi.fn();

    const { result } = renderHook(() =>
      useEditProfileForm({
        onSave,
        onInvalid,
        defaultValues: {
          name: "",
          avatar: avatarPickerMock.avatar,
        },
      }),
    );
    const { formUI } = result.current;
    render(formUI);

    fireEvent.click(screen.getByText("Save profile"));
    await waitFor(() => expect(onInvalid).toHaveBeenCalled());
    expect(onInvalid).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.objectContaining({ type: "too_small" }) as {},
      }),
      expect.anything(),
    );
    expect(onSave).not.toHaveBeenCalled();
  });
});

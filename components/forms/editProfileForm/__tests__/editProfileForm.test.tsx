import { vi, it, describe, expect } from "vitest";
import { fireEvent, screen, render, renderHook, waitFor } from "@testing-library/react";
import { useEditProfileForm } from "../useEditProfileForm";
import { defaultAvatar } from "@/components/inputs/avatarPicker";
import { selectNextPart } from "@/components/inputs/avatarPicker/__tests__/avatarPicker.testUtils";

describe("EditProfileForm", () => {
  it("should call submit when form is valid", async () => {
    const onSave = vi.fn();

    const { result } = renderHook(() =>
      useEditProfileForm({
        onSave,
        defaultValues: {
          name: "",
          avatar: defaultAvatar,
        },
      }),
    );
    const { formUI } = result.current;
    render(formUI);

    fireEvent.click(selectNextPart("face"));
    fireEvent.click(selectNextPart("body"));
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "John Smith" } });

    fireEvent.click(screen.getByText("Save profile"));
    await waitFor(() => expect(onSave).toHaveBeenCalled());
    expect(onSave).toHaveBeenCalledWith(
      {
        avatar: {
          ...defaultAvatar,
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
          avatar: defaultAvatar,
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

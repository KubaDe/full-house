import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { show as showModal } from "@ebay/nice-modal-react";
import { ConfirmActionModal } from "../confirmActionModal";
import { render, screen, act } from "@/testUtils/render";

describe("ConfirmActionModal", () => {
  it("should render confirm action modal", async () => {
    render(<div />);
    act(() => {
      void showModal(ConfirmActionModal, { title: "Confirm action", description: "Are you sure?" });
    });
    const confirmActionModal = await screen.findByRole("dialog", { name: "Confirm action" });
    expect(confirmActionModal).toBeDefined();
    const confirmActionDescription = screen.getByText("Are you sure?");
    expect(confirmActionDescription).toBeDefined();
  });

  it("should call onConfirm when confirm button is clicked", async () => {
    const onConfirm = vi.fn();
    render(<div />);
    act(() => {
      void showModal(ConfirmActionModal, {
        title: "Confirm action",
        description: "Are you sure?",
        onConfirm,
      });
    });
    const confirmButton = await screen.findByRole("button", { name: "Confirm" });
    await userEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalled();
  });

  it("should call onCancel when cancel button is clicked", async () => {
    const onCancel = vi.fn();
    render(<div />);
    act(() => {
      void showModal(ConfirmActionModal, {
        title: "Confirm action",
        description: "Are you sure?",
        onCancel,
      });
    });
    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    await userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it("should render custom confirm and cancel button text", async () => {
    render(<div />);
    act(() => {
      void showModal(ConfirmActionModal, {
        title: "Confirm action",
        description: "Are you sure?",
        cancelButtonText: "No",
        confirmButtonText: "Yes",
      });
    });
    const confirmButton = await screen.findByRole("button", { name: "Yes" });
    expect(confirmButton).toBeDefined();
    const cancelButton = await screen.findByRole("button", { name: "No" });
    expect(cancelButton).toBeDefined();
  });

  it("should show loading spinner when onConfirm is called", async () => {
    const onConfirm = vi.fn().mockResolvedValue(new Promise(() => {}));
    render(<div />);
    act(() => {
      void showModal(ConfirmActionModal, {
        title: "Confirm action",
        description: "Are you sure?",
        onConfirm,
      });
    });
    const confirmButton = await screen.findByRole("button", { name: "Confirm" });
    await userEvent.click(confirmButton);
    const confirmButtonSpinner = await screen.findByTestId("button-spinner");
    expect(confirmButtonSpinner).toBeDefined();
  });
});

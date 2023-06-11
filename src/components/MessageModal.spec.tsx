import { render, renderHook, screen, waitFor } from "@testing-library/react";
import MessageModal from "./MessageModal";
import { Wrapper } from "../test-utils";
import { useMessageModalState } from "../hooks/useMessageModalState";

describe("MessageModal", () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <MessageModal />
      </Wrapper>
    );
  });

  test("初期状態の場合、MessageModalを表示しない", () => {
    expect(screen.queryByRole("dialog")).not.toBeTruthy();
  });

  test("MessageModalを表示して、非表示にできる", async () => {
    const { result } = renderHook(() => useMessageModalState(), {
      wrapper: Wrapper,
    });

    result.current.openMessageModalWithMessage("Hello, MessageModal.");

    await waitFor(() => {
      expect(screen.getByText(/Hello, MessageModal./)).toBeInTheDocument();
    });

    result.current.closeMessageModal();

    await waitFor(() => {
      expect(
        screen.queryByText(/Hello, MessageModal./)
      ).not.toBeInTheDocument();
    });
  });
});

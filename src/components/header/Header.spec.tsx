import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { Header } from ".";
import { Wrapper } from "../../test-utils";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";

jest.mock("../../lib/auth", () => ({
  signOut: () => void 0,
}));

describe("Header", () => {
  const ui = (
    <Wrapper>
      <Header />
    </Wrapper>
  );

  afterEach(() => {
    cleanup();
  });

  test("サインイン済みの場合、`サインアウト`のリンクを表示する", async () => {
    const { result } = renderHook(() => useSignedInUserState(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setSignedInUser({
        uid: "1234",
        username: "John Lennon",
        role: "editor",
        email: "johnlennon@example.com",
      });
    });

    render(ui);

    expect(screen.getByText("ログアウト")).toBeInTheDocument();
  });

  test("サインインしていない状態の場合、`サインイン`のリンクを表示する", async () => {
    const { result, rerender } = renderHook(() => useSignedInUserState(), {
      wrapper: Wrapper,
    });

    act(() => {
      result.current.setSignedInUser({
        uid: "1234",
        username: "John Lennon",
        role: "editor",
        email: "johnlennon@example.com",
      });
    });

    rerender();
    act(() => {
      result.current.setSignOut();
    });

    render(ui);

    expect(screen.getByText("ログイン")).toBeInTheDocument();
  });
});

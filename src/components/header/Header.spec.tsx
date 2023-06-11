import {
  act,
  cleanup,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { Header } from ".";
import { Wrapper } from "../../test-utils";
import { useSignedInUserState } from "../../hooks/useSignedInUserState";

jest.mock("../../lib/auth", () => ({
  signOut: () => {
    return;
  },
}));

const mockedHistory = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockedHistory,
}));

describe("Header", () => {
  beforeEach(() => {
    render(
      <Wrapper>
        <Header />
      </Wrapper>
    );
  });

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

    await waitFor(() => {
      expect(screen.getByText("サインアウト")).toBeInTheDocument();
    });
  });

  test("サインイン状態からサインアウトした場合、`サインイン`のリンクを表示する", async () => {
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

    await waitFor(() => {
      expect(screen.getByText("サインアウト")).toBeInTheDocument();
    });

    act(() => {
      result.current.setSignOut();
    });

    await waitFor(() => {
      expect(screen.getByText("サインイン")).toBeInTheDocument();
    });
  });
});

import { renderHook, waitFor, screen, act } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { useCreateUser } from "./useCreateUser";
import { input } from "../../test-utils/createUser";

jest.mock("../../lib/auth", () => ({
  createUserInFirebase: (_email: string, _password: string) => {
    return {
      uid: "newusergenerateduid",
    };
  },
  signIn: (_email: string, _password: string) => {
    return;
  },
}));

test("[role=master]以外のユーザーが実行した場合、エラーモーダルを発生させる", async () => {
  const { result } = renderHook(() => useCreateUser(), {
    wrapper: Wrapper,
  });

  await act(async () => {
    await result.current.handleCreateUser(input, "editor");
  });

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(/権限がありません。/);
  });
});

test("ユーザーロールがmasterの場合、登録ボタンをクリックするとユーザー作成に成功した旨のメッセージを表示する", async () => {
  const { result } = renderHook(() => useCreateUser(), {
    wrapper: Wrapper,
  });

  await act(async () => {
    await result.current.handleCreateUser(input, "master");
  });

  waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アリスを作成しました。/
    );
  });
});

import { cleanup, waitFor, screen } from "@testing-library/react";
import { setupCreateAccount } from "../../test-utils/createAccount";
import { setupCurrentUser } from "../../test-utils/currentUser";

jest.mock("../../lib/auth", () => ({
  createAccountInFirebaseAuth: (_email: string, _password: string) => {
    return {
      uid: "newusergenerateduid",
    };
  },
}));

afterEach(() => cleanup());

test("ユーザーのロールがeditorの場合、登録ボタンをクリックするとエラーメッセージを表示する", async () => {
  await setupCurrentUser("editor");

  const { clickSubmitButton } = await setupCreateAccount();

  await clickSubmitButton();

  waitFor(() => {
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(/権限がありません。/).toBeInTheDocument();
  });
});

test("ユーザーロールがmasterの場合、登録ボタンをクリックするとユーザー作成に成功した旨のメッセージを表示する", async () => {
  await setupCurrentUser("master");

  const { clickSubmitButton } = await setupCreateAccount();

  await clickSubmitButton();

  waitFor(() => {
    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(/アリスを作成しました。/).toBeInTheDocument();
  });
});

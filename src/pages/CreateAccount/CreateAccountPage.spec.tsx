import { cleanup, waitFor, screen, render } from "@testing-library/react";
import { setupCreateAccount } from "../../test-utils/createAccount";
import { setupCurrentUser } from "../../test-utils/currentUser";
import { CreateAccountPage } from ".";
import { Wrapper } from "../../test-utils";

jest.mock("../../lib/auth", () => ({
  createAccountInFirebaseAuth: (_email: string, _password: string) => {
    return {
      uid: "newusergenerateduid",
    };
  },
}));

beforeEach(() => {
  render(
    <Wrapper>
      <CreateAccountPage />
    </Wrapper>
  );
});
afterEach(() => cleanup());

test("ユーザーのロールがeditorの場合、登録ボタンをクリックするとエラーメッセージを表示する", async () => {
  await setupCurrentUser("editor");

  const { clickSubmitButton } = await setupCreateAccount();

  await clickSubmitButton();

  waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(/権限がありません。/);
  });
});

test("ユーザーロールがmasterの場合、登録ボタンをクリックするとユーザー作成に成功した旨のメッセージを表示する", async () => {
  await setupCurrentUser("master");

  const { clickSubmitButton } = await setupCreateAccount();

  await clickSubmitButton();

  waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /アリスを作成しました。/
    );
  });
});

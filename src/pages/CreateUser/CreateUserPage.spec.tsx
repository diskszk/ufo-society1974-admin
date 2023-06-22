import { screen, cleanup, render, waitFor } from "@testing-library/react";
import { CreateUserPage } from ".";
import { Wrapper } from "../../test-utils";
import { setupCurrentUser } from "../../test-utils/currentUser";

jest.mock("../../lib/auth", () => ({
  createUserInFirebase: (_email: string, _password: string) => {
    return {
      uid: "newusergenerateduid",
    };
  },
}));

beforeEach(() => {
  render(
    <Wrapper>
      <CreateUserPage />
    </Wrapper>
  );
});
afterEach(() => cleanup());

test.skip("ユーザーのロールがeditorの場合、登録ボタンをクリックするとエラーメッセージを表示する", async () => {
  await setupCurrentUser("editor");

  waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      /このページへのアクセス権がありません。/
    );
  });
});

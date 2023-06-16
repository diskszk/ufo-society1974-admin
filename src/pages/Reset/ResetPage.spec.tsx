import { render, screen, waitFor } from "@testing-library/react";
import { Wrapper } from "../../test-utils";
import { ResetPage } from ".";
import { setupReset } from "../../test-utils/reset";

jest.mock("../../lib/auth", () => ({
  resetPassword: (_email: string) => {
    return;
  },
}));

beforeEach(() => {
  render(
    <Wrapper>
      <ResetPage />
    </Wrapper>
  );
});

test("存在するユーザーのメールアドレスが入力されてリセットボタンがクリックされた場合、モーダルに成功した旨を表示する", async () => {
  const { clickResetButton } = await setupReset();

  await clickResetButton();

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "入力されたメールアドレス宛にご案内メールを送信しました。"
    );
  });
});

test("存在しないユーザーのメールアドレスが入力されたリセットボタンがクリックされた場合、エラーメッセージを表示する", async () => {
  const { clickResetButton } = await setupReset({ email: "notfound@test.com" });

  await clickResetButton();

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "入力されたメールアドレスと一致するユーザーが存在しません。"
    );
  });
});

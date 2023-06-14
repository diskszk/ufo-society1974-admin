import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wrapper } from "../../test-utils";
import { ResetPage } from ".";
import MessageModal from "../../components/MessageModal";

const user = userEvent.setup();

const setup = async (injectValue?: Partial<{ email: string }>) => {
  render(
    <Wrapper>
      <MessageModal />
      <ResetPage />
    </Wrapper>
  );

  const input = {
    email: "editor@example.com",
    ...injectValue,
  };

  await user.type(screen.getByRole("textbox", { name: "E-mail" }), input.email);

  await user.click(screen.getByRole("button", { name: "リセット" }));
};

jest.mock("../../lib/auth", () => ({
  resetPassword: (_email: string) => {
    return;
  },
}));

test("存在するユーザーのメールアドレスが入力されてリセットボタンがクリックされた場合、モーダルに成功した旨を表示する", async () => {
  await setup();

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "入力されたメールアドレス宛にご案内メールを送信しました。"
    );
  });
});

test("存在しないユーザーのメールアドレスが入力されたリセットボタンがクリックされた場合、エラーメッセージを表示する", async () => {
  await setup({ email: "notfound@test.com" });

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "入力されたメールアドレスと一致するユーザーが存在しません。"
    );
  });
});

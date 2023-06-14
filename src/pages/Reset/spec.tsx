import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { Wrapper } from "../../test-utils";
import { ResetPage } from ".";
import { WEB_API_BASE_URL } from "../../constants";
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
    email: "valid@example.com",
    ...injectValue,
  };

  await user.type(screen.getByRole("textbox", { name: "E-mail" }), input.email);

  await user.click(screen.getByRole("button", { name: "リセット" }));
};

jest.mock("../../lib/auth", () => ({
  resetPassword: (_email: string) => {
    null;
  },
}));

test("存在するユーザーのメールアドレスが入力された場合、モーダルに成功した旨を表示する", async () => {
  console.log(WEB_API_BASE_URL, "env");

  server.use(
    rest.get(`${WEB_API_BASE_URL}/users`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          uid: "valid-user-id",
          username: "valid user",
          role: "editor",
          email: "valid@example.com",
        })
      );
    })
  );

  await setup();

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "入力されたメールアドレス宛にご案内メールを送信しました。"
    );
  });
});

test("存在しないユーザーのメールアドレスが入力された場合、エラーメッセージを表示する", async () => {
  console.log(WEB_API_BASE_URL, "env");

  server.use(
    rest.get(`${WEB_API_BASE_URL}/users`, (_req, res, ctx) => {
      return res(ctx.status(404));
    })
  );

  await setup({ email: "notfound@test.com" });

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveTextContent(
      "入力されたメールアドレスと一致するユーザーが存在しません。"
    );
  });
});

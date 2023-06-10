import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/react";
import * as stories from "./stories";
import { ResetPartial, Inputs } from "./Reset";

const user = userEvent.setup();

const setup = async (injectValues?: Partial<Inputs>) => {
  const mockFn = jest.fn();

  render(<ResetPartial onSubmit={mockFn} />);

  const input: Inputs = {
    email: "test@example.com",
    ...injectValues,
  };

  const email = screen.getByRole("textbox", { name: "E-mail" });
  const button = screen.getByRole("button", { name: "リセット" });

  await user.type(email, input.email);
  await user.click(button);
};

test("何も入力されていない場合、ログインボタンは非活性である", () => {
  setup();

  expect(screen.getByRole("button", { name: "リセット" })).toBeDisabled();
});

test("メールアドレス以外の文字列が入力された場合、エラーメッセージを表示する", async () => {
  const { InvalidEmail } = composeStories(stories);

  const { container, getByText } = render(<InvalidEmail />);

  await InvalidEmail.play({ canvasElement: container });

  await waitFor(() => {
    expect(getByText(/不正なメールアドレス形式です。/)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInvalid();
  });
});

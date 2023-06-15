import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/react";
import * as stories from "./ResetForm.stories";
import { ResetForm } from "./ResetForm";

const user = userEvent.setup();

const mockFn = jest.fn();
const setup = () => {
  render(<ResetForm onSubmit={mockFn} />);

  const email = screen.getByRole("textbox", { name: "E-mail" });
  const button = screen.getByRole("button", { name: "リセット" });

  return { el: { email, button } };
};

test("何も入力されていない場合、ボタンは非活性である", async () => {
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

test("正しくメールアドレスが入力された場合、リセットボタンをクリックできる", async () => {
  const { el } = setup();

  await user.type(el.email, "test@example.com");

  await waitFor(() => {
    expect(el.email).toBeValid();
    expect(el.button).toBeEnabled();
  });
  await user.click(el.button);

  await waitFor(() => {
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

test("正しくメールアドレスが入力されリセットボタンをクリックされた場合、メールアドレス入力欄は空になる", async () => {
  const { el } = setup();

  await user.type(el.email, "test@example.com");
  await waitFor(() => {
    expect(el.email).toBeValid();
    expect(el.button).toBeEnabled();
  });

  await user.click(el.button);

  await waitFor(() => {
    expect(el.email).toHaveValue("");
  });
});

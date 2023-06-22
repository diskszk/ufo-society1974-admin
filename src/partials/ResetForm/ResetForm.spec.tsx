import { render, screen, waitFor } from "@testing-library/react";
import { composeStories } from "@storybook/react";
import * as stories from "./ResetForm.stories";
import { ResetForm } from "./ResetForm";
import { setupReset } from "../../test-utils/reset";

const mockFn = jest.fn();

const setup = async (injectValue?: Partial<{ email: string }>) => {
  render(<ResetForm onSubmit={mockFn} />);

  return await setupReset(injectValue);
};

test("何も入力されていない場合、ボタンは非活性である", async () => {
  render(<ResetForm onSubmit={mockFn} />);

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
  const { clickResetButton, form } = await setup();

  await waitFor(() => {
    expect(form.email).toBeValid();
    expect(form.button).toBeEnabled();
  });
  await clickResetButton();

  await waitFor(() => {
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

test("正しくメールアドレスが入力されリセットボタンをクリックされた場合、メールアドレス入力欄は空になる", async () => {
  const { clickResetButton, form } = await setup();

  await waitFor(() => {
    expect(form.email).toBeValid();
    expect(form.button).toBeEnabled();
  });

  await clickResetButton();

  await waitFor(() => {
    expect(form.email).toHaveValue("");
  });
});

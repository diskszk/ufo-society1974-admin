import { render, screen, waitFor } from "@testing-library/react";
import { SignInForm } from "./SignInForm";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SignInInputs } from "../../lib/schemas/signInSchema";

const mockFn = jest.fn();

const user = userEvent.setup();

const input: SignInInputs = {
  email: "alice@example.com",
  password: "asdf1234",
};

const ui = (
  <MemoryRouter>
    <SignInForm onSubmit={mockFn} />
  </MemoryRouter>
);

const setup = async (injectValue?: Partial<SignInInputs>) => {
  const validInput: SignInInputs = {
    ...input,
    ...injectValue,
  };

  render(ui);

  const email = screen.getByRole("textbox", { name: "E-mail" });
  const password = screen.getByPlaceholderText("8文字以上で入力");
  const button = screen.getByRole("button", { name: "サインイン" });

  await user.type(email, validInput.email);
  await user.type(password, validInput.password);

  const clickSignIn = async () => {
    await user.click(button);
  };

  return { clickSignIn, form: { email, password, button } };
};

test("何も入力されていない場合、サインインボタンは非活性である", async () => {
  render(ui);
  expect(screen.getByRole("button", { name: "サインイン" })).toBeDisabled();
});

test("メールアドレス入力欄にメールアドレス以外の文字列が入力された場合、エラーメッセージを表示する", async () => {
  const { form } = await setup({ email: "1234" });

  expect(
    await screen.getByText("不正なメールアドレス形式です。")
  ).toBeInTheDocument();
  expect(form.email).toBeInvalid();
});

test("メールアドレスとパスワードが入力された場合、サインインボタンをクリックできる", async () => {
  const { clickSignIn, form } = await setup();

  await waitFor(() => {
    expect(form.email).toBeValid();
    expect(form.password).toBeValid();
  });

  await clickSignIn();

  await waitFor(() => {
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});

test("submit処理中は、submitボタンはdisabledである", async () => {
  const { form } = await setup();

  await user.click(form.button);

  expect(await form.button).toBeDisabled();
});

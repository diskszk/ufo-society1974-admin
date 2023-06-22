import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/react";
import * as stories from "./CreateUserForm.stories";
import { CreateUserForm } from "./CreateUserForm";
import { CreateUserInputs } from "../../lib/schemas/createUserSchema";
import { setupCreateUser } from "../../test-utils/createUser";

const user = userEvent.setup();

const mockHandleBack = jest.fn();
const mockOnSubmit = jest.fn();

afterEach(() => {
  mockOnSubmit.mockClear();
});

const setup = async (injectValues?: Partial<CreateUserInputs>) => {
  render(
    <CreateUserForm
      handleClickBackButton={mockHandleBack}
      onSubmit={mockOnSubmit}
      role="master"
    />
  );
  return await setupCreateUser(injectValues);
};

test("何も入力されていない場合、ボタンは非活性である", async () => {
  render(
    <CreateUserForm
      handleClickBackButton={mockHandleBack}
      onSubmit={mockOnSubmit}
      role="master"
    />
  );

  expect(screen.getByRole("button", { name: "登録する" })).toBeDisabled();
});

test("名前が未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyUsername } = composeStories(stories);

  const { container, getByText } = render(<EmptyUsername />);

  await act(async () => {
    await EmptyUsername.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(getByText(/名前は必ず入力してください。/)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "お名前" })).toBeInvalid();
  });
});

test("メールアドレスが未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyEmail } = composeStories(stories);

  const { container, getByText } = render(<EmptyEmail />);

  await act(async () => {
    await EmptyEmail.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(
      getByText(/メールアドレスは必ず入力してください。/)
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "E-mail" })).toBeInvalid();
  });
});

test("メールアドレス入力欄にメールアドレス以外の値が入力された場合、エラーメッセージを表示する", async () => {
  const { form } = await setup({ email: "1234" });

  expect(
    await screen.getByText(/不正なメールアドレス形式です。/)
  ).toBeInTheDocument();
  expect(form.email).toBeInvalid();
});

test("パスワードが未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyPassword } = composeStories(stories);

  const { container, getByText } = render(<EmptyPassword />);

  await act(async () => {
    await EmptyPassword.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(
      getByText(/パスワードは8文字以上で入力してください。/)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("8文字以上で入力")).toBeInvalid();
  });
});

test("パスワード入力欄に全角文字が入力された場合、エラーメッセージを表示する", async () => {
  const { form } = await setup({ password: "asdf1234あいうえ" });

  expect(
    await screen.getByText(/パスワードは半角英数字混合で入力してください。/)
  );
  expect(form.password).toBeInvalid();
});

test("パスワード入力欄に7文字しか入力されなかった場合、エラーメッセージを表示する", async () => {
  const { form } = await setup({ password: "asdf123" });

  expect(await screen.getByText(/パスワードは8文字以上で入力してください。/));
  expect(form.password).toBeInvalid();
});

test("パスワード入力欄に65文字入力された場合、エラーメッセージを表示する", async () => {
  const s = "abcde".repeat(12) + "12345";
  const { form } = await setup({ password: s });

  expect(await screen.getByText(/パスワードは64文字以下で入力してください。/));
  expect(form.password).toBeInvalid();
});

test("パスワード(確認)が未入力である場合、エラーメッセージを表示する", async () => {
  const { EmptyConfirmPassword } = composeStories(stories);

  const { container, getByText } = render(<EmptyConfirmPassword />);

  await act(async () => {
    await EmptyConfirmPassword.play({ canvasElement: container });
  });

  await waitFor(() => {
    expect(
      getByText(/パスワードは8文字以上で入力してください。/)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("8文字以上で入力(確認)")).toBeInvalid();
  });
});
test("パスワードとパスワード(確認)が一致しない場合、エラーメッセージを表示する", async () => {
  const { InvalidConfirmPassword } = composeStories(stories);
  const { container, getByText } = render(<InvalidConfirmPassword />);

  await InvalidConfirmPassword.play({ canvasElement: container });

  await waitFor(() => {
    expect(getByText(/パスワードが一致しません。/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("8文字以上で入力(確認)")).toBeInvalid();
  });
});
test("すべての入力欄が正常な値で入力された場合、ボタンをクリックする事ができる", async () => {
  const { clickSubmitButton } = await setup();

  await clickSubmitButton();

  expect(await mockOnSubmit).toHaveBeenCalledTimes(1);
});

test("submit処理中は、submitボタンはdisabledである", async () => {
  const { form } = await setup();

  await user.click(form.submitButton);

  expect(await form.submitButton).toBeDisabled();
});

test("ボタンをクリックした後、入力欄はすべて空になる", async () => {
  const { clickSubmitButton, form } = await setup();

  await clickSubmitButton();

  await waitFor(() => {
    expect(form.username).toHaveValue("");
    expect(form.email).toHaveValue("");
    expect(form.password).toHaveValue("");
    expect(form.confirmPassword).toHaveValue("");
  });
});

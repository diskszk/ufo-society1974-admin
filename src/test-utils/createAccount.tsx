import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wrapper } from ".";
import { CreateAccountInputs } from "../lib/schemas/createUserSchema";
import { CreateAccountPage } from "../pages/CreateAccount";

const user = userEvent.setup();

const input: CreateAccountInputs = {
  username: "アリス",
  email: "alice@example.com",
  password: "asdf1234X",
  confirmPassword: "asdf1234X",
  roleType: "editor",
};

export const setupCreateAccount = async (
  injectValues?: Partial<CreateAccountInputs>
) => {
  render(
    <Wrapper>
      <CreateAccountPage />
    </Wrapper>
  );

  const validInput: CreateAccountInputs = {
    ...input,
    ...injectValues,
  };

  const username = screen.getByRole("textbox", { name: "お名前" });
  const email = screen.getByRole("textbox", { name: "E-mail" });
  const password = screen.getByPlaceholderText("8文字以上で入力");
  const confirmPassword = screen.getByPlaceholderText("8文字以上で入力(確認)");
  const submitButton = screen.getByRole("button", { name: "登録する" });

  await user.type(username, validInput.username);
  await user.type(email, validInput.email);
  await user.type(password, validInput.password);
  await user.type(confirmPassword, validInput.confirmPassword);
  await user.tab();

  const clickSubmitButton = async () => {
    await user.click(submitButton);
  };

  return {
    clickSubmitButton,
    form: {
      username,
      email,
      password,
      confirmPassword,
      submitButton,
    },
  };
};

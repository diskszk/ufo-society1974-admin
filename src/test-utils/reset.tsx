import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

export const setupReset = async (injectValue?: Partial<{ email: string }>) => {
  const input = {
    email: "editor@example.com",
    ...injectValue,
  };

  const email = screen.getByRole("textbox", { name: "E-mail" });
  const button = screen.getByRole("button", { name: "リセット" });

  await user.type(email, input.email);

  const clickResetButton = async () => {
    await user.click(button);
  };

  return { clickResetButton, form: { email, button } };
};

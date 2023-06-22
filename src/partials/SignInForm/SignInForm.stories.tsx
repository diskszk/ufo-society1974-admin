import { Meta, StoryObj } from "@storybook/react";
import { SignInForm } from "./SignInForm";
import { CreateUserForm } from "../CreateUserForm";
import { SignInInputs } from "../../lib/schemas/signInSchema";
import { within, userEvent } from "@storybook/testing-library";

// eslint-disable-next-line storybook/story-exports
const meta: Meta = {
  title: "Partials/SignInForm",
  component: SignInForm,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

type Story = StoryObj<typeof CreateUserForm>;

export const Default: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

const input: SignInInputs = {
  email: "alice@example.com",
  password: "asdf1234",
};

const setup = async (
  canvasElement: HTMLElement,
  injectValue?: Partial<SignInInputs>
) => {
  const validInput: SignInInputs = {
    ...input,
    ...injectValue,
  };

  const canvas = within(canvasElement);

  const email = canvas.getByRole("textbox", { name: "E-mail" });

  const password = canvas.getByPlaceholderText("8文字以上で入力");

  await userEvent.type(email, validInput.email);
  await userEvent.type(password, validInput.password);
};

export const Valid: Story = {
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    await setup(canvasElement);
    await userEvent.tab();
  },
};

import { Meta, StoryObj } from "@storybook/react";
import { CreateUserForm } from ".";
import { within, userEvent } from "@storybook/testing-library";
import { CreateUserInputs } from "../../lib/schemas/createUserSchema";
import { input } from "../../test-utils/createUser";

// eslint-disable-next-line storybook/story-exports
const meta: Meta<typeof CreateUserForm> = {
  title: "Partials/CreateUser",
  component: CreateUserForm,
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
  args: {
    handleClickBackButton: () => void 0,
    onSubmit: (_data) => {
      return;
    },
  },
};

const setup = async (
  canvasElement: HTMLElement,
  injectValue?: Partial<CreateUserInputs>
) => {
  const validInput: CreateUserInputs = {
    ...input,
    ...injectValue,
  };

  const canvas = within(canvasElement);

  const username = canvas.getByRole("textbox", { name: "お名前" });
  const email = canvas.getByRole("textbox", { name: "E-mail" });

  const password = canvas.getByPlaceholderText("8文字以上で入力");
  const confirmPassword = canvas.getByPlaceholderText("8文字以上で入力(確認)");

  await userEvent.type(username, validInput.username);
  await userEvent.type(email, validInput.email);
  await userEvent.type(password, validInput.password);
  await userEvent.type(confirmPassword, validInput.confirmPassword);
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

export const EmptyUsername: Story = {
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    await canvas.getByRole("textbox", { name: "お名前" }).focus();
    await userEvent.tab();
  },
};

export const EmptyEmail: Story = {
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    await canvas.getByRole("textbox", { name: "E-mail" }).focus();
    await userEvent.tab();
  },
};

export const EmptyPassword: Story = {
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    await canvas.getByPlaceholderText("8文字以上で入力").focus();
    await userEvent.tab();
  },
};

export const EmptyConfirmPassword: Story = {
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    await canvas.getByPlaceholderText("8文字以上で入力(確認)").focus();
    await userEvent.tab();
  },
};

export const InvalidConfirmPassword: Story = {
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    await setup(canvasElement, { confirmPassword: "abcd5678" });

    await userEvent.tab();
  },
};

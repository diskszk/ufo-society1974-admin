import { Meta, StoryObj } from "@storybook/react";
import { CreateAccountPartial } from ".";
import { within, userEvent } from "@storybook/testing-library";
import { CreateAccountInputs } from "../../lib/schemas/createUserSchema";

// eslint-disable-next-line storybook/story-exports
const meta: Meta<typeof CreateAccountPartial> = {
  title: "Partials/CreateAccount",
  component: CreateAccountPartial,
};

export default meta;

type Story = StoryObj<typeof CreateAccountPartial>;

export const Default: Story = {
  args: {
    handleClickBackButton: () => void 0,
    onSubmit: (data) => {
      console.log(data);
    },
  },
};

const setup = async (
  canvasElement: HTMLElement,
  injectValue?: Partial<CreateAccountInputs>
) => {
  const input: CreateAccountInputs = {
    username: "アリス",
    email: "alice@example.com",
    password: "asdf1234",
    confirmPassword: "asdf1234",
    roleType: "editor",
    ...injectValue,
  };

  const canvas = within(canvasElement);

  const username = canvas.getByRole("textbox", { name: "お名前" });
  const email = canvas.getByRole("textbox", { name: "E-mail" });

  const password = canvas.getByPlaceholderText("8文字以上で入力");
  const confirmPassword = canvas.getByPlaceholderText("8文字以上で入力(確認)");

  await userEvent.type(username, input.username);
  await userEvent.type(email, input.email);
  await userEvent.type(password, input.password);
  await userEvent.type(confirmPassword, input.confirmPassword);
};

export const Valid: Story = {
  args: {
    handleClickBackButton: () => {
      console.log("ok");
    },
    onSubmit: (data) => {
      console.log(data);
    },
  },
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

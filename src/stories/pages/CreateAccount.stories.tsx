import type { Meta, StoryObj } from "@storybook/react";
import { CreateAccount } from "../../pages/CreateAccount";

const meta: Meta<typeof CreateAccount> = {
  title: "Pages/CreateAccount",
  component: CreateAccount,
};

export default meta;

type Story = StoryObj<typeof CreateAccount>;

export const Default: Story = {
  args: {},
};

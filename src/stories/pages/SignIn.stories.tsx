import type { Meta, StoryObj } from "@storybook/react";
import { SignIn } from "../../pages";

const meta: Meta<typeof SignIn> = {
  title: "Pages/SignIn",
  component: SignIn,
};

export default meta;

type Story = StoryObj<typeof SignIn>;

export const Default: Story = {
  args: {},
};

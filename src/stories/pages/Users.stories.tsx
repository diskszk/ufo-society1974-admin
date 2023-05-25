import type { Meta, StoryObj } from "@storybook/react";
import Users from "../../pages/Users";

const meta: Meta<typeof Users> = {
  title: "Pages/Users",
  component: Users,
};

export default meta;

type Story = StoryObj<typeof Users>;

export const Default: Story = {
  args: {},
};

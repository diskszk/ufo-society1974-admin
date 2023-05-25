import type { Meta, StoryObj } from "@storybook/react";
import { Presentation as Home } from "../../pages/Home";

const meta: Meta<typeof Home> = {
  title: "Pages/Home",
  component: Home,
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {
  args: {
    username: "サンプルユーザー",
  },
};

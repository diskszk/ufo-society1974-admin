import type { Meta, StoryObj } from "@storybook/react";
import Albums from "../../pages/Albums";

const meta: Meta<typeof Albums> = {
  title: "Pages/Albums",
  component: Albums,
};

export default meta;

type Story = StoryObj<typeof Albums>;

export const Default: Story = {
  args: {},
};

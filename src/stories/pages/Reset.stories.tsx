import type { Meta, StoryObj } from "@storybook/react";
import { Reset } from "../../pages";

const meta: Meta<typeof Reset> = {
  title: "Pages/Reset",
  component: Reset,
};

export default meta;

type Story = StoryObj<typeof Reset>;

export const Default: Story = {
  render: () => <Reset />,
};

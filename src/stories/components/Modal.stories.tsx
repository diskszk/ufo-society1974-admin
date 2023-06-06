import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../../components/Modal";

const meta: Meta<typeof Modal> = {
  title: "components/Modal",
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;
export const Default: Story = {
  args: {
    message: "Test message.",
  },
};

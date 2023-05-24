import type { Meta, StoryObj } from "@storybook/react";
import MessageModal from "../../components/MessageModal";

const meta: Meta<typeof MessageModal> = {
  title: "components/MessageModal",
  component: MessageModal,
};

export default meta;

type Story = StoryObj<typeof MessageModal>;
export const Default: Story = {
  args: {
    message: "Test message.",
  },
};

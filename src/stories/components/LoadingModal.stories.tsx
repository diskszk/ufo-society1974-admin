import type { Meta, StoryObj } from "@storybook/react";
import LoadingModal from "../../components/LoadingModal";

const meta: Meta<typeof LoadingModal> = {
  title: "components/LoadingModal",
  component: LoadingModal,
};

export default meta;

type Story = StoryObj<typeof LoadingModal>;
export const Default: Story = {};

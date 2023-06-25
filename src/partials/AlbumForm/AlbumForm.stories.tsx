import type { Meta, StoryObj } from "@storybook/react";
import { AlbumForm } from "./AlbumForm";

const meta: Meta<typeof AlbumForm> = {
  title: "Partials/AlbumForm",
  component: AlbumForm,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

type Story = StoryObj<typeof AlbumForm>;

export const Default: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

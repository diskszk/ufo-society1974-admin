import type { Meta, StoryObj } from "@storybook/react";
import { AlbumEdit } from "../../pages";

const meta: Meta<typeof AlbumEdit> = {
  title: "Pages/AlbumEdit",
  component: AlbumEdit,
};

export default meta;

type Story = StoryObj<typeof AlbumEdit>;

export const Default: Story = {
  args: {},
};

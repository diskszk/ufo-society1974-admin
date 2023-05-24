import type { Meta, StoryObj } from "@storybook/react";
import { Presentation as Songs } from "../../pages/Songs";
import { mockAlbum } from "../mockData";

const meta: Meta<typeof Songs> = {
  title: "Pages/Songs",
  component: Songs,
};

export default meta;

type Story = StoryObj<typeof Songs>;

export const アルバム編集: Story = {
  render: () => (
    <Songs
      album={mockAlbum}
      albumId="album-id-01"
      editButtonLabel="アルバム編集"
    />
  ),
};
export const アルバム閲覧: Story = {
  render: () => (
    <Songs
      album={mockAlbum}
      albumId="album-id-01"
      editButtonLabel="アルバム閲覧"
    />
  ),
};

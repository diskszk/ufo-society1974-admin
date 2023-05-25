import type { Meta, StoryObj } from "@storybook/react";
import { Presentation as Songs } from "../../pages/Songs";
import { mockAlbum } from "../mockData";

const meta: Meta<typeof Songs> = {
  title: "Pages/Songs",
  component: Songs,
};

export default meta;

type Story = StoryObj<typeof Songs>;

export const AlbumEdit: Story = {
  args: {
    album: mockAlbum,
    albumId: "album-id-01",
    editButtonLabel: "アルバム編集",
  },
};
export const AlbumWatch: Story = {
  args: {
    album: mockAlbum,
    albumId: "album-id-01",
    editButtonLabel: "アルバム閲覧",
  },
};

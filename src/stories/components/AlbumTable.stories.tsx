import type { Meta, StoryObj } from "@storybook/react";
import { Presentation as AlbumTable } from "../../components/albums/AlbumTable";
import { mockAlbum } from "../mockData";

const meta: Meta<typeof AlbumTable> = {
  title: "components/AlbumTable",
  component: AlbumTable,
};

export default meta;

type Story = StoryObj<typeof AlbumTable>;

const mockAlbums = [mockAlbum, mockAlbum, mockAlbum, mockAlbum];

export const WithContainer: Story = {
  render: () => (
    <div className="album-container">
      <AlbumTable albums={mockAlbums} />
    </div>
  ),
};

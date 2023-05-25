import type { Meta, StoryObj } from "@storybook/react";
import SongEdit from "../../pages/SongEdit";

const meta: Meta<typeof SongEdit> = {
  title: "Pages/SongEdit",
  component: SongEdit,
};

export default meta;

type Story = StoryObj<typeof SongEdit>;

export const Default: Story = {
  args: {},
};

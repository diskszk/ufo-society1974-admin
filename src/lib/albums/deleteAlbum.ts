import { db } from "../../firebase";
import { deleteSong, getSongs } from "../songs";
import { Song } from "../types";

export const deleteAlbum = async (albumId: string): Promise<void> => {
  const songList = await getSongs(albumId);

  songList.map((song: Song) => {
    deleteSong(albumId, song.id);
  });

  await db.collection("albums").doc(albumId).delete();
};

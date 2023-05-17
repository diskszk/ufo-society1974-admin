import { Song } from "../types";
import { getSongs } from "./getSongs";

export const getSingleSong = async (
  albumId: string,
  songId: string
): Promise<Song | void> => {
  const songs: Song[] = await getSongs(albumId);

  if (!songs.length) {
    return;
  }
  const song = songs.find((song) => song.id === songId);

  if (!song) {
    return;
  }
  return song;
};

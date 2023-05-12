import { db, FirebaseTimestamp } from "../../firebase";
import { Song } from "../types";

export const saveSong = async (song: Song, albumId: string): Promise<void> => {
  const songsRef = db
    .collection("albums")
    .doc(albumId)
    .collection("songs")
    .doc(song.id);
  const timestamp = FirebaseTimestamp.now();

  const data: Song = {
    ...song,
    createdAt: timestamp,
  };

  await songsRef.set(data, { merge: true });
};

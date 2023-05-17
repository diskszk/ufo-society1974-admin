import { db, storage } from "../../firebase";

export const deleteSongFile = async (
  filename: string,
  albumId: string,
  songId: string
): Promise<void> => {
  const storageRef = storage.ref("musics").child(filename);

  await storageRef.delete();

  const songFileRef = db
    .collection("albums")
    .doc(albumId)
    .collection("songs")
    .doc(songId);
  const songFileData = {
    filename: "",
    path: "",
  };

  await songFileRef.set(songFileData, { merge: true });
};

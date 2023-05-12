import { storage } from "../../firebase";
import { File } from "../types";

export const uploadSongFile = async (
  file: globalThis.File,
  newFilename: string
): Promise<File> => {
  const uploadRef = storage.ref("musics").child(newFilename);
  const uploadTask = uploadRef.put(file);

  await uploadTask;
  const downloadUrl: string = await uploadTask.snapshot.ref.getDownloadURL();

  const newSongFile: File = {
    filename: newFilename,
    path: downloadUrl,
  };

  return newSongFile;
};

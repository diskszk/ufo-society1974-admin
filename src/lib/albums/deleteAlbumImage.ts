import { imagesRef } from "../../firebase";

export const deleteAlbumImage = async (filename: string): Promise<void> => {
  await imagesRef.child(filename).delete();
};

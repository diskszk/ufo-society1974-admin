import { db, FirebaseTimestamp } from '../../firebase';
import { Album, File, PublishPlatform } from '../types';
import { generateRandomStrings } from '../helpers/generateRandomStrings';

const albumsRef = db.collection('albums');

export const saveAlbum = async (
  title: string,
  imageFile: File,
  description: string,
  services: PublishPlatform,
  publishedDate: string,
  albumId: string
): Promise<void> => {
  const timestamp = FirebaseTimestamp.now();
  const id = albumId !== '' ? albumId : generateRandomStrings();

  const data: Album = {
    createdAt: timestamp,
    description: description,
    id: id,
    imageFile: {
      filename: imageFile.filename,
      path: imageFile.path,
    },
    publishedDate: publishedDate,
    title: title,
    publishPlatform: services,
  };

  await albumsRef.doc(id).set(data, { merge: true });
};

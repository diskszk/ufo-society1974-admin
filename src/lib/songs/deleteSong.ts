import { db } from '../../firebase';

export const deleteSong = async (albumId: string, songId: string) => {
  return db
    .collection('albums')
    .doc(albumId)
    .collection('songs')
    .doc(songId)
    .delete()
    .catch((e) => {
      throw new Error(e);
    });
};

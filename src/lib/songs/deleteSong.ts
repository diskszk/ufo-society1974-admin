import { db } from '../../firebase';

export const deleteSong = async (albumId: string, songId: string) => {
  await db
    .collection('albums')
    .doc(albumId)
    .collection('songs')
    .doc(songId)
    .delete();
};

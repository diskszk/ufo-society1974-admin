import { db } from '../../firebase';
import { Song } from '../../lib/types';

export const fetchSongs = async (
  albumId: string
): Promise<firebase.firestore.DocumentData[]> => {
  if (!albumId) {
    return [];
  } else {
    const songsRef = db
      .collection('albums')
      .doc(albumId)
      .collection('songs')
      .orderBy('id');

    const snapshot = await songsRef.get();
    const dataList: firebase.firestore.DocumentData[] = snapshot.docs.map(
      (doc) => {
        return doc.data();
      }
    );
    return dataList;
  }
};

import { db, FirebaseTimestamp } from '../../firebase';
import { Song } from '../types';

export const saveSong = (song: Song, albumId: string) => {
  return async () => {
    const songsRef = db
      .collection('albums')
      .doc(albumId)
      .collection('songs')
      .doc(song.id);
    const timestamp = FirebaseTimestamp.now();

    const data: Song = {
      ...song,
      created_at: timestamp,
    };

    await songsRef.set(data, { merge: true }).catch((e: string) => {
      alert(`Error: ${e}`);
      throw new Error(e);
    });
  };
};

import { db, FirebaseTimestamp } from '../../firebase';
import { Song, File } from '../types';
import { push } from 'connected-react-router';

export const saveSongs = (
  id: string,
  title: string,
  songFile: File,
  story: string,
  lyric: string,
  albumId: string
) => {
  return async (dispatch: any) => {
    const songsRef = db
      .collection('albums')
      .doc(albumId)
      .collection('songs')
      .doc(id);
    const timestamp = FirebaseTimestamp.now();

    const data: Song = {
      id: id,
      lyric: lyric,
      songFile: {
        filename: songFile.filename,
        path: songFile.path,
      },
      story: story,
      title: title,
      created_at: timestamp,
    };

    await songsRef.set(data, { merge: true }).catch((e: string) => {
      alert(`Error: ${e}`);
      throw new Error(e);
    });
  };
};

import { db, FirebaseTimestamp } from '../../firebase';
import { Song, File } from '../types';
import { push } from 'connected-react-router';

const unpublishedSongsRef = db.collection('unpublished_songs');

export const saveSongs = (
  id: string,
  title: string,
  songFile: File,
  story: string,
  lyric: string
) => {
  return async (dispatch: any) => {
    const timestamp = FirebaseTimestamp.now();
    const numId = id;

    // const data: Song = {
    const data = {
      id: parseInt(numId, 10),
      title: title,
      // songFile: {
      //   filename: songFile.filename,
      //   path: songFile.path
      // },
      story: story,
      lyric: lyric,
      created_at: timestamp,
    };

    const strId = id.toString();

    unpublishedSongsRef
      .doc(strId)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/songs'));
      })
      .catch((e: string) => {
        console.error(`Error: ${e}`);
        throw new Error(e);
      });
  };
};

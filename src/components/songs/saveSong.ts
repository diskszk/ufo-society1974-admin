import { db, FirebaseTimestamp } from '../../firebase';
import { Song, Music } from "./types";
import { push } from 'connected-react-router';

const unpublishedSongsRef = db.collection('unpublished_songs');

export const saveSong = (
  id: string, title: string, music: Music, story: string, lyric: string
) => {

  return async (dispatch: any) => {

    const timestamp = FirebaseTimestamp.now();
    const numId = id;

    const data: Song = {
      id: parseInt(numId, 10),
      title: title,
      music: {
        filename: music.filename,
        path: music.path
      },
      story: story,
      lyric: lyric,
      created_at: timestamp,

      // thumbnail: 
    }

    const strId = id.toString();

    unpublishedSongsRef.doc(strId).set(data, { merge: true })
      .then(() => {
        dispatch(push('/songs'));
      }).catch((e: string) => {
        console.error(`Error: ${e}`);
        throw new Error(e);
      })
  }
}
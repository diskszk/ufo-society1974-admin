import { db, FirebaseTimestamp } from '../../firebase';
import { Song } from "./types";
import { push } from 'connected-react-router';

const songRef = db.collection('songs');

export const saveSong = (
  id: string, title: string, titleKana: string, story: string, lyric: string
) => {

  return async (dispatch: any) => {

    const timestamp = FirebaseTimestamp.now();
    const numId = id;

    const data: Song = {
      id: parseInt(numId, 10),
      title: title,
      titleKana: titleKana,
      story: story,
      lyric: lyric,
      created_at: timestamp
    }

    const strId = id.toString();

    songRef.doc(strId).set(data, { merge: true })
      .then(() => {
        dispatch(push('/songs'));
      }).catch((e: string) => {
        console.error(`Error: ${e}`);
        throw new Error(e);
      })
  }
}
import { db, FirebaseTimestamp } from '../../firebase';
import { push } from 'connected-react-router';

export type Song = {
  id: number;
  title: string;
  titleKana: string;
  story: string;
  lyric: string;
  created_at: firebase.firestore.Timestamp;
}

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
    console.log(typeof id);

    songRef.doc(strId).set(data, { merge: true })
      .then(() => {
        dispatch(push('/songs'));
      }).catch((e: string) => {
        console.error(`Error: ${e}`);
        throw new Error(e);
      })
  }
}
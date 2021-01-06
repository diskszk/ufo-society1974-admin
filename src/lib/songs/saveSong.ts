import { db, FirebaseTimestamp } from '../../firebase';
import { Song } from '../types';
import {
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../../store/LoadingStatusReducer';

// TODO: redux-thunkを取り外す
export const saveSong = (song: Song, albumId: string) => {
  const songsRef = db
    .collection('albums')
    .doc(albumId)
    .collection('songs')
    .doc(song.id);
  const timestamp = FirebaseTimestamp.now();

  const data: Song = {
    ...song,
    createdAt: timestamp,
  };

  return async (dispatch: any) => {
    try {
      dispatch(requestFetchAction());
      await songsRef.set(data, { merge: true });
      dispatch(successFetchAction());
    } catch {
      dispatch(failedFetchAction('曲の保存に失敗しました。'));
    }
  };
};

import { db, FirebaseTimestamp } from '../../firebase';
import { Image } from '../types';
import { push } from 'connected-react-router';

const albumsRef = db.collection('albums');

// push un_published albums
export const saveAlbum = (
  title: string,
  image: Image,
  discription: string,
  publish_date: string,
) => {
  return async (dispatch: any) => {
    const timestamp = FirebaseTimestamp.now();
    const id = title.replace(/\s+/g, '_')

    const data = {
      created_at: timestamp,
      discription: discription,
      id: id,
      image: {
        filename: image.filename,
        path: image.path,
      },
      publish_date: publish_date,
      title: title,
    };

    await albumsRef.doc(id).set(data, { merge: true })
      .then(() => {
        alert(`アルバムの情報を保存しました。`);
        dispatch(push('/albums'))
      })
      .catch((e) => {
        alert(`${e}: アルバムの保存に失敗しました。`);
        return false;
      });
  }
};
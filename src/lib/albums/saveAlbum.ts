import { db, FirebaseTimestamp } from '../../firebase';
import { File } from '../types';
import { push } from 'connected-react-router';
import { generateRandomStrings } from '../generateRandomStrings';

const albumsRef = db.collection('albums');

// push un_published albums
export const saveAlbum = (
  title: string,
  image: File,
  discription: string,
  publish_date: string
) => {
  return async (dispatch: any) => {
    const timestamp = FirebaseTimestamp.now();
    const id = generateRandomStrings();

    const data = {
      created_at: timestamp,
      discription: discription,
      id: id,
      imageFile: {
        filename: image.filename,
        path: image.path,
      },
      publish_date: publish_date,
      title: title,
    };

    await albumsRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        alert(`アルバムの情報を保存しました。`);
        dispatch(push('/albums'));
      })
      .catch((e) => {
        alert(`${e}: アルバムの保存に失敗しました。`);
        return false;
      });
  };
};

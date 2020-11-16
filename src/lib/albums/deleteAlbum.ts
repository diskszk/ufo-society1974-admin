import { db } from '../../firebase';
// import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

export const deleteAlbum = async (id: string) => {
  // const dispatch = useDispatch();
  // return async (dispatch: any) => {
  return (
    db
      .collection('albums')
      .doc(id)
      .delete()
      // .then(() => dispatch(push('/albums')))
      .catch((e) => {
        alert(`${e}: エラーが発生しました。`);
      })
  );
  // }
};

import { storage } from '../../firebase';
import { updateSongFileAction } from '../../store/SongFileReducer';
import { File } from '../types';

export const uploadSongFile = (file: globalThis.File, newFilename: string) => {
  const uploadRef = storage.ref('musics').child(newFilename);
  const uploadTask = uploadRef.put(file);

  return async (dispatch: any) => {
    return await uploadTask
      .then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          const newSongFile: File = {
            filename: newFilename,
            path: downloadURL,
          };
          dispatch(updateSongFileAction(newSongFile));
          alert('曲のデータがアップロードされました。');
        });
      })
      .catch((e) => {
        alert('曲のデータのアップロードに失敗しました。');
        throw new Error(e);
      });
  };
};

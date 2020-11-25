import { storage } from '../../firebase';
import { File } from '../types';

export const uploadSongFile = async (
  file: globalThis.File,
  newFilename: string
): Promise<File> => {
  const uploadRef = storage.ref('musics').child(newFilename);
  const uploadTask = uploadRef.put(file);

  return await uploadTask
    .then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
        console.log(2);

        const newSongFile: File = {
          filename: newFilename,
          path: downloadURL,
        };
        return newSongFile;
      });
    })
    .catch((e) => {
      alert('曲のデータのアップロードに失敗しました。');
      throw new Error(e);
    });
};

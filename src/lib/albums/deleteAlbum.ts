import { db } from '../../firebase';

export const deleteAlbum = async (id: string) => {
  return db
    .collection('albums')
    .doc(id)
    .delete()
    .catch((e) => {
      throw new Error(e);
    });
};

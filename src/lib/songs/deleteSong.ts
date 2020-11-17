import { db } from '../../firebase';

export const deleteSong = async (id: number) => {
  return db
    .collection('unpublished_songs')
    .doc(id.toString())
    .delete()
    .catch((e) => {
      throw new Error(e);
    });
};

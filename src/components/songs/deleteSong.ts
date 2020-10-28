import { db } from '../../firebase';

export const deleteSong = async (id: number) => {
  return db.collection('songs').doc(id.toString()).delete()
    .catch(() => {
      throw new Error;
    })
}
import { db } from '../../firebase';
import { fetchSongs } from './fetchSongs';

export const deleteSong = (id: string) => {
  db.collection('songs').doc(id).delete()
    .catch(() => {
      throw new Error;
    })

  fetchSongs();
}
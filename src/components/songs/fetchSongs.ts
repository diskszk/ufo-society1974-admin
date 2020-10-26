import { db } from '../../firebase';
import { Song } from './saveSong';

export const fetchSongs = async () => {
  const res = await db.collection("songs").get();

  if (res.empty) return [];
  const songList: firebase.firestore.DocumentData[] = [];

  res.forEach((doc) => {
    songList.push(doc.data());
  })

  console.log(JSON.stringify(songList));

  return songList;
}
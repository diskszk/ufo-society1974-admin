import { db } from '../../firebase';
export const fetchSongs = async () => {
  const res = await db.collection("songs").get();

  if (res.empty) return [];
  const songList: firebase.firestore.DocumentData[] = [];

  res.forEach((doc) => {
    songList.push(doc.data());
  })

  return songList;
}
import { db } from '../../firebase';
import { Song } from "./types";

const fetchSongs = async () => {
  const res = await db.collection("songs").orderBy('id').get();

  if (res.empty) return [];
  const songList: firebase.firestore.DocumentData[] = [];

  res.forEach((doc) => {
    songList.push(doc.data());
  })

  return songList;
}

export const getSongs = async () => {
  return await fetchSongs()
    .then((songList) => {

      const dataList: Song[] = songList.map((song: firebase.firestore.DocumentData) => {
        return {
          id: song.id,
          title: song.title,
          titleKana: song.titleKana,
          story: song.story,
          lyric: song.lyric,
          created_at: song.created_at
        }
      });
      return dataList;
    }).catch((e: string) => {
      throw new Error(e);
    });
}
import { Song } from "./types";
import { fetchSongs } from './fetchSongs';

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

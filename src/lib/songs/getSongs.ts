import { Song } from '../../lib/types';
import { fetchSongs } from './fetchSongs';

export const getSongs = async () => {
  return await fetchSongs()
    .then((songList) => {
      const dataList: Song[] = songList.map(
        (song: firebase.firestore.DocumentData) => {
          return {
            id: song.id,
            lyric: song.lyric,
            songFile: {
              filename: song.songFile.filename,
              path: song.songFile.path,
            },
            story: song.story,
            title: song.title,
            created_at: song.created_at,
          };
        }
      );
      return dataList;
    })
    .catch((e: string) => {
      throw new Error(e);
    });
};

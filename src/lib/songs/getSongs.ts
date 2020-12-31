import { Song } from '../../lib/types';
import { fetchSongs } from './fetchSongs';

export const getSongs = async (albumId: string): Promise<Song[] | []> => {
  const dataList = await fetchSongs(albumId).catch((e) => {
    throw new Error(e);
  });
  const songList: Song[] = dataList.map(
    (song: firebase.firestore.DocumentData) => {
      return {
        created_at: song.created_at,
        id: song.id,
        lyric: song.lyric,
        songFile: {
          filename: song.songFile.filename,
          path: song.songFile.path,
        },
        story: song.story,
        title: song.title,
      };
    }
  );
  return songList;
};

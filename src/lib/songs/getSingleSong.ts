import { Song } from '../types';
import { getSongs } from './getSongs';

export const getSingleSong = async (
  albumId: string,
  songId: string
): Promise<Song> => {
  const songs: Song[] | [] = await getSongs(albumId);
  if (!songs.length) {
    throw new Error('idが一致しません。');
  }
  const song = songs.find((song) => song.id === songId);
  if (!song) {
    throw new Error('idが一致しません。');
  }
  return song;
};

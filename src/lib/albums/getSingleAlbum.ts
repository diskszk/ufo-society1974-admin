import { getAlbums } from './getAlbums';
import { Album } from '../types';

export const getSingleAlbum = async (id: string): Promise<Album | void> => {
  const albums: Album[] | [] = await getAlbums();
  if (!albums.length) {
    return;
  }
  const album = albums.find((album) => album.id === id);
  if (!album) {
    throw new Error('idが一致しません。');
  }
  return album;
};

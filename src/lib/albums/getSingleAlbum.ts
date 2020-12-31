import { getAlbums } from './getAlbums';
import { Album } from '../types';

export const getSingleAlbum = async (albumId: string): Promise<Album> => {
  const albums: Album[] = await getAlbums();
  if (!albums.length) {
    throw new Error('アルバムが存在しません。');
  }
  const album = albums.find((album) => album.id === albumId);
  if (!album) {
    throw new Error('アルバムのidが一致しません。');
  }
  return album;
};

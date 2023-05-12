import { getAlbums } from "./getAlbums";
import { Album } from "../types";

export const getSingleAlbum = async (
  albumId: string
): Promise<Album | void> => {
  const albums: Album[] = await getAlbums();

  if (!albums.length) {
    return;
  }
  const album = albums.find((album) => album.id === albumId);

  if (!album) {
    return;
  }
  return album;
};

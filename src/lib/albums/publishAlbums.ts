import { db } from "../../firebase";
import { Album, Song } from "../../lib/types";
import { getSongs } from "../songs";
import { getAlbums } from "./getAlbums";

export const publishedAlbumsRef = db.collection("published_albums");

export const publishAlbums = async (): Promise<void> => {
  const unpublishedAlbumList = await getAlbums();

  if (!unpublishedAlbumList.length) {
    return;
  }

  unpublishedAlbumList.map(async (unpublishedAlbum: Album) => {
    const unpublishedAlbumId = unpublishedAlbum.id;

    await publishedAlbumsRef.add(unpublishedAlbum).then(async (doc) => {
      const publishedAlbumId = doc.id;
      const unpublishedSongs = await getSongs(unpublishedAlbumId);

      unpublishedSongs.map(async (unpublishedSong: Song) => {
        await publishedAlbumsRef
          .doc(publishedAlbumId)
          .collection("songs")
          .add(unpublishedSong);
      });
    });
  });
};

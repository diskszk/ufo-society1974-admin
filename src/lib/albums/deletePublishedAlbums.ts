import { publishedAlbumsRef } from "./publishAlbums";

export const deletePublishedAlbums = async (): Promise<void> => {
  const publishedAlbums = await publishedAlbumsRef.get();

  publishedAlbums.docs.map(async (doc) => {
    const albumId = doc.id;

    const songRef = publishedAlbumsRef.doc(albumId).collection("songs");
    const publishedSongs = await songRef.get();

    publishedSongs.docs.map(async (song) => {
      const songId = song.id;

      // published_albums / songを全削除
      await songRef.doc(songId).delete();
    });
    // published_albums / albumsを削除
    await publishedAlbumsRef.doc(albumId).delete();
  });
};

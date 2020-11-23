import { db } from '../../firebase';
import { Album, Song } from '../../lib/types';
import { getSongs } from '../songs';
import { fetchAlbums } from './fetchAlbums';
import { getAlbums } from './getAlbums';

const publishedAlbumsRef = db.collection('published_albums');
const albumsRef = db.collection('albums');

export const publishAlbums = async () => {
  // DB初期化
  const publishedAlbums = await publishedAlbumsRef.get();
  publishedAlbums.docs.map(async (doc) => {
    const albumId = doc.id;
    console.log(`album id ${albumId}`);

    // sub collectioを削除
    const songRef = publishedAlbumsRef.doc(albumId).collection('songs');
    const publishedSongs = await songRef.get();

    publishedSongs.docs.map(async (song) => {
      const songId = song.id;

      await songRef
        .doc(songId)
        .delete()
        .catch((e) => {
          throw new Error(e);
        });
    });

    // collection('published_albums').doc(id)を削除
    await publishedAlbumsRef
      .doc(albumId)
      .delete()
      .catch((e) => {
        throw new Error(e);
      });
  });

  const unpublishedAlbumList = await getAlbums();
  if (unpublishedAlbumList.length) {
    unpublishedAlbumList.map(async (unpublishedAlbum: Album) => {
      const unpublishedAlbumId = unpublishedAlbum.id;
      await publishedAlbumsRef
        .add(unpublishedAlbum)
        .then(async (doc) => {
          const publishedAlbumId = doc.id;
          const unpublishedSongs = await getSongs(unpublishedAlbumId);
          unpublishedSongs.map(async (unpublishedSong: Song) => {
            await publishedAlbumsRef
              .doc(publishedAlbumId)
              .collection('songs')
              .add(unpublishedSong);
          });
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
  } else {
    return;
  }
};

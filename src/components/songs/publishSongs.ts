import { db, FirebaseTimestamp } from '../../firebase'
import { fetchSongs } from './fetchSongs';
import { Song } from './types';

const publishedSongsRef = db.collection('songs');

export const publishSongs = async () => {
  const timestamp = FirebaseTimestamp.now();

  // DB初期化
  const publshSongList = await publishedSongsRef.get()
  publshSongList.forEach((doc) => {
    publishedSongsRef.doc(doc.id).delete()
      .catch(e => {
        throw new Error(e);
      })
  })

  // Song型にパース
  const unpublishedSongList = await fetchSongs();
  const songList: Song[] = unpublishedSongList.map((doc) => {

    return {
      id: doc.id,
      title: doc.title,
      titleKana: doc.titleKana,
      story: doc.story,
      lyric: doc.lyric,
      created_at: timestamp
    }
  })

  // 追加
  songList.forEach((song: Song) => {
    const id = song.id.toString()
    publishedSongsRef.doc(id).set(song, { merge: false })
      .catch(e => {
        throw new Error(e);
      })
  });
}
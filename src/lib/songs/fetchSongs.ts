import { db } from '../../firebase';

const unpublishedSongsRef = db.collection('unpublished_songs');

export const fetchSongs = async () => {
  const res = await unpublishedSongsRef.orderBy('id').get();

  if (res.empty) return [];
  const songList: firebase.firestore.DocumentData[] = [];

  res.forEach((doc) => {
    songList.push(doc.data());
  });

  return songList;
};

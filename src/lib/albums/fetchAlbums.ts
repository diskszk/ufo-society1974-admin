import { db } from '../../firebase';

export const fetchAlbums = async (): Promise<
  firebase.firestore.DocumentData[]
> => {
  const snapshots = await db
    .collection('albums')
    .orderBy('published_date')
    .get();

  const dataList = snapshots.docs.map((doc) => {
    return doc.data();
  });

  return dataList;
};

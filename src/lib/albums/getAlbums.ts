import { db } from '../../firebase';
import { Album } from '../types';

const fetchAlbums = async () => {
  const snapshots = await db.collection('albums').orderBy('publish_date').get();

  const dataList = snapshots.docs.map((doc => {
    return doc.data();
  }))

  return dataList;
}

export const getAlbums = async () => {
  return await fetchAlbums()
    .then((dataList) => {
      const albumList: Album[] = dataList.map((data: firebase.firestore.DocumentData) => {
        console.log({ ...data });

        return {
          discription: data.discription,
          imageFile: { ...data.imageFile },
          id: data.id,
          publish_date: data.publish_date,
          title: data.title
        }
      });
      return albumList;
    }).catch((e) => {
      alert(e)
      return []
    })
}
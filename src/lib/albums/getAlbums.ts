import { Album } from '../types';
import { fetchAlbums } from './fetchAlbums';

export const getAlbums = async (): Promise<Album[]> => {
  return await fetchAlbums()
    .then((dataList) => {
      const albumList: Album[] = dataList.map(
        (data: firebase.firestore.DocumentData) => {
          return {
            discription: data.discription,
            imageFile: { ...data.imageFile },
            id: data.id,
            publish_date: data.publish_date,
            title: data.title,
            services: data.services,
          };
        }
      );
      return albumList;
    })
    .catch((e) => {
      throw new Error(e);
    });
};

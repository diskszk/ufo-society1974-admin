import { Album } from '../types';
import { fetchAlbums } from './fetchAlbums';

export const getAlbums = async (): Promise<Album[]> => {
  const dataList = await fetchAlbums();

  const albumList: Album[] = dataList.map(
    (data: firebase.firestore.DocumentData) => {
      return {
        // description: data.description,
        description: data.discription,
        imageFile: data.imageFile,
        id: data.id,
        publishedDate: data.publish_date,
        // publishedDate: data.publishedDate,
        title: data.title,
        publishPlatform: data.services,
      };
    }
  );

  return albumList;
};

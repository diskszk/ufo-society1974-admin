import { Album } from "../types";
import { fetchAlbums } from "./fetchAlbums";

export const getAlbums = async (): Promise<Album[]> => {
  const dataList = await fetchAlbums();

  const albumList: Album[] = dataList.map(
    (data: firebase.firestore.DocumentData) => {
      return {
        description: data.description,
        imageFile: data.imageFile,
        id: data.id,
        publishedDate: data.publishedDate,
        title: data.title,
        publishPlatform: data.publishPlatform,
      };
    }
  );

  return albumList;
};

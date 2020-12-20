import { db, FirebaseTimestamp } from '../../firebase';
import { File, Services } from '../types';
import { generateRandomStrings } from '../generateRandomStrings';
import {
  displayMessage,
  failedFetchAction,
  requestFetchAction,
  successFetchAction,
} from '../../store/LoadingStatusReducer';

const albumsRef = db.collection('albums');

export const saveAlbum = async (
  title: string,
  imageFile: File,
  discription: string,
  services: Services,
  publish_date: string,
  albumId: string
) => {
  const timestamp = FirebaseTimestamp.now();
  const id = albumId !== '' ? albumId : generateRandomStrings();

  const data = {
    created_at: timestamp,
    discription: discription,
    id: id,
    imageFile: {
      filename: imageFile.filename,
      path: imageFile.path,
    },
    publish_date: publish_date,
    title: title,
    services: services,
  };

  await albumsRef.doc(id).set(data, { merge: true });
};

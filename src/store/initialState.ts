import { RootStore } from '../lib/types';
import { noImage } from '../constans';

export const initialState: RootStore = {
  user: {
    isSignedIn: false,
    uid: "",
    username: "",
    role: ""
  },
  image: {
    filename: "",
    path: noImage,
  },
  album: {
    discription: "",
    imageFile: {
      filename: "",
      path: noImage,
    },
    id: "",
    publish_date: "",
    // songs?: 
    title: "",
  }
};
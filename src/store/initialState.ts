import { RootStore } from '../lib/types';
import { NO_IMAGE } from '../constans';

export const initialState: RootStore = {
  user: {
    isSignedIn: false,
    uid: '',
    username: '',
    role: '',
  },
  image: {
    filename: '',
    path: NO_IMAGE,
  },
  album: {
    discription: '',
    imageFile: {
      filename: '',
      path: NO_IMAGE,
    },
    id: '',
    publish_date: '',
    // songs?:
    title: '',
    services: {
      AppleMusic: '',
      Spotify: '',
      iTunes: '',
      Bandcamp: '',
    },
  },
  songs: [
    {
      id: '',
      lyric: '',
      songFile: {
        filename: '',
        path: '',
      },
      story: '',
      title: '',
    },
  ],
  song: {
    id: '',
    lyric: '',
    songFile: {
      filename: '',
      path: '',
    },
    story: '',
    title: '',
  },
};

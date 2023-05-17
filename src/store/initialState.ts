import { RootStore } from "../lib/types";
import { NO_IMAGE } from "../constants";

export const initialState: RootStore = {
  user: {
    isSignedIn: false,
    uid: "",
    username: "",
    role: "",
  },
  image: {
    filename: "",
    path: NO_IMAGE,
  },
  album: {
    description: "",
    imageFile: {
      filename: "",
      path: NO_IMAGE,
    },
    id: "",
    publishedDate: "",
    title: "",
    publishPlatform: {
      AppleMusic: "",
      Spotify: "",
      iTunes: "",
      Bandcamp: "",
    },
  },
  songFile: {
    filename: "",
    path: "",
  },
  songs: [
    {
      id: "",
      lyric: "",
      songFile: {
        filename: "",
        path: "",
      },
      story: "",
      title: "",
      wordsRights: "amane toda",
      musicRights: "amane toda",
    },
  ],

  loadingStatus: {
    isLoading: false,
    message: null,
  },
  audio: {
    src: "",
    isPaused: true,
  },
};

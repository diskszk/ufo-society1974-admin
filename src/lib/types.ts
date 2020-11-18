// redux
export type RootStore = {
  user: User;
  image: File;
  album: Album;
};

export type User = {
  isSignedIn: boolean;
  uid: string;
  username: string;
  role: string;
};

export type File = {
  filename: string;
  path: string;
};

export type Album = {
  discription: string;
  imageFile: File;
  id: string; // random
  publish_date: string; // YYYY-MM-DD
  songs?: Song[];
  title: string;
  services: Services;
};

export type Song = {
  id: string;
  lyric: string;
  songFile: File;
  story: string;
  title: string;
  created_at?: firebase.firestore.Timestamp;
};

export type Services = {
  AppleMusic: string;
  Spotify: string;
  iTunes: string;
  Bandcamp: string;
};

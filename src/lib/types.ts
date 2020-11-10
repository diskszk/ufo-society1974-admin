// redux
export type RootStore = {
  user: User;
}

export type User = {
  isSignedIn: boolean;
  uid: string;
  username: string;
  role: string;
}

export type Image = {
  filename: string;
  path: string;
}

export type Album = {
  discription: string;
  id: string;             // random
  image: Image;
  publish_date: string;   // YYYY-MM-DD
  songs: Song[];
  title: string;
}

export type SongFile = {
  filename: string;
  path: string;
}

export type Song = {
  id: number;
  title: string;
  story: string;
  lyric: string;
  created_at: firebase.firestore.Timestamp;
  songFile: SongFile;
}

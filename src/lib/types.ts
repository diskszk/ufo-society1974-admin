// redux
export type RootStore = {
  user: User;
  image: File,
}

export type User = {
  isSignedIn: boolean;
  uid: string;
  username: string;
  role: string;
}
export type File = {
  filename: string;
  path: string;
}
export type Image = {
  filename: string;
  path: string;
}

export type Album = {
  discription: string;
  file: File;
  id: string;             // random
  publish_date: string;   // YYYY-MM-DD
  songs: Song[];
  title: string;
}

export type Song = {
  file: File;
  id: number;
  title: string;
  story: string;
  lyric: string;
  created_at: firebase.firestore.Timestamp;
}

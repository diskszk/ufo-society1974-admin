// redux
export type RootStore = {
  user: User;
  image: File;
  album: Album;
  songFile: File;
  songs: Song[];

  loadingStatus: LoadingStatus;
  audio: Audio;
};

export type LoadingStatus = {
  isLoading: boolean;
  message: string | null;
};

export type MessageModalState = {
  isOpen: boolean;
  message: string;
};

export type User = {
  isSignedIn?: boolean;
  uid: string;
  username: string;
  role: string;
  createdAt?: firebase.firestore.Timestamp;
  email?: string;
  updatedAt?: firebase.firestore.Timestamp;
  isDeleted?: boolean;
};

export type File = {
  filename: string;
  path: string;
};

export type Album = {
  description?: string;
  imageFile: File;
  id: string;
  publishedDate: string;
  songs?: Song[];
  title: string;
  publishPlatform?: PublishPlatform;
  createdAt?: firebase.firestore.Timestamp;
};

export type Song = {
  id: string;
  lyric: string;
  songFile: File;
  story: string;
  title: string;
  wordsRights: string;
  musicRights: string;
  createdAt?: firebase.firestore.Timestamp;
};

export type PublishPlatform = {
  AppleMusic: string;
  Spotify: string;
  iTunes: string;
  Bandcamp: string;
};

export type Audio = {
  src: string;
  isPaused: boolean;
};

export type SelectOption = { label: string; value: string };
export type SelectOptions = SelectOption[];

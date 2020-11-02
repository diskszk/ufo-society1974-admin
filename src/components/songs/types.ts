export type Song = {
  id: number;
  title: string;
  music: Music;
  story: string;
  lyric: string;
  created_at: firebase.firestore.Timestamp;

  // thumbnail: string;
  // music: string;
  // musicRights: string;
  // lyricsRights: string;
}


export type Music = {
  filename: string;
  path: string;
}
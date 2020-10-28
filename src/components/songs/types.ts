export type Song = {
  id: number;
  title: string;
  titleKana: string;
  story: string;
  lyric: string;
  created_at: firebase.firestore.Timestamp;
}
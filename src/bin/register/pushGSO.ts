/* eslint-disable no-console */
import { GSOdatas } from "./GSOdata";
import { saveSong } from "../../lib/songs";
import { Song } from "../../lib/types";

export const pushGSO = async (): Promise<void> => {
  if (GSOdatas.length !== 30) {
    alert("there are not 30 songs");
    return;
  }

  if (!window.confirm("GSOを追加")) {
    return;
  }
  const ALBUM_ID = "";

  if (!ALBUM_ID) {
    alert("idがからです");
  }

  GSOdatas.map(async (song: Song) => {
    try {
      await saveSong(song, ALBUM_ID);
      console.log(`${song.title} : succeed!`);
    } catch (e) {
      console.log(`Error! stopped at ${song.title}`);
      console.error(e);
      return;
    }
  });
};

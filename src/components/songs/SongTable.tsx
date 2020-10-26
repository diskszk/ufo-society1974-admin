import React, { useState, useEffect } from 'react';
import { fetchSongs } from './fetchSongs';
import { Song } from './saveSong';

const SongTable = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchSongs()
      .then((songList) => {
        const datas: Song[] = songList.map((song: firebase.firestore.DocumentData) => {
          return {
            id: song.id,
            title: song.title,
            titleKana: song.titleKana,
            story: song.story,
            lyric: song.lyric,
            created_at: song.created_at
          }
        })
        setSongs(datas);
      }).catch((e: string) => {
        throw new Error(e);
      });
  }, []);

  return (
    <>
      {!songs.length && (<h2>Loading...</h2>)}
      <ul>
        {songs.map((song: Song, key: number) => {
          return (
            <li key={key}>
              <p>{song.id}</p>
              <p>{song.title}</p>
              <p>{song.lyric}</p>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default SongTable;
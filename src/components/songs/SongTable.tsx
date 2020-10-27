import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SongElement from './SongElement';
import { fetchSongs } from './fetchSongs';
import { Song } from './saveSong';
import { deleteSong } from './deleteSong';
import { RootStore } from '../../reducks/store/initialState';
import { User } from '../../reducks/users/types';

const SongTable = () => {

  const currentUser = useSelector<RootStore, User>(state => state.users);
  const currentRole = currentUser.role;

  const [songs, setSongs] = useState<Song[]>([]);
  const [amount, setAmount] = useState(0);

  const clickDelete = useCallback((id: number, titleKana: string) => {

    // editer only
    if (currentRole !== "master") {
      alert("編集者のみ曲を削除できます。");
      return false;
    }
    
    const deleteId = id.toString();
    if (window.confirm(`${titleKana}を削除しますか？`)) {
      deleteSong(deleteId);

      fetchSongs()
        .then((songList) => {

          setAmount(songList.length);
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
    } else {
      return
    }
  }, [setSongs])

  useEffect(() => {
    fetchSongs()
      .then((songList) => {
        console.log(songList.length);

        setAmount(songList.length);
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
  }, [setSongs]);

  return (
    <div className="song-table">
      <ul>
        <li className="song-element">
          <p className="id">No.</p>
          <p className="title">Title</p>
          <p className="title-kana">タイトル(カタカナ)</p>
          <p className="story">元ネタ</p>
          <div className="edit"></div>
          <div className="delete"></div>
        </li>
        {songs.map((song: Song, key: number) => {
          return (
            <SongElement
              key={key}
              id={song.id}
              title={song.title}
              titleKana={song.titleKana}
              story={song.story}
              onClick={() => clickDelete(song.id, song.titleKana)}
            />
          )
        })}
      </ul>
      {!(songs.length || (songs.length <= amount)) && (<h2>Loading...</h2>)}
    </div>
  );
}

export default SongTable;
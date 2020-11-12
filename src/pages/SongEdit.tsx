import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { PrimalyButton, TextInput } from '../components/UIKit';
import { getSongs, saveSongs } from '../lib/songs';
import UploadSongForm from '../components/songs/UploadSongForm';
import { File } from '../lib/types';

const SongEdit = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState(""),
    [title, setTitle] = useState(""),
    [story, setStory] = useState("無し"),
    [lyric, setLyric] = useState(""),
    [wordsRights, setWordsRights] = useState("amane toda"),
    [musicRights, setMusicRights] = useState("amane toda");

  const [isUploaded, setIsUploaded] = useState(false),
    [loading, setLoading] = useState(false);

  const [songFile, setSongFile] = useState<File>({
    filename: "",
    path: ""
  });

  let idx = window.location.pathname.split('/songs/edit')[1];
  if (idx !== "") {
    idx = idx.split('/')[1];
  }

  const inputId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, [setId]);
  const inputTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [setTitle]);
  const inputStory = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStory(e.target.value);
  }, [setStory]);
  const inputLyric = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLyric(e.target.value);
  }, [setLyric]);
  const inputWordsRights = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLyric(e.target.value);
  }, [setWordsRights]);
  const inputMusicRights = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMusicRights(e.target.value);
  }, [setMusicRights]);

  const clickSave = () => {
    if (id == "") {
      alert("IDを入力してください");
      return false;
    }

    dispatch(saveSongs(id, title, songFile, story, lyric))
  }

  useEffect(() => {
    if (idx === "") {
      // New
      getSongs()
        .then((songList) => {
          const latestId = (songList.length + 1).toString();
          setId(latestId);
        })
    } else {
      // Edit
      db.collection("unpublished_songs").doc(idx).get()
        .then((snapshot) => {
          const data = snapshot.data();
          if (!data) return false;

          setId(data.id);
          setTitle(data.title);
          setStory(data.story);
          setLyric(data.lyric);
          // setMusic({
          //   filename: data.music.filename,
          //   path: data.music.path
          // })
        })
    }
  }, [setId, setLoading, setSongFile]);

  return (
    <section>
      <h1>曲を追加・編集</h1>
      {loading ? (
        <h2 className="Uploading">Loading...</h2>
      ) : (
          <div className="inputs-container">

            <TextInput
              fullWidth={false} label={"トラックID(表示する順番)"}
              multiline={false} required={true} rows={1}
              value={id} type={"number"} onChange={inputId}
            />
            <p>デフォルトのIDで一番下に表示されます。</p>

            <TextInput
              fullWidth={false} label={"タイトル"}
              multiline={false} required={false} rows={1}
              value={title} type={"text"} onChange={inputTitle}
            />
            <UploadSongForm
              id={id.toString()}
              songFile={songFile}
              setSongFile={setSongFile}
              setLoading={setLoading}
              isUploaded={isUploaded}
              setIsUploaded={setIsUploaded}
            />
            {songFile.filename && (
              <div className="music=player">
                <audio
                  controls
                  // controlsList="nodownload"
                  src={songFile.path}
                />
              </div>
            )}

            <div className="input-author">
              <TextInput
                fullWidth={false} label={"作詞者"}
                multiline={false} required={false} rows={1}
                value={wordsRights} type={"text"} onChange={inputWordsRights}
              />
              <TextInput
                fullWidth={false} label={"作曲者"}
                multiline={false} required={false} rows={1}
                value={musicRights} type={"text"} onChange={inputMusicRights}
              />
            </div>
            <TextInput
              fullWidth={false} label={"元ネタ"}
              multiline={false} required={false} rows={1}
              value={story} type={"text"} onChange={inputStory}
            />
            <TextInput
              fullWidth={false} label={"歌詞"}
              multiline={true} required={false} rows={16}
              value={lyric} type={"text"} onChange={inputLyric}
            />

            <div className="button-container-row">
              <PrimalyButton
                label="もどる"
                onClick={() => dispatch(push("/songs"))}
              />
              <PrimalyButton
                label="保存する"
                onClick={() => clickSave()}
              />
            </div>
          </div>
        )}
    </section>
  );
}

export default SongEdit;
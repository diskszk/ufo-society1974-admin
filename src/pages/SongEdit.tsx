import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { PrimalyButton, TextInput } from '../components/UIKit';
import ConfirmLyricModal from '../components/songs/ConfirmLyricModal';
import { saveSong } from '../components/songs/saveSong';
import { fetchSongs } from '../components/songs/fetchSongs';
import { db } from '../firebase';

const SongEdit = () => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const closeModal = useCallback(() => {
    setModal(false);
  }, [setModal]);

  const [id, setId] = useState(""),
    [title, setTitle] = useState(""),
    [titleKana, setTitleKana] = useState(""),
    [story, setStory] = useState("無し"),
    [lyric, setLyric] = useState("");

  let idx = window.location.pathname.split('/songs/edit')[1];
  if (idx !== "") {
    idx = idx.split('/')[1];
  }

  const inputId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  }, [setId])
  const inputTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [setTitle])
  const InputTitleKana = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleKana(e.target.value);
  }, [setTitleKana])
  const inputStory = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStory(e.target.value);
    console.log(story);

  }, [setStory])
  const inputLyric = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLyric(e.target.value);
  }, [setLyric]);

  useEffect(() => {
    fetchSongs()
      .then((songList) => {
        const latestId = (songList.length + 1).toString();
        setId(latestId);
      })
  }, [setId]);

  useEffect(() => {
    if (idx !== "") {
      console.log("idx:", idx);

      db.collection("songs").doc(idx).get()
        .then((snapshot) => {
          const data = snapshot.data();
          console.log(data);

          if (!data) return false;

          setId(data.id);
          setTitle(data.title);
          setTitleKana(data.titleKana);
          setStory(data.story);
          setLyric(data.lyric);
        })
    }
  }, []);

  return (
    <section>
      <h1>曲を追加</h1>
      {modal && (
        <ConfirmLyricModal onClick={closeModal} />
      )}
      <div className="inputs-container">
        <TextInput
          fullWidth={false} label={"トラックID(表示する順番)"}
          multiline={false} required={true} rows={1}
          value={id} type={"number"} onChange={inputId}
        />
        <p>デフォルトのIDで一番下に表示されます。</p>
        <TextInput
          fullWidth={false} label={"タイトル(ローマ字)"}
          multiline={false} required={true} rows={1}
          value={title} type={"text"} onChange={inputTitle}
        />
        <TextInput
          fullWidth={false} label={"タイトル(カタカナ)"}
          multiline={false} required={true} rows={1}
          value={titleKana} type={"text"} onChange={InputTitleKana}
        />
        <TextInput
          fullWidth={false} label={"元ネタ"}
          multiline={true} required={true} rows={1}
          value={story} type={"text"} onChange={inputStory}
        />
        <p></p>
        <TextInput
          fullWidth={false} label={"歌詞"}
          multiline={true} required={false} rows={16}
          value={lyric} type={"text"} onChange={inputLyric}
        />

        <div className="button-container-row">
          <PrimalyButton
            label="確認する"
            onClick={() => {
              console.log(story);
            }}
          />
          <PrimalyButton
            label="追加する"
            onClick={() => dispatch(saveSong(id, title, titleKana, story, lyric))}
          />
          <PrimalyButton
            label="もどる"
            onClick={() => dispatch(push("/songs"))}
          />
        </div>
      </div>
    </section>
  );
}

export default SongEdit;
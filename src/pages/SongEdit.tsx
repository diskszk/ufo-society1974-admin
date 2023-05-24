import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, TextInput } from "../components/UIKit";
import { getSingleSong, getSongs, saveSong } from "../lib/songs";
import { SongUploadForm } from "../components/songs/";
import { File, Song, RootStore, User } from "../lib/types";
import {
  createUpdateSongFileAction,
  clearSongFileAction,
} from "../store/SongFileReducer";
import {
  createDisplayMessage,
  createFailedFetchAction,
  createRequestFetchAction,
  crateSuccessFetchAction,
} from "../store/LoadingStatusReducer";
import { ROLE } from "../constants";
import { checkRole } from "../lib/helpers";

const SongEdit: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { albumId, songId } = useParams<{ songId: string; albumId: string }>();

  const { role } = useSelector<RootStore, User>((state) => state.user);

  const songFile = useSelector<RootStore, File>((state) => state.songFile);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("無し");
  const [lyric, setLyric] = useState("");
  const [wordsRights, setWordsRights] = useState("amane toda");
  const [musicRights, setMusicRights] = useState("amane toda");

  const [disabled, setDisabled] = useState(true);

  const inputId = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setId(ev.target.value);
    },
    [setId]
  );
  const inputTitle = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(ev.target.value);
    },
    [setTitle]
  );
  const inputStory = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setStory(ev.target.value);
    },
    [setStory]
  );
  const inputLyric = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setLyric(ev.target.value);
    },
    [setLyric]
  );
  const inputWordsRights = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setWordsRights(ev.target.value);
    },
    [setWordsRights]
  );
  const inputMusicRights = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setMusicRights(ev.target.value);
    },
    [setMusicRights]
  );

  const handleClickSaveButton = useCallback(
    async (
      _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      // 権限チェック
      const isAllowed = checkRole(ROLE.EDITOR, role);

      if (!isAllowed) {
        dispatch(
          createDisplayMessage("アカウントにアクセス権限がありません。")
        );
        return;
      }
      // validations

      if (id === "") {
        dispatch(createDisplayMessage("IDを入力してください。"));
        return;
      }
      if (title === "") {
        dispatch(createDisplayMessage("タイトルを入力してください。"));
        return;
      }

      const leftJustifiedId = ("0000" + id).slice(-4);

      const newSong: Song = {
        id: leftJustifiedId,
        title: title,
        songFile: songFile,
        story: story,
        lyric: lyric,
        wordsRights: wordsRights,
        musicRights: musicRights,
      };

      try {
        dispatch(createRequestFetchAction());
        await saveSong(newSong, albumId);
        history.push(`/albums/detail/${albumId}`);
        dispatch(crateSuccessFetchAction());
      } catch {
        dispatch(createFailedFetchAction("曲の保存に失敗しました。"));
      }
    },
    [
      dispatch,
      history,
      albumId,
      id,
      title,
      story,
      lyric,
      wordsRights,
      musicRights,
      role,
      songFile,
    ]
  );

  useEffect(() => {
    // New
    const createSongSetUp = async () => {
      try {
        const songList = await getSongs(albumId);
        const latestId = (songList.length + 1).toString();

        setId(latestId);

        dispatch(clearSongFileAction());
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
      }
    };
    // Edit
    const editSongSetUp = async () => {
      try {
        dispatch(createRequestFetchAction());
        const song = await getSingleSong(albumId, songId);

        if (!song) {
          dispatch(createFailedFetchAction("曲が存在しません。"));
          history.push(`/albums/detail/${albumId}`);
          return;
        } else {
          setId(parseInt(song.id, 10).toString());
          setTitle(song.title);
          setStory(song.story);
          setLyric(song.lyric);
          setWordsRights(song.wordsRights);
          setMusicRights(song.musicRights);

          dispatch(createUpdateSongFileAction(song.songFile));
          dispatch(crateSuccessFetchAction());
        }
      } catch (e) {
        // dispatch(createFailedFetchAction(e.message));
        dispatch(createFailedFetchAction("error message"));
        history.push(`/albums/detail/${albumId}`);
      }
    };

    if (songId === "new") {
      // New
      createSongSetUp();
    } else {
      // Edit
      editSongSetUp();
    }
  }, [dispatch, history, albumId, songId]);

  // 保存ボタンの活性・非活性
  useEffect(() => {
    if (role === ROLE.EDITOR) {
      if (
        id !== "" &&
        title !== "" &&
        wordsRights !== "" &&
        musicRights !== "" &&
        story !== ""
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [
    dispatch,
    history,
    albumId,
    id,
    title,
    wordsRights,
    musicRights,
    story,
    role,
  ]);

  // 保存ボタンの活性・非活性
  useEffect(() => {
    if (role === ROLE.EDITOR) {
      if (
        id !== "" &&
        title !== "" &&
        wordsRights !== "" &&
        musicRights !== "" &&
        story !== ""
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [
    dispatch,
    history,
    albumId,
    id,
    title,
    wordsRights,
    musicRights,
    story,
    role,
  ]);

  return (
    <section>
      <h1>曲を追加・編集</h1>

      <div className="inputs-container">
        <TextInput
          fullWidth={false}
          label={"トラックID(表示する順番)"}
          multiline={false}
          required={true}
          rows={1}
          value={id}
          type={"number"}
          onChange={inputId}
        />
        <p className="inputs-container-description">
          デフォルトのIDで一番下に表示されます。
        </p>

        <TextInput
          fullWidth={false}
          label={"タイトル"}
          multiline={false}
          required={false}
          rows={1}
          value={title}
          type={"text"}
          onChange={inputTitle}
        />
        <SongUploadForm albumId={albumId} songId={id} />
        {songFile.filename && (
          <div className="music=player">
            <audio controls controlsList="nodownload" src={songFile.path} />
          </div>
        )}

        <div className="input-author">
          <TextInput
            fullWidth={false}
            label={"作詞者"}
            multiline={false}
            required={false}
            rows={1}
            value={wordsRights}
            type={"text"}
            onChange={inputWordsRights}
          />
          <TextInput
            fullWidth={false}
            label={"作曲者"}
            multiline={false}
            required={false}
            rows={1}
            value={musicRights}
            type={"text"}
            onChange={inputMusicRights}
          />
        </div>
        <TextInput
          fullWidth={false}
          label={"元ネタ"}
          multiline={false}
          required={false}
          rows={1}
          value={story}
          type={"text"}
          onChange={inputStory}
        />
        <TextInput
          fullWidth={false}
          label={"歌詞"}
          multiline={true}
          required={false}
          rows={16}
          value={lyric}
          type={"text"}
          onChange={inputLyric}
        />

        <div className="button-container-row">
          <CustomButton
            label="もどる"
            onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              history.push(`/albums/detail/${albumId}`)
            }
          />
          <CustomButton
            label="保存する"
            disable={disabled}
            onClick={handleClickSaveButton}
          />
        </div>
      </div>
    </section>
  );
};

export default SongEdit;

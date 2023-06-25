import React, { useCallback, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { CustomButton, TextInput } from "../components/UIKit";
import { ImageUploadForm } from "../components/albumEdit";
import { RootStore, File, User, PublishPlatform } from "../lib/types";
import { saveAlbum, deleteAlbum } from "../lib/albums";
import { ROLE } from "../constants";
import { getSingleAlbum } from "../lib/albums/getSingleAlbum";
import {
  createUpdateImageAction,
  createClearImageAction,
} from "../store/ImageReducer";
import {
  createDisplayMessage,
  createFailedFetchAction,
  createRequestFetchAction,
  crateSuccessFetchAction,
} from "../store/LoadingStatusReducer";
import { checkRole, validatePublishedDate } from "../lib/helpers";

// URLからアルバムのIDを取得する
// IDが"new"の場合は新規作成となる
const AlbumEdit: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const imageFile = useSelector<RootStore, File>((state) => state.image);

  const [description, setDescription] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [title, setTitle] = useState("");
  const [appleMusicURL, setAppleMusicURL] = useState("");
  const [spotifyURL, setSpotifyURL] = useState("");
  const [iTunesURL, setITunesURL] = useState("");
  const [bandcampURL, setBandcampURL] = useState("");

  const [disable, setDisable] = useState(true);
  const deleteIconDisabled: boolean = role !== ROLE.EDITOR;

  const inputDescription = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(ev.target.value);
    },
    [setDescription]
  );
  const inputPublishedDate = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setPublishedDate(ev.target.value);
    },
    [setPublishedDate]
  );
  const inputTitle = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(ev.target.value);
    },
    [setTitle]
  );
  const inputAppleMusicURL = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setAppleMusicURL(ev.target.value);
    },
    [setAppleMusicURL]
  );
  const inputSpotifyURL = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSpotifyURL(ev.target.value);
    },
    [setSpotifyURL]
  );
  const inputITunesURL = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setITunesURL(ev.target.value);
    },
    [setITunesURL]
  );
  const inputBandcampURL = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setBandcampURL(ev.target.value);
    },
    [setBandcampURL]
  );

  const handleSave = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Validation
      const validatedPublishedDateResult = validatePublishedDate(publishedDate);

      if (!title || !publishedDate) {
        dispatch(createDisplayMessage("必須項目が未入力です。"));
        return;
      }
      if (!validatedPublishedDateResult) {
        dispatch(
          createDisplayMessage(
            '公開日は\n"YYYY-MM-DD"\nの形式で入力してください。'
          )
        );
        return;
      }
      const publishedPlatform: PublishPlatform = {
        AppleMusic: appleMusicURL,
        Spotify: spotifyURL,
        iTunes: iTunesURL,
        Bandcamp: bandcampURL,
      };

      try {
        dispatch(createRequestFetchAction());
        saveAlbum(
          title,
          imageFile,
          description,
          publishedPlatform,
          publishedDate,
          id
        );
        dispatch(createDisplayMessage(`アルバムを保存しました。`));
        dispatch(crateSuccessFetchAction());
        history.push("/albums");
      } catch {
        dispatch(
          createFailedFetchAction(
            "アルバムの保存に失敗しました。\n通信環境をご確認の上再度お試しください。"
          )
        );
        return;
      }
    },
    [
      publishedDate,
      title,
      appleMusicURL,
      spotifyURL,
      iTunesURL,
      bandcampURL,
      dispatch,
      imageFile,
      description,
      id,
      history,
    ]
  );

  // WANT: 確認モーダルも自作したい
  const handleBack = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      if (window.confirm("編集を破棄します。")) {
        history.push("/albums");
      } else {
        return;
      }
    },
    [history]
  );

  const handleDelete = useCallback(
    async (
      _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      const allowed = checkRole(ROLE.EDITOR, role);

      if (!allowed) {
        dispatch(createDisplayMessage("削除権限がありません。"));
        return;
      }
      if (!window.confirm("アルバムを削除しますか？")) {
        return;
      }
      try {
        dispatch(createRequestFetchAction());
        await deleteAlbum(id);
        dispatch(crateSuccessFetchAction());
        history.push("/albums");
      } catch {
        dispatch(
          createFailedFetchAction(
            "アルバムの削除に失敗しました。\n通信環境をご確認の上再度お試しください。"
          )
        );
      }
    },
    [dispatch, history, id, role]
  );

  useEffect(() => {
    if (id === "new") {
      // New
      dispatch(createClearImageAction());
    } else {
      // Edit
      const fetch = async () => {
        dispatch(createRequestFetchAction());

        try {
          const res = await getSingleAlbum(id);

          if (!res) {
            throw new Error("アルバムが存在しません。");
          } else {
            if (
              !res.createdAt ||
              !res.description ||
              !res.publishPlatform ||
              !res.imageFile
            ) {
              return;
            }

            setTitle(res.title);
            setDescription(res.description);
            setPublishedDate(res.publishedDate);
            setAppleMusicURL(res.publishPlatform.AppleMusic);
            setSpotifyURL(res.publishPlatform.Spotify);
            setITunesURL(res.publishPlatform.iTunes);
            setBandcampURL(res.publishPlatform.Bandcamp);

            dispatch(createUpdateImageAction(res.imageFile));
          }
          dispatch(crateSuccessFetchAction());
        } catch (e) {
          // dispatch(createFailedFetchAction(e.message));
          dispatch(createFailedFetchAction("error message"));
          history.push("/albums");
        }
      };

      fetch();
    }
  }, [dispatch, history, id]);

  // title, publishedDateが空だと保存ボタン非活性
  useEffect(() => {
    if (role === ROLE.EDITOR) {
      if (title !== "" && publishedDate !== "") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [role, title, publishedDate]);

  // title, publishedDateが空だと保存ボタン非活性
  useEffect(() => {
    if (role === ROLE.EDITOR) {
      if (title !== "" && publishedDate !== "") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [role, title, publishedDate]);

  return (
    <section className="album-edit">
      <h1>アルバムを追加・編集</h1>
      <div className="inputs-container">
        {id !== "new" && (
          <div className="delete-icon">
            <span>アルバムを削除する</span>
            <IconButton disabled={deleteIconDisabled} onClick={handleDelete}>
              <DeleteOutline />
            </IconButton>
          </div>
        )}
        <TextInput
          fullWidth={false}
          label={"アルバムタイトル"}
          multiline={false}
          required={true}
          rows={1}
          value={title}
          type={"text"}
          onChange={inputTitle}
        />
        <ImageUploadForm image={imageFile} />
        <div className="spacing-div" />

        <div className="album-discription__input">
          <TextInput
            fullWidth={false}
            label={"説明"}
            multiline={true}
            required={false}
            rows={8}
            value={description}
            type={"text"}
            onChange={inputDescription}
          />
        </div>
        <div className="spacing-div" />

        <TextInput
          fullWidth={false}
          label={"Apple Music"}
          multiline={false}
          required={false}
          rows={1}
          value={appleMusicURL}
          type={"text"}
          onChange={inputAppleMusicURL}
        />
        <TextInput
          fullWidth={false}
          label={"Spotify"}
          multiline={false}
          required={false}
          rows={1}
          value={spotifyURL}
          type={"text"}
          onChange={inputSpotifyURL}
        />
        <TextInput
          fullWidth={false}
          label={"iTunes"}
          multiline={false}
          required={false}
          rows={1}
          value={iTunesURL}
          type={"text"}
          onChange={inputITunesURL}
        />
        <TextInput
          fullWidth={false}
          label={"Bandcamp"}
          multiline={false}
          required={false}
          rows={1}
          value={bandcampURL}
          type={"text"}
          onChange={inputBandcampURL}
        />

        <TextInput
          fullWidth={false}
          label={"公開日(YYYY-MM-DD)"}
          multiline={false}
          required={true}
          rows={1}
          value={publishedDate}
          type={"text"}
          onChange={inputPublishedDate}
        />

        <div className="button-container-row">
          <CustomButton label={"もどる"} onClick={handleBack} />
          <CustomButton
            disable={disable}
            label={"保存する"}
            onClick={handleSave}
          />
        </div>
      </div>
    </section>
  );
};

export default AlbumEdit;

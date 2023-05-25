import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { DeleteOutline, Backup } from "@mui/icons-material";
import { File, RootStore, User } from "../../lib/types";
import { generateRandomStrings } from "../../lib/helpers/generateRandomStrings";
import {
  clearSongFileAction,
  createUpdateSongFileAction,
} from "../../store/SongFileReducer";
import { deleteSongFile, uploadSongFile } from "../../lib/songs";
import {
  createDisplayMessage,
  createFailedFetchAction,
  createRequestFetchAction,
  crateSuccessFetchAction,
} from "../../store/LoadingStatusReducer";
import { ROLE } from "../../constants";
import { checkRole } from "../../lib/helpers";

type Props = {
  albumId: string;
  songId: string;
};

export const SongUploadForm: React.FC<Props> = ({ albumId, songId }) => {
  const dispatch = useDispatch();
  const { filename } = useSelector<RootStore, File>((state) => state.songFile);
  const { role } = useSelector<RootStore, User>((state) => state.user);

  const disabled: boolean = ROLE.EDITOR !== role;

  const handleChangeUploadSongButton = async (
    ev: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const isAllowed = checkRole(ROLE.EDITOR, role);

    if (!isAllowed) {
      dispatch(createDisplayMessage("アカウントに権限がありません。"));
      return;
    }

    const fileList = ev.target.files;

    if (!fileList) {
      dispatch(createDisplayMessage("ファイルが選択されていません。"));
      return;
    }

    const file = fileList[0];

    if (!file) {
      return;
    }
    const newFileName = generateRandomStrings();

    try {
      dispatch(createRequestFetchAction());
      const newSongFile = await uploadSongFile(file, newFileName);

      dispatch(createUpdateSongFileAction(newSongFile));
      dispatch(createDisplayMessage("ファイルがアップロードされました。"));

      dispatch(crateSuccessFetchAction());
    } catch {
      dispatch(
        createFailedFetchAction(
          "ファイルのアップロードに失敗しました。\n通信環境をご確認の上再度お試しください。"
        )
      );
    }
  };

  const handleDeleteSongFileButton = useCallback(
    async (
      _ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): Promise<void> => {
      const isAllowed = checkRole(ROLE.EDITOR, role);

      if (!isAllowed) {
        dispatch(createDisplayMessage("アカウントに権限がありません。"));
        return;
      }
      if (filename === "") {
        dispatch(
          createDisplayMessage("ファイルがアップロードされていません。")
        );
        return;
      }
      if (!window.confirm("ファイルを削除しますか？")) {
        return;
      }
      try {
        dispatch(createRequestFetchAction());
        await deleteSongFile(filename, albumId, songId);
        dispatch(clearSongFileAction());
        dispatch(crateSuccessFetchAction());
      } catch {
        dispatch(
          createFailedFetchAction(
            "ファイルの削除に失敗しました。\n通信環境をご確認の上再度お試しください。"
          )
        );
      }
    },
    [dispatch, albumId, filename, songId, role]
  );

  return (
    <div className="song-upload-form">
      <p>曲をアップロード</p>
      {filename === "" ? (
        // add song file
        <IconButton
          sx={{
            height: 48,
            width: 48,
            lineHeight: 48,
            cursor: "pointer",
            "&:disabled": {
              "& > span": {
                color: "rgba(44, 44, 44, 0.4)",
              },
            },
          }}
          disabled={disabled}
        >
          <label htmlFor="upload-music">
            <Backup />
            <input
              type="file"
              className="display-none"
              accept=".mp3"
              id={"upload-music"}
              onChange={(ev) => handleChangeUploadSongButton(ev)}
            />
          </label>
        </IconButton>
      ) : (
        // delete song file
        <IconButton
          sx={{
            height: 48,
            width: 48,
            lineHeight: 48,
            cursor: "pointer",
            "&:disabled": {
              "& > span": {
                color: "rgba(44, 44, 44, 0.4)",
              },
            },
          }}
          disabled={disabled}
          onClick={handleDeleteSongFileButton}
        >
          <DeleteOutline />
        </IconButton>
      )}
    </div>
  );
};

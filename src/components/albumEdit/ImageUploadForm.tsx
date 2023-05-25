import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { imagesRef } from "../../firebase";

import { IconButton } from "@mui/material";
import { AddPhotoAlternate } from "@mui/icons-material";
import { generateRandomStrings } from "../../lib/helpers/generateRandomStrings";
import { deleteAlbumImage } from "../../lib/albums";
import { File, RootStore, User } from "../../lib/types";
import { createUpdateImageAction } from "../../store/ImageReducer";
import {
  createRequestFetchAction,
  createDisplayMessage,
  createFailedFetchAction,
  crateSuccessFetchAction,
} from "../../store/LoadingStatusReducer";
import { ROLE } from "../../constants";
import { checkRole } from "../../lib/helpers";

type Props = {
  image: File;
};
export const ImageUploadForm: React.FC<Props> = ({ image }) => {
  const dispatch = useDispatch();
  const { role } = useSelector<RootStore, User>((state) => state.user);

  const disabled: boolean = role !== ROLE.EDITOR;

  const uploadImage = async (
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

    // すでにローカルステートに登録されている場合はstorageの元の画像を削除
    if (image.filename !== "") {
      try {
        dispatch(createRequestFetchAction());
        await deleteAlbumImage(image.filename);
      } catch (e) {
        dispatch(
          createFailedFetchAction(
            "画像のアップロードに失敗しました。\n通信状態をご確認の上再度お試しください。"
          )
        );
      }
    }
    const filename = generateRandomStrings();
    const uploadRef = imagesRef.child(filename);
    const uploadTask = uploadRef.put(file);

    try {
      const snapshot = await uploadTask;
      const downloadURL: string = await snapshot.ref.getDownloadURL();
      const newImage = {
        filename: filename,
        path: downloadURL,
      };

      dispatch(createUpdateImageAction(newImage));

      dispatch(createDisplayMessage("画像のアップロードが完了しました。"));
      dispatch(crateSuccessFetchAction());
    } catch {
      dispatch(
        createFailedFetchAction(
          "画像のアップロードに失敗しました。\n通信状態をご確認の上再度お試しください。"
        )
      );
    }
  };

  return (
    <div className="album-edit-image">
      <div className="album-edit-image__select">
        <span>画像を変更する</span>
        <IconButton
          disabled={disabled}
          sx={{
            height: 48,
            width: 48,
            "&:disabled": {
              "& > span": {
                color: "rgba(44, 44, 44, 0.4)",
              },
            },
          }}
        >
          <label htmlFor="upload-image">
            <AddPhotoAlternate fontSize={"large"} />
            <input
              className={"display-none"}
              type="file"
              id="upload-image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={uploadImage}
            />
          </label>
        </IconButton>
      </div>
      <img src={image.path} alt={`アルバムのイメージ`} />
    </div>
  );
};

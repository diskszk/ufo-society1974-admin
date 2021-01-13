import React from 'react';
import { imagesRef } from '../../firebase';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { generateRandomStrings } from '../../lib/helpers/generateRandomStrings';
import { deleteAlbumImage } from '../../lib/albums';
import { File } from '../../lib/types';
import { useDispatch } from 'react-redux';
import { createUpdateImageAction } from '../../store/ImageReducer';
import {
  createRequestFetchAction,
  createDisplayMessage,
  createFailedFetchAction,
  crateSuccessFetchAction,
} from '../../store/LoadingStatusReducer';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

type Props = {
  image: File;
};
export const ImageUploadForm: React.FC<Props> = ({ image }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const uploadImage = async (
    ev: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const fileList = ev.target.files;

    if (!fileList) {
      dispatch(createDisplayMessage('ファイルが選択されていません。'));
      return;
    }

    const file = fileList[0];

    if (!file) {
      return;
    }

    // すでにローカルステートに登録されている場合はstorageの元の画像を削除
    if (image.filename !== '') {
      try {
        dispatch(createRequestFetchAction());
        await deleteAlbumImage(image.filename);
      } catch (e) {
        dispatch(
          createFailedFetchAction(
            '画像のアップロードに失敗しました。\n通信状態をご確認の上再度お試しください。'
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

      dispatch(createDisplayMessage('画像のアップロードが完了しました。'));
      dispatch(crateSuccessFetchAction());
    } catch {
      dispatch(
        createFailedFetchAction(
          '画像のアップロードに失敗しました。\n通信状態をご確認の上再度お試しください。'
        )
      );
    }
  };

  return (
    <div className="album-edit-image">
      <div className="album-edit-image__select">
        <span>画像を変更する</span>
        <IconButton className={classes.icon}>
          <label htmlFor="upload-image">
            <AddPhotoAlternateIcon fontSize={'large'} />
            <input
              className={'display-none'}
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

import React from 'react';
import { imagesRef } from '../../firebase';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { generateRandomStrings } from '../../lib/generateRandomStrings';
import { deleteAlbumImage } from '../../lib/albums';
import { File } from '../../lib/types';
import { useDispatch } from 'react-redux';
import { updateImageAction } from '../../store/ImageReducer';
import {
  requestFetchAction,
  displayMessage,
  failedFetchAction,
  successFetchAction,
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
const ImageUploadForm: React.FC<Props> = ({ image }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) {
      dispatch(displayMessage('ファイルが選択されていません。'));
      return;
    }

    const file = fileList[0];

    if (!file) {
      return;
    }

    // すでにローカルステートに登録されている場合はstorageの元の画像を削除
    if (image.filename !== '') {
      try {
        dispatch(requestFetchAction());
        await deleteAlbumImage(image.filename);
      } catch (e) {
        dispatch(
          failedFetchAction(
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

      dispatch(updateImageAction(newImage));

      dispatch(displayMessage('画像のアップロードが完了しました。'));
      dispatch(successFetchAction());
    } catch {
      dispatch(
        failedFetchAction(
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
              onChange={(e) => uploadImage(e)}
            />
          </label>
        </IconButton>
      </div>
      <img src={image.path} alt={`アルバムのイメージ`} />
    </div>
  );
};

export default ImageUploadForm;

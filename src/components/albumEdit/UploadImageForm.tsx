import React, { useCallback } from 'react';
import { storage, imagesRef } from '../../firebase';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { generateRandomStrings } from '../../lib/generateRandomStrings';
import { deleteAlbumImage } from '../../lib/albums'
import { Image } from '../../lib/types';
import { useDispatch } from 'react-redux';
import { updateImageAction, deleteImageAction } from '../../store/ImgaesReducer';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

type Props = {
  image: Image;
}

const UploadImageForm: React.FC<Props> = ({ image }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const fileList = e.target.files;

    if (!fileList) {
      alert("ファイルが選択されていません。");
      return false;
    } else {
      // すでにローカルステートに登録されている場合はstorageの元の画像を削除
      if (image.filename !== "") {
        console.log(`${image.filename} delete`);

        await deleteAlbumImage(image.filename);
      } else {

        const file = fileList[0];
        const filename = generateRandomStrings();
        const uploadRef = imagesRef.child(filename);
        const uploadTask = uploadRef.put(file);

        const snapshot = await uploadTask;
        const downloadURL: string = await snapshot.ref.getDownloadURL().catch((e) => console.error(e, '画像のアップロードに失敗しました。'))
        console.log(downloadURL);
        const newImage = {
          filename: filename,
          path: downloadURL,
        };
        dispatch(updateImageAction(newImage));
        console.log(`url: ${downloadURL}`);

        alert("画像のアップロードが完了しました。")
      }
    }
  };

  const handleDelete = async () => {
    if (!image.filename) {
      alert('画像が登録されていません。');
      return false;
    }
    if (!window.confirm('画像を削除します。')) {
      return false;
    }
    console.log('start');
    await deleteAlbumImage(image.filename);
    console.log('end');
    dispatch(deleteImageAction());
    alert('削除されました。')
  }

  return (
    <div className="album-edit-image">

      <button onClick={() => {
        console.log(`filename: ${image.filename}
      path: ${image.path}
      `)
      }}>ろがー
      </button>
      <button onClick={handleDelete}>
        del
      </button>

      <div className="album-edit-image__select">
        <span>画像を変更する</span>
        <IconButton className={classes.icon}>
          <label htmlFor="upload-image">
            <AddPhotoAlternateIcon fontSize={"large"} />
            <input
              className={"display-none"} type="file" id="upload-image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={e => uploadImage(e)}
            />
          </label>
        </IconButton>
      </div>
      <img src={image.path} alt={`アルバムのイメージ`} />
    </div>
  );
}

export default UploadImageForm;
import React, { useCallback } from 'react';
import { storage, imagesRef } from '../../firebase';

import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { generateRandomStrings } from '../../lib/generateRandomStrings';
import { deleteAlbumImage } from '../../lib/albums'
import { Image } from '../../lib/types';
import { noImage } from '../../constans';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

type Props = {
  image: Image;
  setImage: React.Dispatch<React.SetStateAction<Image>>;
}

const UploadImageForm: React.FC<Props> = (props) => {
  const classes = useStyles();

  const uploadImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {

    const fileList = e.target.files;

    if (!fileList) {
      alert("ファイルが選択されていません。");
      return false;
    } else {
      // すでにローカルステートに登録されている場合はstorageの元の画像を削除
      if (props.image.filename !== "") {
        console.log(`${props.image.filename} delete`);

        await deleteAlbumImage(props.image.filename);
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
          path: downloadURL
        };
        props.setImage(newImage);
        console.log(`url: ${downloadURL}`);

        alert("画像のアップロードが完了しました。")


        // uploadTask.then(() => {
        //   uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
        //     const newImage = {
        //       filename: filename,
        //       path: downloadURL
        //     };
        //     props.setImage(newImage);
        //     console.log(`url: ${downloadURL}`);

        //     alert("画像のアップロードが完了しました。")
        //   }).catch((e) => {
        //     alert("画像のアップロードに失敗しました。");
        //   })
        // })
      }
    }
  }, [props.setImage]);


  const handleDelete = async () => {
    if (!props.image.filename) {
      alert('画像が登録されていません。');
      return false;
    }
    if (!window.confirm('画像を削除します。')) {
      return false;
    }
    console.log('start');
    await deleteAlbumImage(props.image.filename);
    console.log('end');
    props.setImage({ filename: '', path: noImage });
    alert('削除されました。')

  }

  return (
    <div className="album-edit-image">

      <button onClick={() => {
        console.log(`filename: ${props.image.filename}
      path: ${props.image.path}
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
      <img src={props.image.path} alt={`アルバムイメージ`} />
    </div>
  );
}

export default UploadImageForm;
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';
import { PrimalyButton, TextInput } from '../components/UIKit';
import UploadImageForm from '../components/albumEdit/UploadImageForm';
import { RootStore, Image, User } from '../lib/types';
import { saveAlbum, deleteAlbum } from '../lib/albums';
import { push } from 'connected-react-router';
import { db } from '../firebase';
import { updateImageAction, deleteImageAction } from '../store/ImgaesReducer';
import { noImage, ROLE } from '../constans';

// Edit or Add Album only
const AlbumEdit: React.FC = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/albums/edit')[1];
  if (id !== "") {
    id = id.split('/')[1];
  };
  const { role } = useSelector<RootStore, User>(state => state.user);
  const state = useSelector<RootStore, Image>(state => state.image);

  const [discription, setDiscription] = useState(""),
    [publish_date, setPublish_date] = useState(""),
    [image, setImage] = useState({
      filename: "",
      path: noImage
    }),
    [title, setTitle] = useState("");

  const inputDiscription = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscription(e.target.value);
  }, [setDiscription]);
  const inputPublish_date = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPublish_date(e.target.value);
  }, [setPublish_date]);
  const inputTitle = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(e.target.value);
  }, [setTitle]);

  const handleSave = () => {
    if (!title || !publish_date) {
      alert('必須項目が未入力です。');
      return false;
    }
    dispatch(saveAlbum(title, image, discription, publish_date));
    // dispatch(push('/albums'));
  };

  const handleBack = () => {
    if (window.confirm('編集を破棄します。')) {
      dispatch(push('/albums'));
    } else {
      return false;
    }
  };

  const handleDelete = async () => {
    if (role !== ROLE.EDITOR) {
      alert('削除権限がありません。');
      return false;
    }
    if (window.confirm('アルバムを削除しますか？')) {

      deleteAlbum(id).then(() => {
        dispatch(push('/albums'));
      })
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (id === "") {
      // New

    } else {
      // Edit

      db.collection('albums').doc(id).get()
        .then((snapshot) => {
          const data = snapshot.data();
          if (!data) return false;
          console.log(JSON.stringify(data));

          setTitle(data.title);
          setDiscription(data.discription);
          setPublish_date(data.publish_date);
          // dispatch(updateImageAction({ ...data.image }));
          setImage({ ...state });
        })
    }
  }, [setTitle, setDiscription, setPublish_date]);

  return (
    <section className="album-edit">
      <h1>アルバムを追加・編集</h1>
      <div className="inputs-container">
        {id && (
          <div className="delete-icon">
            <span>アルバムを削除する</span>
            <IconButton onClick={() => handleDelete()}>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        )}

        <TextInput
          fullWidth={false} label={"アルバムタイトル"}
          multiline={false} required={true} rows={1}
          value={title} type={"text"}
          onChange={inputTitle}
        />
        <UploadImageForm
          image={image}
        />
        <div className="spacing-div" />

        <div className="album-discription__input">
          <TextInput
            fullWidth={false} label={"説明"}
            multiline={true} required={false} rows={8}
            value={discription} type={"text"}
            onChange={inputDiscription}
          />
        </div>
        <div className="spacing-div" />

        <TextInput
          fullWidth={false} label={"公開日(YYYY-MM-DD)"}
          multiline={false} required={true} rows={1}
          value={publish_date} type={"text"}
          onChange={inputPublish_date}
        />

        <div className="button-container-row">
          <PrimalyButton
            label={'もどる'}
            onClick={() => handleBack()}
          />
          <PrimalyButton
            isDisable={false}
            label={'保存する'}
            onClick={() => handleSave()}
          />
        </div>
      </div>
    </section>


  );
}

export default AlbumEdit;
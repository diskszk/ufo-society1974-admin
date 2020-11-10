import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';
import { PrimalyButton, TextInput } from '../components/UIKit';
import { noImage } from '../constans';
import ImageArea from '../components/albumEdit/UploadImageForm';
import { Image } from '../lib/types';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

// Edit or Add Album only
const AlbumEdit: React.FC = () => {
  const classes = useStyles();

  const [discription, setDiscription] = useState(""),
    [image, setImage] = useState<Image>({
      filename: "",
      path: noImage,
    }),
    [publish_date, setPublish_date] = useState(""),
    [title, setTitle] = useState("");

  const inputDiscription = useCallback((
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscription(e.target.value);
  }, [setDiscription]);
  // const inputImage = useCallback((
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setImage(e.target.value);
  // }, [setImage]);
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

  return (
    <section className="album-edit">
      <h1>アルバムを追加・編集</h1>
      <div className="inputs-container">

        <TextInput
          fullWidth={false} label={"アルバムタイトル"}
          multiline={false} required={true} rows={1}
          value={title} type={"text"}
          onChange={inputTitle}
        />
        <ImageArea
          image={image}
          setImage={setImage}
        />
        {/* <div className="album-edit-image">
          <div className="album-edit-image__select">
            <span>画像を変更する</span>
            <IconButton
              className={classes.icon}
            >
              <AddPhotoAlternateIcon fontSize={"large"} />
            </IconButton>
          </div>
          <img src={image} alt={`アルバムジャケット`} />
        </div> */}
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
            onClick={() => { alert('編集を破棄します。') }}
          />
          <PrimalyButton
            isDisable={false}
            label={'保存する'}
            onClick={() => { alert('保存します') }}
          />
        </div>
      </div>
    </section>


  );
}

export default AlbumEdit;
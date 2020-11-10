import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';
import { Album } from '../../lib/types';
import { PrimalyButton, TextInput } from '../UIKit';

const useStyles = makeStyles({
  icon: {
    height: 80,
    width: 80,
    padding: 6.5,
  },
});

type Props = {
  album: Album;
}

const noImage = "https://1.bp.blogspot.com/-D2I7Z7-HLGU/Xlyf7OYUi8I/AAAAAAABXq4/jZ0035aDGiE5dP3WiYhlSqhhMgGy8p7zACNcBGAsYHQ/s1600/no_image_square.jpg";

const AlbumTableItem: React.FC<Props> = ({ album }) => {

  let imagePath = noImage;

  if (album.image.path) {
    imagePath = album.image.path;
  }

  const classes = useStyles();
  return (
    <li className="album">
      <div className="album-container">

        <div className="album-image">
          <div className="album-image__header">
            <span>画像を変更する</span>
            <IconButton
              className={classes.icon}
            >
              <AddPhotoAlternateIcon fontSize={"large"} />
            </IconButton>
          </div>
          <img src={imagePath} alt={`${album.title} image`} />
        </div>

        <div className="album-info">
          <div className="album-info__header">
            <TextInput
              fullWidth={true} label={"アルバム名"}
              multiline={false} required={true}
              rows={1} value={album.title}
              type={"text"} onChange={() => { }}
            />
            <IconButton className={classes.icon}>
              <DeleteOutlineIcon fontSize={"large"} />
            </IconButton>
          </div>
          <div className="album-info__discription">
            <div className="album-info__discription__text-area">
              <TextInput
                fullWidth={true} label={"説明"}
                multiline={true} required={false}
                rows={20} value={album.discription}
                type={"text"} onChange={() => { }}
              />
            </div>
            <TextInput
              fullWidth={true} label={"アルバム公開日"}
              multiline={false} required={true}
              rows={1} value={album.publish_date}
              type={"text"} onChange={() => { }}
            />
            {/* <p className="publish-date">アルバム公開日: {album.publish_date}</p> */}
          </div>
        </div>
      </div>

      <div className="button-container-row">
        <PrimalyButton
          label={'編集を破棄する'}
          onClick={() => { alert('編集を破棄します。') }}
        />
        <PrimalyButton
          isDisable={false}
          label={'保存する'}
          onClick={() => { alert('保存します') }}
        />
      </div>
    </li>

  );
}

export default AlbumTableItem;
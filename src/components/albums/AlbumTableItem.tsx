import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Album } from '../../lib/types';
import { updateAlbumAction } from '../../store/AlbumReducer';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';

interface Props extends RouteComponentProps<{}> {
  album: Album;
}

const AlbumTableItem: React.FC<Props> = (props: Props) => {
  const { id, imageFile, title } = props.album;
  const dispatch = useDispatch();

  const handleEditAlbumClick = () => {
    dispatch(updateAlbumAction(props.album));
    props.history.push(`/albums/edit/${id}`);
  };
  const handleDetailAlbumClick = () => {
    dispatch(updateAlbumAction(props.album));
    props.history.push(`/albums/detail/${id}`);
  };
  return (
    <li className="album-item">
      <p>{title}</p>
      <div className="album-image" onClick={() => handleEditAlbumClick()}>
        <img src={imageFile.path} alt={`${title} image`} />
      </div>
      <div className="album-image-footer">
        <span>アルバムを編集する</span>
        <IconButton onClick={() => handleEditAlbumClick()}>
          <BorderColorIcon />
        </IconButton>
        <br />
        <span>アルバムの曲を編集する</span>
        <IconButton onClick={() => handleDetailAlbumClick()}>
          <BorderColorIcon />
        </IconButton>
      </div>
    </li>
  );
};

export default withRouter(AlbumTableItem);

import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Album } from '../../lib/types';
import { createUpdateAlbumAction } from '../../store/AlbumReducer';
import IconButton from '@material-ui/core/IconButton';
import BorderColorIcon from '@material-ui/icons/BorderColor';

type Props = {
  album: Album;
};

export const AlbumTableItem: React.FC<Props> = ({ album }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEditAlbumClick = useCallback(
    (
      _ev: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
    ): void => {
      dispatch(createUpdateAlbumAction(album));
      history.push(`/albums/edit/${album.id}`);
    },
    []
  );

  const handleDetailAlbumClick = useCallback(
    (_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
      dispatch(createUpdateAlbumAction(album));
      history.push(`/albums/detail/${album.id}`);
    },
    []
  );

  return (
    <li className="album-item">
      <p>{album.title}</p>
      <div className="album-image" onClick={handleEditAlbumClick}>
        <img src={album.imageFile.path} alt={`${album.title} image`} />
      </div>
      <div className="album-image-footer">
        <span>アルバムを編集する</span>
        <IconButton onClick={handleEditAlbumClick}>
          <BorderColorIcon />
        </IconButton>
        <br />
        <span>アルバムの曲を編集する</span>
        <IconButton onClick={handleDetailAlbumClick}>
          <BorderColorIcon />
        </IconButton>
      </div>
    </li>
  );
};

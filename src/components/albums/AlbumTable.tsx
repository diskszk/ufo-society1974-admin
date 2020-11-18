import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Album, File } from '../../lib/types';
import { getAlbums } from '../../lib/albums/getAlbums';
import { updateAlbumAction } from '../../store/AlbumReducer';
import { IconButton } from '@material-ui/core';
import BorderColorIcon from '@material-ui/icons/BorderColor';

type Props = {
  album: Album;
};

const AlbumTableItem: React.FC<Props> = (props: Props) => {
  const { id, imageFile, title } = props.album;
  const dispatch = useDispatch();

  const handleImageClick = () => {
    dispatch(updateAlbumAction(props.album));
    dispatch(push(`/albums/edit/${id}`));
  };
  return (
    <li className="album-item">
      <p>{title}</p>
      <div className="album-image" onClick={() => handleImageClick()}>
        <img src={imageFile.path} alt={`${title} image`} />
      </div>
      <div className="album-image-footer">
        <span>アルバムを編集する</span>
        <IconButton onClick={() => dispatch(push(`/albums/edit/${id}`))}>
          <BorderColorIcon />
        </IconButton>
        <br />
        <span>アルバムの曲を編集する</span>
        <IconButton onClick={() => dispatch(push(`/albums/${id}`))}>
          <BorderColorIcon />
        </IconButton>
      </div>
    </li>
  );
};

const AlbumTable: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    getAlbums().then((albumList) => {
      setAlbums(albumList);
    });
  }, [setAlbums]);

  return (
    <ul className="album-list">
      {albums.map((album: Album) => {
        return <AlbumTableItem key={album.id} album={album} />;
      })}
    </ul>
  );
};

export default AlbumTable;

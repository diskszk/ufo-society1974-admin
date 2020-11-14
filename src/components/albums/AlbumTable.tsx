import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Album, File } from '../../lib/types';
import { getAlbums } from '../../lib/albums/getAlbums';
import { updateAlbumAction } from '../../store/AlbumReducer';

type Props = {
  album: Album;
}

const AlbumTableItem: React.FC<Props> = (props: Props) => {
  const { id, imageFile, title } = props.album;
  const dispatch = useDispatch();

  const handleImageClick = () => {
    dispatch(updateAlbumAction(props.album));
    dispatch(push(`/albums/edit/${id}`))
  }
  return (
    <li className="album-item">
      <div className="album-image" onClick={() => handleImageClick()}>
        <img src={imageFile.path} alt={`${title} image`} />
      </div>

      <p className="album-title">{title}</p>
    </li>

  );
}

const AlbumTable: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    getAlbums()
      .then((albumList) => {
        setAlbums(albumList);
      })
  }, [setAlbums]);

  return (
    <ul className="album-list">
      {albums.map((album: Album) => {
        return (
          <AlbumTableItem
            key={album.id}
            album={album}
          />
        )
      })}
    </ul>
  )
}

export default AlbumTable;
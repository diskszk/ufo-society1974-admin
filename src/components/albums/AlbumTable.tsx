import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Album, Image } from '../../lib/types';

type Props = {
  albums: Album[]
}

const AlbumTableItem = ({ image, title, id }: { image: Image; title: string, id: string }) => {
  const dispatch = useDispatch();
  const handleImageClick = () => {
    dispatch(push(`/albums/edit/${id}`))
  }
  return (
    <li className="album-item">
      <div className="album-image" onClick={() => handleImageClick()}>
        <img src={image.path} alt={`${title} image`} />
      </div>
      <p className="album-title">{title}</p>
    </li>

  );
}

const AlbumTable = (props: Props) => {
  return (
    <ul className="album-list">
      {props.albums.map((album: Album) => {
        return <AlbumTableItem key={album.id} image={album.image} title={album.title} id={album.id} />
      })}
    </ul>
  )
}

export default AlbumTable;
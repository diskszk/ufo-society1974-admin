import React from 'react';
import { Album, Image } from '../../lib/types';

type Props = {
  albums: Album[]
}

const AlbumTableItem = ({ image, title }: { image: Image; title: string }) => {

  return (
    <li className="album-item">
      <div className="album-image">
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
        return <AlbumTableItem key={album.id} image={album.image} title={album.title} />
      })}
    </ul>
  )
}

export default AlbumTable;
import React, { useState, useEffect } from 'react';
import AlbumTableItmelbum from './AlbumTableItem';
import { Album } from '../../lib/types';

type Props = {
  albums: Album[];
}

const AlbumTable = (props: Props) => {

  return (
    <ul className="inputs-container">
      { props.albums.map((album: Album) => {
        return <AlbumTableItmelbum album={{ ...album }} />
      })}
    </ul>
  );
}

export default AlbumTable;

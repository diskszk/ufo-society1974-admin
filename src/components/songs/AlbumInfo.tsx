import React, { useState, useEffect } from 'react';
import { Album } from '../../lib/types';

type Props = {
  album: Album;
};
const AlbumInfo: React.FC<Props> = ({ album }) => {
  return (
    <div className="songs-album-info">
      <div className="songs-album-info-image">
        <img src={album.imageFile.path} alt="アルバムジャケット" />
      </div>
      <div className="songs-album-info-detail">
        <p>{album.title}</p>
        <p>リリース日: {album.publish_date}</p>
        <p>{album.discription}</p>
      </div>
    </div>
  );
};

export default AlbumInfo;
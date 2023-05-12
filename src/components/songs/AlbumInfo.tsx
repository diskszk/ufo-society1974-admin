import React from "react";
import { Album } from "../../lib/types";

type Props = {
  album: Album;
};
export const AlbumInfo: React.FC<Props> = ({ album }) => {
  return (
    <div className="songs-album-info">
      <div className="songs-album-info-image">
        <img src={album.imageFile.path} alt="アルバムジャケット" />
      </div>
      <div className="songs-album-info-detail">
        <p>{album.title}</p>
        <p>リリース日: {album.publishedDate}</p>
        <p>{album.description}</p>
      </div>
    </div>
  );
};

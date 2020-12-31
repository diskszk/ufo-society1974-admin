import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Album } from '../../lib/types';
import { getAlbums } from '../../lib/albums/getAlbums';
import {
  requestFetchAction,
  failedFetchAction,
  successFetchAction,
} from '../../store/LoadingStatusReducer';

import AlbumTableItem from './AlbumTableItem';

const AlbumTable: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(requestFetchAction());
        const albumList = await getAlbums();
        setAlbums(albumList);
        dispatch(successFetchAction());
      } catch (e) {
        dispatch(failedFetchAction(e.message));
      }
    };

    fetch();
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

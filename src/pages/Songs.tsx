import React, { useEffect, useMemo } from 'react';
import { PrimalyButton } from '../components/UIKit';
import SongTable from '../components/songs/SongTable';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { ROLE } from '../constans';
import { Album, RootStore, User } from '../lib/types';
import AlbumInfo from '../components/songs/AlbumInfo';
import { getSingleAlbum } from '../lib/albums/getSingleAlbum';
import { updateAlbumAction } from '../store/AlbumReducer';
import { pushGSO } from '../lib/pushGSO';

const Songs = () => {
  const dispatch = useDispatch();

  const albumId = useMemo(
    () => window.location.pathname.split(`albums/detail`)[1].split('/')[1],
    []
  );

  const album = useSelector<RootStore, Album>((state) => state.album);

  const handlePushGSO = () => {
    pushGSO();
  };

  useEffect(() => {
    if (albumId === '') {
      alert('アルバムが登録されていません。');
      dispatch(push('/albums'));
    }
    getSingleAlbum(albumId).then((album) => {
      if (album) {
        dispatch(updateAlbumAction(album));
      }
    });
  }, []);

  return (
    <section className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>
      <AlbumInfo album={album} />
      <SongTable />

      <div className="button-container-row">
        <PrimalyButton
          label="もどる"
          onClick={() => dispatch(push('/albums'))}
        />
        <PrimalyButton label="GSOを追加する" onClick={handlePushGSO} />
        <PrimalyButton
          label="アルバム編集"
          onClick={() => dispatch(push(`/albums/edit/${albumId}`))}
        />
      </div>
    </section>
  );
};

export default Songs;

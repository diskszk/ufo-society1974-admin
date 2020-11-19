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

const Songs = () => {
  const dispatch = useDispatch();

  const albumId = useMemo(
    () => window.location.pathname.split(`albums/detail`)[1].split('/')[1],
    []
  );

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const album = useSelector<RootStore, Album>((state) => state.album);
  let isDisable = true;
  if (role === ROLE.EDITOR) {
    isDisable = false;
  }

  const clickPublish = () => {
    alert('曲を公開しました。');
  };

  useEffect(() => {
    if (albumId === '') {
      alert('アルバム が登録されていません。');
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
        <PrimalyButton
          isDisable={isDisable}
          label="公開する"
          onClick={clickPublish}
        />
      </div>
    </section>
  );
};

export default Songs;

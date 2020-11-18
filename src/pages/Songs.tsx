import React from 'react';
import { PrimalyButton } from '../components/UIKit';
import SongTable from '../components/songs/SongTable';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { ROLE } from '../constans';
import { Album, RootStore, User } from '../lib/types';
import { publishSongs } from '../lib/songs';
import AlbumInfo from '../components/songs/AlbumInfo';

const Songs = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split(`albums/detail`)[1];
  if (id !== '') {
    id = id.split('/')[1];
  }

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const album = useSelector<RootStore, Album>((state) => state.album);
  const isDisable = role !== ROLE.EDITOR;

  const clickPublish = () => {
    publishSongs()
      .then(() => {
        alert('曲を公開しました。');
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <section className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>
      <AlbumInfo album={album} />
      <SongTable id={album.id} />

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

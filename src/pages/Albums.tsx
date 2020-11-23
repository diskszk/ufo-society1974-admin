import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { RootStore, User } from '../lib/types';
import { publishAlbums } from '../lib/albums';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import { PrimalyButton } from '../components/UIKit';
import IconButton from '@material-ui/core/IconButton';
import AlbumTable from '../components/albums/AlbumTable';
import { ROLE } from '../constans';
import { clearAlbumAction } from '../store/AlbumReducer';

const Albums = () => {
  const dispatch = useDispatch();

  const { role } = useSelector<RootStore, User>((state) => state.user);
  const isDisable = role !== ROLE.EDITOR;

  const clickPublish = async () => {
    if (role !== ROLE.EDITOR) {
      alert('編集者のみ編集内容を公開できます。');
      return;
    }
    if (!window.confirm('編集内容を公開しますか？')) {
      return;
    }
    await publishAlbums();
    alert('編集内容を公開しました。');
  };

  const clickAddAlbum = () => {
    dispatch(clearAlbumAction());
    dispatch(push('/albums/edit'));
  };

  return (
    <section className="page">
      <h1>アルバムの管理ページ</h1>
      <div className="spacing-div"></div>

      <div className="spacing-div"></div>

      <div className="album-container">
        {role === ROLE.EDITOR && (
          <div className="add-icon-button">
            <span>アルバムを追加</span>
            <IconButton onClick={() => clickAddAlbum()}>
              <LibraryAddOutlinedIcon fontSize="large" />
            </IconButton>
            <div className="spacing-div"></div>
          </div>
        )}
        <AlbumTable />
      </div>

      <div className="spacing-div"></div>

      <div className="button-container-row">
        <PrimalyButton label="もどる" onClick={() => dispatch(push('/'))} />
        <PrimalyButton
          isDisable={isDisable}
          label="公開する"
          onClick={clickPublish}
        />
      </div>
    </section>
  );
};

export default Albums;

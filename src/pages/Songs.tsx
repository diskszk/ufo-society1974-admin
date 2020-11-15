import React from 'react';
import { PrimalyButton } from '../components/UIKit';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import SongTable from '../components/songs/SongTable';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { ROUTER_PATHS, ROLE } from '../constans';
import { RootStore, User } from '../lib/types';
import { publishSongs } from '../lib/songs';

const Songs = () => {
  const dispatch = useDispatch();

  const { role } = useSelector<RootStore, User>((state) => state.user);
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

      {role === ROLE.EDITOR && (
        <div className="button-container__right-fixed">
          <div
            className="icon-button"
            role="button"
            onClick={() => dispatch(push('/songs/edit'))}
          >
            <LibraryAddOutlinedIcon fontSize="large" />
          </div>
        </div>
      )}

      <div className="spacing-div"></div>
      <SongTable />

      <div className="button-container-row">
        <PrimalyButton
          label="もどる"
          onClick={() => dispatch(push(ROUTER_PATHS.HOME))}
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

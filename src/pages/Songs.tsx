import React from 'react';
import { PrimalyButton } from '../components/UIKit';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import SongTable from '../components/songs/SongTable';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { User } from '../reducks/users/types';
import { RootStore } from '../reducks/store/initialState';

const Songs = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector<RootStore, User>(state => state.users);
  const currentRole = currentUser.role;

  return (
    <section className="page">
      <h1>曲の管理ページ</h1>
      <div className="spacing-div"></div>

      {currentRole === "editer" && (
        <div className="button-container__right-fixed">
          <div
            className="icon-button" role="button"
            onClick={() => dispatch(push("/songs/edit"))}
          >
            <LibraryAddOutlinedIcon fontSize="large" />
          </div>
        </div>
      )}

      <div className="spacing-div"></div>
      <SongTable />

      <PrimalyButton
        label="もどる"
        onClick={() => dispatch(push("/"))}
      />
    </section >
  );
}

export default Songs;
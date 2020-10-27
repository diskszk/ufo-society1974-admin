import React from 'react';
import { PrimalyButton } from '../components/UIKit';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import UserTable from '../components/users/UserTable';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { User } from '../reducks/users/types';
import { RootStore } from '../reducks/store/initialState';

const Users = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector<RootStore, User>(state => state.users);
  const currentRole = currentUser.role;

  return (
    <section className="page">
      <h1>ユーザー管理ページ</h1>
      <div className="spacing-div"></div>

      {currentRole === "master" && (
        <div className="button-container__right-fixed">
          <div
            className="icon-button" role="button"
            onClick={() => dispatch(push("/signup"))}
          >
            <LibraryAddOutlinedIcon fontSize="large" />
          </div>
        </div>
      )}

      <UserTable />

      <PrimalyButton
        label="もどる"
        onClick={() => dispatch(push("/"))}
      />
    </section >
  );
}

export default Users;
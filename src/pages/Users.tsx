import React from 'react';
import { PrimalyButton } from '../components/UIKit';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import UserTable from '../components/users/UaerTble';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { ROLE } from '../constans';
import { RootStore, User } from '../lib/types';
import { IconButton } from '@material-ui/core';

const Users: React.FC = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector<RootStore, User>((state) => state.user);
  const currentRole = currentUser.role;

  return (
    <section className="page">
      <h1>ユーザー管理ページ</h1>
      <div className="spacing-div"></div>

      {currentRole === ROLE.MASTER && (
        <div className="button-container__right-fixed">
          <IconButton onClick={() => dispatch(push('/signup'))}>
            <LibraryAddOutlinedIcon fontSize="large" />
          </IconButton>
        </div>
      )}

      <div className="spacing-div"></div>
      <UserTable />

      <PrimalyButton label="もどる" onClick={() => dispatch(push('/'))} />
    </section>
  );
};

export default Users;

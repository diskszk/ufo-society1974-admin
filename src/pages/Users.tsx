import React from 'react';
import { useHistory } from 'react-router-dom';
import { CustomButton } from '../components/UIKit';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import UserTable from '../components/users/UserTable';
import { useSelector } from 'react-redux';
import { ROLE } from '../constants';
import { RootStore, User } from '../lib/types';
import { IconButton } from '@material-ui/core';

const Users: React.FC = () => {
  const currentUser = useSelector<RootStore, User>((state) => state.user);
  const currentRole = currentUser.role;
  const history = useHistory();

  return (
    <section className="page">
      <h1>ユーザー管理ページ</h1>
      <div className="spacing-div"></div>

      {currentRole === ROLE.MASTER && (
        <div className="button-container__right-fixed">
          <IconButton
            onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              history.push('/users/create')
            }
          >
            <LibraryAddOutlinedIcon fontSize="large" />
          </IconButton>
        </div>
      )}

      <div className="spacing-div"></div>
      <UserTable />

      <CustomButton
        label="もどる"
        onClick={(_ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          history.push('/')
        }
      />
    </section>
  );
};

export default Users;

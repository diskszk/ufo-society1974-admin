import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { CustomButton } from '../components/UIKit';
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined';
import UserTable from '../components/users/UaerTble';
import { useSelector } from 'react-redux';
import { ROLE } from '../constants';
import { RootStore, User } from '../lib/types';
import { IconButton } from '@material-ui/core';

interface Props extends RouteComponentProps<{}> {}

const Users: React.FC<Props> = ({ history }) => {
  const currentUser = useSelector<RootStore, User>((state) => state.user);
  const currentRole = currentUser.role;

  return (
    <section className="page">
      <h1>ユーザー管理ページ</h1>
      <div className="spacing-div"></div>

      {currentRole === ROLE.MASTER && (
        <div className="button-container__right-fixed">
          <IconButton onClick={() => history.push('/signup')}>
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

export default withRouter(Users);

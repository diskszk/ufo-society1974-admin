import React from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, User } from '../../lib/types';
import { logOut } from '../../lib/users/operation';
import { UFO_SOCIETY_OFFISIAL } from '../../constans';

interface Props extends RouteComponentProps<{}> {}

const Header: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { isSignedIn, username, role } = useSelector<RootStore, User>(
    (state) => state.user
  );

  return (
    <header>
      <div className="header">
        <div className="header-content-left">
          <a
            href={UFO_SOCIETY_OFFISIAL}
            target="_blank"
            rel="noopener noreferrer"
          >
            UFO Societyホームページ
          </a>
          {!isSignedIn ? (
            <a role="button" onClick={() => props.history.push('/login')}>
              ログイン
            </a>
          ) : (
            <a role="button" onClick={() => dispatch(logOut())}>
              ログアウト
            </a>
          )}
        </div>
        {isSignedIn && (
          <div className="header-content-right">
            <p>ユーザー: {username}</p>
            <p>権限　　: {role}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default withRouter(Header);

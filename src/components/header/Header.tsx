import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { RootStore } from '../../reducks/store/initialState';
import { logOut } from '../../reducks/users/operation';
import { User } from '../../reducks/users/types';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootStore, User>(state => state.users);

  const UFO_SOCIETY_OFFISIAL = "https://ufo-society-1974.web.app/";



  return (
    <header>
      <div className="header">
        <div className="header-content-left">
          <a href={UFO_SOCIETY_OFFISIAL} target="_blank" rel="noopener noreferrer">UFO Societyホームページ</a>
          {!user.isSignedIn ? (
            <a role="button" onClick={() => dispatch(push('/login'))}>ログイン</a>
          ) : (
              <a role="button" onClick={() => dispatch(logOut())}>ログアウト</a>
            )}
        </div>
        {user.isSignedIn && (
          <div className="header-content-right">
            <p>ユーザー: {user.username}</p>
            <p>役職　　: {user.role}</p>
          </div>
        )}
      </div>
    </header >
  );
}

export default Header;
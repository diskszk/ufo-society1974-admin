import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, User } from '../../lib/types';
import { UFO_SOCIETY_OFFICIAL } from '../../constants';
import {
  createRequestFetchAction,
  createDisplayMessage,
  crateSuccessFetchAction,
  createFailedFetchAction,
} from '../../store/LoadingStatusReducer';
import { auth } from '../../firebase';
import { createLogOutAction } from '../../store/UsersReducer';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { isSignedIn, username, role } = useSelector<RootStore, User>(
    (state) => state.user
  );
  const history = useHistory();

  const handleClickLogOut = async (
    _ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): Promise<void> => {
    try {
      dispatch(createRequestFetchAction());
      await auth.signOut();
      dispatch(createLogOutAction());
      dispatch(createDisplayMessage('ログアウトしました。'));
      dispatch(crateSuccessFetchAction());
      history.push('/login');
    } catch {
      dispatch(
        createFailedFetchAction(`ログアウトに失敗しました。\n
      通信環境をご確認の上再度お試しください。`)
      );
    }
  };

  return (
    <header>
      <div className="header">
        <div className="header-content-left">
          <a
            href={UFO_SOCIETY_OFFICIAL}
            target="_blank"
            rel="noopener noreferrer"
          >
            UFO Societyホームページ
          </a>
          {!isSignedIn ? (
            <Link to="/login">ログイン</Link>
          ) : (
            <a onClick={handleClickLogOut}>ログアウト</a>
          )}
        </div>
        {isSignedIn && (
          <div className="header-content-right">
            <p>ユーザー: {username}</p>
            <p>
              {`権限　　`}: {role}
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

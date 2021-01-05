import React from 'react';
import { withRouter } from 'react-router';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, User } from '../../lib/types';
import { UFO_SOCIETY_OFFICIAL } from '../../constants';
import {
  requestFetchAction,
  displayMessage,
  successFetchAction,
  failedFetchAction,
} from '../../store/LoadingStatusReducer';
import { auth } from '../../firebase';
import { logOutAction } from '../../store/UsersReducer';

interface Props extends RouteComponentProps<{}> {}

const Header: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const { isSignedIn, username, role } = useSelector<RootStore, User>(
    (state) => state.user
  );

  const handleClickLogOut = async (
    _ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): Promise<void> => {
    try {
      dispatch(requestFetchAction());
      await auth.signOut();
      dispatch(logOutAction());
      dispatch(displayMessage('ログアウトしました。'));
      dispatch(successFetchAction());
      history.push('/login');
    } catch {
      dispatch(
        failedFetchAction(`ログアウトに失敗しました。\n
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
          {/* {!isSignedIn ? ( */}
          <Link to="/login">ログイン</Link>
          {/* ) : ( */}
          <a role="button" onClick={handleClickLogOut}>
            ログアウト
          </a>
          {/* )} */}
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

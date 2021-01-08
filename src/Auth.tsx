import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore, User } from './lib/types';
import { auth, db } from './firebase';
import {
  crateSuccessFetchAction,
  createRequestFetchAction,
  createFailedFetchAction,
} from './store/LoadingStatusReducer';
import { RouteComponentProps } from 'react-router-dom';
import { createLoginAction } from './store/UsersReducer';

interface Props extends RouteComponentProps<{}> {}

const Auth: React.FC<Props> = ({ children, history }): any => {
  const dispatch = useDispatch();
  const { isSignedIn } = useSelector<RootStore, User>((state) => state.user);

  const listenAuthState = async () => {
    return auth.onAuthStateChanged(async (user) => {
      if (!user) {
        dispatch(createFailedFetchAction('ユーザーの取得に失敗しました。'));
        history.push('/login');
        return;
      }
      const uid = user.uid;

      const snapshot = await db.collection('users').doc(uid).get();
      const data = snapshot.data();

      if (!data) {
        dispatch(createFailedFetchAction('ユーザーの取得に失敗しました。'));
        history.push('/login');
        return;
      }
      dispatch(
        createLoginAction({
          isSignedIn: true,
          uid: uid,
          username: data.username,
          role: data.role,
        })
      );
    });
  };

  useEffect(() => {
    if (!isSignedIn) {
      try {
        dispatch(createRequestFetchAction());
        listenAuthState();

        dispatch(crateSuccessFetchAction());
      } catch (e) {
        dispatch(createFailedFetchAction(e.message));
        history.push('/login');
      }
    }
  }, [isSignedIn]);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default withRouter(Auth);

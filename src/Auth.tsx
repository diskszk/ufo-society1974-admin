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

  const listenAuthState = () => {
    return async (dispatch: any) => {
      dispatch(createRequestFetchAction());

      return auth.onAuthStateChanged((user) => {
        if (!user) {
          history.push('/login');
          return;
        } else {
          const uid = user.uid;

          db.collection('users')
            .doc(uid)
            .get()
            .then((snapshot) => {
              const data = snapshot.data();

              if (!data) {
                return dispatch(
                  createFailedFetchAction('ユーザーの取得に失敗しました。')
                );
              }

              dispatch(
                createLoginAction({
                  isSignedIn: true,
                  uid: uid,
                  username: data.username,
                  role: data.role,
                })
              );

              dispatch(crateSuccessFetchAction());
            })
            .catch((e) => {
              dispatch(createFailedFetchAction(e.message));
              history.push('/');
              return;
            });
        }
      });
    };
  };

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, []);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default withRouter(Auth);

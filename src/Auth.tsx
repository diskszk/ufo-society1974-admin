import React, { useEffect, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from './reducks/store/initialState';
import { listenAuthState } from './reducks/users/operation';
import { User } from './reducks/users/types';

type Children = {
  children?: ReactElement<any>
}

const Auth = ({ children }: any) => {

  const dispatch = useDispatch();
  const user = useSelector<RootStore, User>(state => state.users);
  const isSignedIn = user.isSignedIn;

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

}

export default Auth;
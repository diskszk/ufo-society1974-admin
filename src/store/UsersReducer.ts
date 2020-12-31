import { User } from '../lib/types';
import { initialState } from './initialState';

const SIGN_IN = 'SIGN_IN',
  LOG_OUT = 'LOG_OUT';
const userInitialState = initialState.user;

// action
export const signinAction = (
  userState: User
): { type: string; payload: User } => {
  return {
    type: SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
      role: userState.role,
    },
  };
};

export const logOutAction = () => {
  return {
    type: LOG_OUT,
    payload: {
      isSignedIn: false,
      uid: '',
      username: '',
      role: '',
    },
  };
};

// reducer
export const UsersReducer = (state = userInitialState, action: any) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case LOG_OUT:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

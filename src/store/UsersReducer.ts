import { User } from '../lib/types';
import { initialState } from './initialState';

const userInitialState = initialState.user;

const SIGN_IN = 'SIGN_IN',
  LOG_OUT = 'LOG_OUT';

type SignInAction = {
  type: typeof SIGN_IN;
  payload: User;
};
type LogOutAction = {
  type: typeof LOG_OUT;
  payload: User;
};

type UserActionTypes = SignInAction | LogOutAction;

// action
export const signinAction = (state: User): UserActionTypes => {
  return {
    type: SIGN_IN,
    payload: {
      ...state,
      isSignedIn: true,
    },
  };
};

export const logOutAction = (): UserActionTypes => {
  return {
    type: LOG_OUT,
    payload: {
      isSignedIn: false,
      role: '',
      username: '',
      uid: '',
    },
  };
};

// reducer
export const UsersReducer = (
  state = userInitialState,
  action: UserActionTypes
): User => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

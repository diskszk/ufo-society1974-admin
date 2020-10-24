import { User } from './types';

export type I_SIGN_IN = "SIGN_IN";
export type I_LOG_OUT = "LOG_OUT";
export const SIGN_IN = "SIGN_IN", LOG_OUT = "LOG_OUT";

export type UserActions = {
  type: I_SIGN_IN;
  payload: User;
} | {
  type: I_LOG_OUT;
  payload: User;
}

// 引数の型をUserにすると全ての値を埋めないといけなくなる
export const signinAction = (userState: User): UserActions => {
  return {
    type: SIGN_IN,
    payload: {
      isSignedIn: true,
      uid: userState.uid,
      username: userState.username,
      role: userState.role
    }
  }
};

export const logOutAction = (): UserActions => {
  return {
    type: LOG_OUT,
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
      role: ""
    }
  }
};
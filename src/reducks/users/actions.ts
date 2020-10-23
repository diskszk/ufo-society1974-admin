import { User } from './types';

export type I_SIGN_IN = "SIGN_IN";
export type I_SIGN_OUT = "SIGN_OUT";
export const SIGN_IN = "SIGN_IN", SIGN_OUT = "SIGN_OUT";

export type UserActions = {
  type: I_SIGN_IN;
  payload: User;
} | {
  type: I_SIGN_OUT;
  payload: User;
}

// 引数の型をUserにすると全ての値を埋めないといけなくなる
// export const signinAction = (userState: User): UserActions => {
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

export const signoutAction = (): UserActions => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      uid: "",
      username: "",
      role: ""
    }
  }
};
import { IUser } from './types';

export type I_SIGN_IN = "SIGN_IN";
export type I_SIGN_OUT = "SIGN_OUT";
export const SIGN_IN = "SIGN_IN", SIGN_OUT = "SIGN_OUT";

export type UserActions = {
  type: I_SIGN_IN;
  payload: IUser;
} | {
  type: I_SIGN_OUT;
  payload: IUser;
}

// export const signinAction = (userState: IUser): UserActions => {
export const signinAction = (userState: any): UserActions => {
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
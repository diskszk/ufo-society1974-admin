import { IUser } from '../users/types';

export type RootState = {
  users: IUser;
}

export const initialState: { users: IUser } = {
  users: {
    isSignedIn: false,
    uid: "",
    username: "",
    role: ""
  }
};
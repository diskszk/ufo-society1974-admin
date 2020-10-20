import { User } from '../users/types';

export type RootStore = {
  users: User;
}

export const initialState: { users: User } = {
  users: {
    isSignedIn: false,
    uid: "",
    username: "",
    role: ""
  }
};